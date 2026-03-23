const projects = [
  {
    id: 31,
    name: "Horse Hotel AMS",
    description:
      "Sistema completo de gerenciamento para hotel equestre em Amsterdam com gestão de cavalos, tarefas, reservas, transportes, anúncios e controle de quarentena. Multi-idioma EN/NL/PT com autenticação própria.",
    longDescription:
      "Horse Hotel AMS é um sistema de gestão completo desenvolvido para um hotel equestre real em Amsterdam. O sistema permite cadastro e acompanhamento de cavalos com check-in/check-out, controle de quarentena veterinária, agenda de walker e paddock, gestão de tarefas para funcionários com prioridades, sistema de transportes de cavalos, anúncios internos segmentados por audiência (staff/clientes), e notificações em tempo real. A autenticação é feita com sistema próprio de convites por token. Interface multi-idioma com suporte completo a Inglês, Holandês e Português.",
    technologies: ["React 18", "TypeScript", "Vite", "Tailwind CSS", "Supabase", "i18n", "Lucide React"],
    category: "management",
    isFeatured: true,
    deploy: "https://horse-hotel-ams.vercel.app",
    repository: "https://github.com/dev-erickydias/horse-hotel-ams",
    framework: "Vite",
    status: "ready",
  },
  {
    id: 38,
    name: "Fronnexus",
    description:
      "Site profissional da agência Fronnexus com animações 3D usando Three.js e GSAP, efeitos visuais avançados como Plasma e PixelBlast, formulário de contato com EmailJS, e integração Supabase.",
    longDescription:
      "Fronnexus é o site oficial da agência/freelance de desenvolvimento web. Apresenta animações 3D impressionantes com Three.js e GSAP, efeitos visuais customizados como Plasma Effect e PixelBlast, apresentação dinâmica de projetos e equipe puxados do Supabase, formulário de contato integrado com EmailJS e React Hook Form com validação Zod, e design dark-mode imersivo.",
    technologies: ["Next.js 16", "React 19", "Three.js", "GSAP", "Supabase", "React Hook Form", "Zod", "EmailJS"],
    category: "portfolio",
    isFeatured: true,
    deploy: "https://fronnexus-peach.vercel.app",
    repository: "https://github.com/dev-erickydias/fronnexus",
    framework: "Next.js",
    status: "ready",
  },
  {
    id: 34,
    name: "ConnectEco",
    description:
      "Plataforma colaborativa que conecta cidadãos brasileiros a 2.786+ ecopontos de reciclagem. Inclui blog educativo, Google AdSense, analytics, e cadastro de materiais recicláveis. Projeto de equipe com 12 membros.",
    longDescription:
      "ConnectEco é uma plataforma web focada em sustentabilidade ambiental no Brasil. Permite localizar ecopontos de reciclagem por estado, cidade e bairro com dados de 2.786+ pontos de coleta. Conta com blog educativo sobre meio ambiente com sistema de categorias e tags, cadastro de materiais recicláveis com ícones e cores, painel de equipe com 12 membros, integração Google AdSense para monetização, analytics de eventos, e formulário de contato.",
    technologies: ["Next.js 14", "React 18", "Supabase", "Tailwind CSS", "Framer Motion", "Swiper", "Google Maps"],
    category: "sustentabilidade",
    isFeatured: true,
    deploy: "https://connecteco.vercel.app",
    repository: "https://github.com/dev-erickydias/connecteco",
    framework: "Next.js",
    status: "ready",
  },
  {
    id: 33,
    name: "CraftFood",
    description:
      "Plataforma moderna de receitas e alimentação com sistema de comentários integrado via Supabase, seção de receitas populares, e design responsivo com animações suaves.",
    longDescription:
      "CraftFood é uma aplicação web completa para o segmento gastronômico. Apresenta um catálogo de receitas com categorias, sistema de avaliação por estrelas com comentários dos usuários persistidos no Supabase, seção de receitas populares com destaque visual, e interface responsiva com animações CSS.",
    technologies: ["Next.js 15", "React 19", "Supabase", "CSS Modules", "Swiper"],
    category: "food",
    isFeatured: true,
    deploy: "https://craftfood.vercel.app",
    repository: "https://github.com/dev-erickydias/craftfood",
    framework: "Next.js",
    status: "ready",
  },
  {
    id: 35,
    name: "Heavens Hair",
    description:
      "Website profissional para o salão Heavens Hair em Portugal. Design elegante com apresentação de serviços, galeria, e informações de contacto. Domínio próprio heavenshair.pt.",
    longDescription:
      "Heavens Hair é um site institucional desenvolvido para um salão de cabeleireiro real em Portugal. Apresenta os serviços oferecidos, galeria de trabalhos, informações de localização e contacto. O design foi pensado para transmitir elegância e profissionalismo, refletindo a identidade visual do salão.",
    technologies: ["Next.js", "React", "Tailwind CSS", "SEO Optimization"],
    category: "institucional",
    isFeatured: true,
    deploy: "https://heavens-eight.vercel.app",
    repository: "https://github.com/dev-erickydias/heavens",
    framework: "Next.js",
    status: "ready",
  },
  {
    id: 32,
    name: "Bike Craft Origamid",
    description:
      "Projeto do curso Origamid de uma landing page responsiva para venda de bicicletas elétricas artesanais. Foco em HTML semântico, CSS Grid e design mobile-first.",
    longDescription:
      "Bike Craft é uma landing page institucional para uma marca fictícia de bicicletas elétricas artesanais, desenvolvida durante o curso da Origamid. O projeto foca em boas práticas de HTML5 semântico, CSS Grid Layout para estruturação de grids complexas, design responsivo mobile-first, e tipografia elegante.",
    technologies: ["HTML5", "CSS3", "CSS Grid", "Design Responsivo"],
    category: "landing-page",
    isFeatured: false,
    deploy: "https://bike-craft-origamid.vercel.app",
    repository: "https://github.com/dev-erickydias/bikeCraft-Origamid",
    framework: null,
    status: "ready",
  },
  {
    id: 39,
    name: "Triple Ten Closure",
    description:
      "Projeto de encerramento do bootcamp TripleTen. Aplicação web com design responsivo demonstrando habilidades adquiridas durante o curso de desenvolvimento web fullstack.",
    longDescription:
      "Triple Ten Closure é o projeto final desenvolvido como parte do bootcamp TripleTen de desenvolvimento web. Demonstra as competências adquiridas ao longo do curso, incluindo HTML semântico, CSS avançado, JavaScript, e boas práticas de desenvolvimento.",
    technologies: ["HTML5", "CSS3", "JavaScript", "Responsive Design"],
    category: "education",
    isFeatured: false,
    deploy: "https://triple-ten-closure.vercel.app",
    repository: "https://github.com/dev-erickydias/triple-ten-closure",
    framework: null,
    status: "ready",
  },
  {
    id: 42,
    name: "Project Origamid New SASS",
    description:
      "Exercício do curso Origamid para aprender SASS/SCSS. Projeto com variáveis, mixins, nesting, partials, e funções do pré-processador CSS.",
    longDescription:
      "Projeto desenvolvido durante o curso da Origamid para aprender SASS/SCSS como pré-processador CSS. Utiliza variáveis, mixins reutilizáveis, nesting para organização, partials para modularização, e funções SASS.",
    technologies: ["HTML5", "SASS/SCSS", "CSS3", "Design Responsivo"],
    category: "education",
    isFeatured: false,
    deploy: "https://project-origamid-new-sass.vercel.app",
    repository: "https://github.com/dev-erickydias/project-origamid-new-sass",
    framework: null,
    status: "ready",
  },
  {
    id: 43,
    name: "SoftSkill",
    description:
      "Aplicação web focada em soft skills e desenvolvimento pessoal. Apresentação de competências interpessoais importantes para o mercado de tecnologia.",
    longDescription:
      "SoftSkill é um projeto web que apresenta e discute habilidades interpessoais essenciais para profissionais de tecnologia. Aborda comunicação, trabalho em equipe, liderança, resolução de problemas, e adaptabilidade.",
    technologies: ["HTML5", "CSS3", "JavaScript"],
    category: "education",
    isFeatured: false,
    deploy: "https://softskill-seven.vercel.app",
    repository: "https://github.com/dev-erickydias/softskill",
    framework: null,
    status: "ready",
  },
];

export default projects;
