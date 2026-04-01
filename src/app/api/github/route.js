const GITHUB_API = "https://api.github.com";

async function fetchAllRepos(username) {
  const repos = [];
  let page = 1;

  while (true) {
    const res = await fetch(
      `${GITHUB_API}/users/${username}/repos?per_page=100&page=${page}&type=public`,
      {
        headers: {
          Accept: "application/vnd.github.v3+json",
          ...(process.env.GITHUB_TOKEN && {
            Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
          }),
        },
        next: { revalidate: 3600 },
      }
    );

    if (!res.ok) {
      if (res.status === 404) {
        throw { status: 404, message: `User "${username}" not found` };
      }
      throw { status: res.status, message: `GitHub API error: ${res.status}` };
    }

    const data = await res.json();
    if (data.length === 0) break;

    repos.push(...data);
    if (data.length < 100) break;
    page++;
  }

  return repos;
}

function formatRepo(repo) {
  const updatedAt = new Date(repo.updated_at);
  const now = new Date();
  const daysSinceUpdate = Math.floor(
    (now - updatedAt) / (1000 * 60 * 60 * 24)
  );

  return {
    id: repo.id,
    name: repo.name,
    full_name: repo.full_name,
    description: repo.description,
    url: repo.html_url,
    clone_url: repo.clone_url,
    homepage: repo.homepage || null,
    language: repo.language,
    topics: repo.topics || [],
    default_branch: repo.default_branch,
    visibility: repo.visibility,
    is_fork: repo.fork,
    is_archived: repo.archived,
    is_template: repo.is_template,
    license: repo.license
      ? { key: repo.license.key, name: repo.license.name }
      : null,
    stats: {
      stars: repo.stargazers_count,
      forks: repo.forks_count,
      watchers: repo.watchers_count,
      open_issues: repo.open_issues_count,
      size_kb: repo.size,
    },
    dates: {
      created_at: repo.created_at,
      updated_at: repo.updated_at,
      pushed_at: repo.pushed_at,
      days_since_update: daysSinceUpdate,
    },
    has: {
      pages: repo.has_pages,
      wiki: repo.has_wiki,
      issues: repo.has_issues,
      projects: repo.has_projects,
      discussions: repo.has_discussions,
    },
  };
}

function extractStats(projects) {
  const languages = {};
  const topics = {};
  let totalStars = 0;
  let totalForks = 0;

  for (const project of projects) {
    totalStars += project.stats.stars;
    totalForks += project.stats.forks;

    if (project.language) {
      languages[project.language] = (languages[project.language] || 0) + 1;
    }

    for (const topic of project.topics) {
      topics[topic] = (topics[topic] || 0) + 1;
    }
  }

  return {
    total_repos: projects.length,
    total_stars: totalStars,
    total_forks: totalForks,
    languages: Object.entries(languages)
      .sort(([, a], [, b]) => b - a)
      .map(([name, count]) => ({ name, count })),
    topics: Object.entries(topics)
      .sort(([, a], [, b]) => b - a)
      .map(([name, count]) => ({ name, count })),
  };
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);

    // Required: GitHub username
    const user = searchParams.get("user");
    if (!user) {
      return Response.json(
        {
          error: "Missing required parameter: user",
          usage: "/api/github?user=USERNAME",
          params: {
            user: "(required) GitHub username",
            language: "Filter by programming language",
            topic: "Filter by repository topic",
            search: "Search in name or description",
            sort: "updated | created | pushed | name | stars | forks | size",
            order: "desc | asc",
            page: "Page number (default: 1)",
            per_page: "Items per page, max 100 (default: 10)",
            include_forks: "true | false (default: false)",
            include_archived: "true | false (default: false)",
            stats_only: "true | false (default: false)",
          },
        },
        { status: 400 }
      );
    }

    const language = searchParams.get("language");
    const topic = searchParams.get("topic");
    const search = searchParams.get("search");
    const sort = searchParams.get("sort") || "updated";
    const order = searchParams.get("order") || "desc";
    const page = Math.max(1, parseInt(searchParams.get("page") || "1", 10));
    const perPage = Math.min(
      100,
      Math.max(1, parseInt(searchParams.get("per_page") || "10", 10))
    );
    const includeForks = searchParams.get("include_forks") === "true";
    const includeArchived = searchParams.get("include_archived") === "true";
    const statsOnly = searchParams.get("stats_only") === "true";

    const allRepos = await fetchAllRepos(user);

    let projects = allRepos
      .filter((repo) => {
        if (!includeForks && repo.fork) return false;
        if (!includeArchived && repo.archived) return false;
        return true;
      })
      .map(formatRepo);

    // Filter by language
    if (language) {
      projects = projects.filter(
        (p) => p.language && p.language.toLowerCase() === language.toLowerCase()
      );
    }

    // Filter by topic
    if (topic) {
      projects = projects.filter((p) =>
        p.topics.some((t) => t.toLowerCase() === topic.toLowerCase())
      );
    }

    // Search by name or description
    if (search) {
      const q = search.toLowerCase();
      projects = projects.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          (p.description && p.description.toLowerCase().includes(q))
      );
    }

    // Stats
    const stats = extractStats(projects);

    if (statsOnly) {
      return Response.json({ user, stats });
    }

    // Sorting
    const sortFns = {
      updated: (a, b) =>
        new Date(b.dates.updated_at) - new Date(a.dates.updated_at),
      created: (a, b) =>
        new Date(b.dates.created_at) - new Date(a.dates.created_at),
      pushed: (a, b) =>
        new Date(b.dates.pushed_at) - new Date(a.dates.pushed_at),
      name: (a, b) => a.name.localeCompare(b.name),
      stars: (a, b) => b.stats.stars - a.stats.stars,
      forks: (a, b) => b.stats.forks - a.stats.forks,
      size: (a, b) => b.stats.size_kb - a.stats.size_kb,
    };

    const sortFn = sortFns[sort] || sortFns.updated;
    projects.sort(sortFn);

    if (order === "asc") {
      projects.reverse();
    }

    // Pagination
    const totalItems = projects.length;
    const totalPages = Math.ceil(totalItems / perPage);
    const startIndex = (page - 1) * perPage;
    const paginatedProjects = projects.slice(startIndex, startIndex + perPage);

    return Response.json({
      user,
      pagination: {
        page,
        per_page: perPage,
        total_items: totalItems,
        total_pages: totalPages,
        has_next: page < totalPages,
        has_prev: page > 1,
      },
      stats,
      projects: paginatedProjects,
    });
  } catch (error) {
    if (error.status) {
      return Response.json(
        { error: error.message },
        { status: error.status }
      );
    }
    console.error("GitHub API error:", error);
    return Response.json(
      { error: "Failed to fetch GitHub repositories" },
      { status: 502 }
    );
  }
}
