"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useI18n } from "../i18n/I18nContext";

const MIN_W = 360;
const MIN_H = 300;

export default function ProjectModal({ project, onClose }) {
  const closeRef = useRef(null);
  const windowRef = useRef(null);
  const { t } = useI18n();
  const [previewUrl, setPreviewUrl] = useState(null);
  const [iframeStatus, setIframeStatus] = useState("loading");
  const [isMaximized, setIsMaximized] = useState(false);
  const [windowRect, setWindowRect] = useState(null);
  const iframeTimerRef = useRef(null);
  const dragRef = useRef(null);
  const resizeRef = useRef(null);
  const prevRect = useRef(null);

  // Initialize centered window
  useEffect(() => {
    const w = Math.min(620, window.innerWidth - 40);
    const h = Math.min(560, window.innerHeight - 40);
    setWindowRect({
      x: (window.innerWidth - w) / 2,
      y: (window.innerHeight - h) / 2,
      w,
      h,
    });
  }, []);

  useEffect(() => {
    const handleEsc = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handleEsc);
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "auto";
      if (iframeTimerRef.current) clearTimeout(iframeTimerRef.current);
    };
  }, [onClose]);

  // Drag logic
  const onDragStart = useCallback((e) => {
    if (isMaximized) return;
    e.preventDefault();
    const startX = e.clientX;
    const startY = e.clientY;
    const startRect = { ...windowRect };

    const onMove = (ev) => {
      setWindowRect({
        ...startRect,
        x: startRect.x + (ev.clientX - startX),
        y: Math.max(0, startRect.y + (ev.clientY - startY)),
      });
    };
    const onUp = () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseup", onUp);
    };
    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseup", onUp);
  }, [windowRect, isMaximized]);

  // Resize logic
  const onResizeStart = useCallback((e, direction) => {
    if (isMaximized) return;
    e.preventDefault();
    e.stopPropagation();
    const startX = e.clientX;
    const startY = e.clientY;
    const startRect = { ...windowRect };

    const onMove = (ev) => {
      let { x, y, w, h } = startRect;
      const dx = ev.clientX - startX;
      const dy = ev.clientY - startY;

      if (direction.includes("e")) w = Math.max(MIN_W, w + dx);
      if (direction.includes("s")) h = Math.max(MIN_H, h + dy);
      if (direction.includes("w")) {
        const newW = Math.max(MIN_W, w - dx);
        x = x + (w - newW);
        w = newW;
      }
      if (direction.includes("n")) {
        const newH = Math.max(MIN_H, h - dy);
        y = Math.max(0, y + (h - newH));
        h = newH;
      }
      setWindowRect({ x, y, w, h });
    };
    const onUp = () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseup", onUp);
    };
    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseup", onUp);
  }, [windowRect, isMaximized]);

  const toggleMaximize = useCallback(() => {
    if (isMaximized) {
      if (prevRect.current) setWindowRect(prevRect.current);
      setIsMaximized(false);
    } else {
      prevRect.current = windowRect;
      setWindowRect({ x: 0, y: 0, w: window.innerWidth, h: window.innerHeight });
      setIsMaximized(true);
    }
  }, [isMaximized, windowRect]);

  const handlePreview = useCallback((url) => {
    setIframeStatus("loading");
    setPreviewUrl(url);
    // Expand window for preview
    if (!isMaximized && windowRect) {
      const newW = Math.min(1100, window.innerWidth - 40);
      const newH = Math.min(700, window.innerHeight - 40);
      setWindowRect({
        x: (window.innerWidth - newW) / 2,
        y: (window.innerHeight - newH) / 2,
        w: newW,
        h: newH,
      });
    }
    // Longer timeout — some sites take a while to load
    iframeTimerRef.current = setTimeout(() => {
      setIframeStatus((prev) => prev === "loading" ? "blocked" : prev);
    }, 12000);
  }, [isMaximized, windowRect]);

  const handleIframeLoad = useCallback(() => {
    if (iframeTimerRef.current) clearTimeout(iframeTimerRef.current);
    // Check if iframe actually loaded content or was blocked
    // When blocked by CSP, onLoad fires but we can't access contentWindow
    try {
      const iframe = document.querySelector(".modal__iframe");
      if (iframe) {
        // Try to access iframe — if blocked, this throws
        const iframeDoc = iframe.contentWindow?.location?.href;
        // If we get "about:blank", it was blocked
        if (iframeDoc === "about:blank") {
          setIframeStatus("blocked");
          return;
        }
      }
    } catch {
      // Cross-origin — this is actually GOOD, means it loaded
    }
    setIframeStatus("loaded");
  }, []);

  const handleIframeError = useCallback(() => {
    if (iframeTimerRef.current) clearTimeout(iframeTimerRef.current);
    setIframeStatus("blocked");
  }, []);

  const handleBack = () => {
    setPreviewUrl(null);
    setIframeStatus("loading");
    if (iframeTimerRef.current) clearTimeout(iframeTimerRef.current);
    // Shrink back
    if (!isMaximized) {
      const w = Math.min(620, window.innerWidth - 40);
      const h = Math.min(560, window.innerHeight - 40);
      setWindowRect({ x: (window.innerWidth - w) / 2, y: (window.innerHeight - h) / 2, w, h });
    }
  };

  if (!project || !windowRect) return null;

  const isPreview = !!previewUrl;
  const style = isMaximized
    ? { inset: 0, width: "100%", height: "100%", borderRadius: 0 }
    : { left: windowRect.x, top: windowRect.y, width: windowRect.w, height: windowRect.h };

  return (
    <div className="modal__overlay" onClick={onClose} role="presentation">
      <div
        ref={windowRef}
        className={`modal__window ${isMaximized ? "modal__window--max" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-modal-title"
        onClick={(e) => e.stopPropagation()}
        style={style}
      >
        {/* Resize handles */}
        {!isMaximized && (
          <>
            <div className="modal__resize modal__resize--n" onMouseDown={(e) => onResizeStart(e, "n")} />
            <div className="modal__resize modal__resize--s" onMouseDown={(e) => onResizeStart(e, "s")} />
            <div className="modal__resize modal__resize--e" onMouseDown={(e) => onResizeStart(e, "e")} />
            <div className="modal__resize modal__resize--w" onMouseDown={(e) => onResizeStart(e, "w")} />
            <div className="modal__resize modal__resize--ne" onMouseDown={(e) => onResizeStart(e, "ne")} />
            <div className="modal__resize modal__resize--nw" onMouseDown={(e) => onResizeStart(e, "nw")} />
            <div className="modal__resize modal__resize--se" onMouseDown={(e) => onResizeStart(e, "se")} />
            <div className="modal__resize modal__resize--sw" onMouseDown={(e) => onResizeStart(e, "sw")} />
          </>
        )}

        {/* Title bar */}
        <div className="modal__tab-bar" onMouseDown={onDragStart} onDoubleClick={toggleMaximize}>
          <div className="modal__tab-dots">
            <button className="modal__dot modal__dot--red" onClick={onClose} aria-label={t("projects.closeModal")} onMouseDown={(e) => e.stopPropagation()} />
            <button className="modal__dot modal__dot--yellow" onClick={toggleMaximize} aria-label="Minimize" onMouseDown={(e) => e.stopPropagation()} />
            <button className="modal__dot modal__dot--green" onClick={toggleMaximize} aria-label="Maximize" onMouseDown={(e) => e.stopPropagation()} />
          </div>

          {isPreview && (
            <button className="modal__tab-back" onClick={handleBack} onMouseDown={(e) => e.stopPropagation()} aria-label="Back">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
            </button>
          )}

          <div className="modal__tab-active">
            <svg className="modal__tab-icon" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><line x1="3" y1="9" x2="21" y2="9" />
            </svg>
            <span className="modal__tab-title">{project.name}</span>
          </div>

          <button ref={closeRef} className="modal__tab-close" onClick={onClose} onMouseDown={(e) => e.stopPropagation()} aria-label={t("projects.closeModal")}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
          </button>
        </div>

        {/* URL bar */}
        <div className="modal__url-bar">
          <div className="modal__url-lock">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
          </div>
          <span className="modal__url-text">
            {isPreview ? previewUrl : (project.repository || `github.com/${project.name}`)}
          </span>
          {isPreview && (
            <a className="modal__url-external" href={previewUrl} target="_blank" rel="noopener noreferrer" aria-label="Open in new tab">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" /></svg>
            </a>
          )}
          {!isPreview && project.deploy && (
            <button className="modal__url-go" onClick={() => handlePreview(project.deploy)} aria-label="Preview site">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
            </button>
          )}
        </div>

        {/* Content */}
        {isPreview ? (
          <div className="modal__browser">
            {iframeStatus === "loading" && (
              <div className="modal__iframe-loading">
                <div className="modal__iframe-spinner" />
              </div>
            )}
            {iframeStatus === "blocked" && (
              <div className="modal__iframe-blocked">
                <div className="modal__blocked-icon">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><line x1="3" y1="9" x2="21" y2="9" /><circle cx="8" cy="6" r="0.5" fill="currentColor" /><circle cx="11" cy="6" r="0.5" fill="currentColor" /><line x1="9" y1="13" x2="15" y2="19" /><line x1="15" y1="13" x2="9" y2="19" /></svg>
                </div>
                <h3 className="modal__blocked-title">{t("projects.previewBlocked") || "Preview not available"}</h3>
                <p className="modal__blocked-text">{t("projects.previewBlockedDesc") || "This site doesn't allow embedded previews for security reasons."}</p>
                <a className="modal__blocked-btn" href={previewUrl} target="_blank" rel="noopener noreferrer">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" /></svg>
                  {t("projects.openNewTab") || "Open in new tab"}
                </a>
              </div>
            )}
            <iframe
              src={previewUrl}
              className={`modal__iframe ${iframeStatus === "blocked" ? "modal__iframe--hidden" : ""}`}
              title={`Preview of ${project.name}`}
              onLoad={handleIframeLoad}
              onError={handleIframeError}
              sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
            />
          </div>
        ) : (
          <div className="modal__body">
            <div className="modal__meta">
              {project.language && <span className="modal__meta-tag modal__meta-tag--accent">{project.language}</span>}
              <span className="modal__meta-tag">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
                {project.stars || 0}
              </span>
              <span className="modal__meta-tag">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><circle cx="12" cy="18" r="3" /><circle cx="6" cy="6" r="3" /><circle cx="18" cy="6" r="3" /><path d="M18 9v2c0 .6-.4 1-1 1H7c-.6 0-1-.4-1-1V9" /><path d="M12 12v3" /></svg>
                {project.forks || 0}
              </span>
              {project.updatedAt && (
                <span className="modal__meta-tag">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
                  {new Date(project.updatedAt).toLocaleDateString("en-US", { month: "short", year: "numeric" })}
                </span>
              )}
            </div>

            <h2 id="project-modal-title" className="modal__title font-display">{project.name}</h2>
            <p className="modal__description">{project.longDescription || project.description}</p>

            {project.technologies?.length > 0 && (
              <div className="modal__techs">
                {project.technologies.map((tech) => (<span key={tech} className="modal__tech">{tech}</span>))}
              </div>
            )}

            <div className="modal__btns">
              {project.deploy && (
                <button className="modal__btn modal__btn--site" onClick={() => handlePreview(project.deploy)}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></svg>
                  {t("projects.liveSite")}
                </button>
              )}
              {project.repository && (
                <a className="modal__btn modal__btn--repo" href={project.repository} target="_blank" rel="noopener noreferrer">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
                  {t("projects.repository")}
                </a>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
