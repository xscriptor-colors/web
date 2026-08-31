"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useT } from "@/app/i18n-provider";
import { useTheme } from "@/hooks/useTheme";
import { XTextDecrypt } from "@/app/components/Xtexts/XTextDecrypt";
import styles from "./ClassicControls.module.css";

export default function ClassicControls() {
  const t = useT("ClassicControls");
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();

  const [menuOpen, setMenuOpen] = useState(false);
  const [isIframe, setIsIframe] = useState(false);
  const controlsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsIframe(window.self !== window.top);
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        menuOpen &&
        controlsRef.current &&
        !controlsRef.current.contains(e.target as Node)
      ) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpen]);

  const links = [
    { id: "home", url: "/", labelKey: "menuHome", ariaKey: "home" },
    { id: "vscode", url: "/vscode", labelKey: "vscode", ariaKey: "resources" },
    { id: "jetbrains", url: "/jetbrains", labelKey: "jetbrains", ariaKey: "resources" },
    { id: "hyprland", url: "/hyprland", labelKey: "hyprland", ariaKey: "resources" },
    { id: "terminal", url: "/terminal", labelKey: "terminal", ariaKey: "resources" },
    { id: "obsidian", url: "/obsidian", labelKey: "obsidian", ariaKey: "resources" },
    { id: "colors", url: "/colors", labelKey: "colors", ariaKey: "resources" },
    { id: "github", url: "https://github.com/xscriptor-colors", labelKey: "menuXscriptor", ariaKey: "xscriptor", external: true },
  ];

  const pathWithoutLocale = pathname.replace(/\/$/, "") || "/";

  if (isIframe) return null;

  const isActive = (url: string) => {
    if (!url.startsWith("/")) return false;
    const linkPath = url === "/" ? "/" : url.replace(/\/$/, "");
    return linkPath === "/"
      ? pathWithoutLocale === "/"
      : pathWithoutLocale.startsWith(linkPath);
  };

  return (
    <>
      <div ref={controlsRef} className={styles.container}>
        <div className={styles.frame}>
          <div className={styles.panel}>
          <div className={styles.segment} role="group" aria-label={t("theme")}>
            <span
              aria-hidden="true"
              className={`${styles.thumb} ${theme === "dark" ? styles.thumbDark : ""}`}
            />
            <button
              type="button"
              onClick={() => setTheme("light")}
              aria-pressed={theme === "light"}
              className={`${styles.segmentBtn} ${
                theme === "light" ? styles.segmentBtnActive : ""
              }`}
            >
              {t("light")}
            </button>
            <button
              type="button"
              onClick={() => setTheme("dark")}
              aria-pressed={theme === "dark"}
              className={`${styles.segmentBtn} ${
                theme === "dark" ? styles.segmentBtnActive : ""
              }`}
            >
              {t("dark")}
            </button>
          </div>

          <span className={styles.divider} aria-hidden="true" />

          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? t("menuClose") : t("menuOpen")}
            aria-expanded={menuOpen}
            className={`${styles.square} ${menuOpen ? styles.squareOpen : ""}`}
          >
            <span className={styles.bars} aria-hidden="true">
              <span className={`${styles.bar} ${styles.barTop}`} />
              <span className={`${styles.bar} ${styles.barMid}`} />
              <span className={`${styles.bar} ${styles.barBottom}`} />
            </span>
          </button>
          </div>
        </div>

        {menuOpen && (
          <div className={styles.menu}>
            <div className={styles.menuPanel}>
              <span className={styles.menuLabel}>{t("navigation")}</span>

              <nav aria-label={t("navigation")}>
                <ol className={styles.linkList}>
                  {links.map((link, i) => (
                    <li
                      key={link.id}
                      className={styles.linkItem}
                      style={{ animationDelay: `${i * 50 + 60}ms` }}
                    >
                    <Link
                      href={link.url}
                      target={link.external ? "_blank" : undefined}
                      rel={link.external ? "noopener noreferrer" : undefined}
                      onClick={() => setMenuOpen(false)}
                      style={{ "--cc": `var(--cc${(i % 6) + 1})` } as CSSProperties}
                      className={`${styles.menuLink} ${
                        isActive(link.url) ? styles.menuLinkActive : ""
                      }`}
                    >
                      <span className={styles.linkIndex}>0{i + 1}</span>
                      <XTextDecrypt
                        text={link.id === "github" ? "GitHub" : t(link.labelKey)}
                        animateOn="view"
                        sequential
                        revealDirection="start"
                        speed={45}
                        maxIterations={6}
                        delay={i * 140 + 200}
                        parentClassName={styles.linkText}
                        encryptedClassName={styles.encrypted}
                      />
                      </Link>
                    </li>
                  ))}
                </ol>
              </nav>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
