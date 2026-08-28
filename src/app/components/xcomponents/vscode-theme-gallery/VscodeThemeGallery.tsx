"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { useT } from "@/app/i18n-provider";
import VscodeEditorPreview from "./VscodeEditorPreview";
import styles from "./VscodeThemeGallery.module.css";

export default function VscodeThemeGallery() {
  const t = useT("VscodeThemeGallery");
  const prefersReducedMotion = useReducedMotion();
  const [activeThemeId, setActiveThemeId] = useState("x");

  const features = [
    {
      title: "12 Color Themes",
      desc: "9 dark, 3 light — each hand-crafted with unique palette psychology.",
      color: "#fc618d",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="3" y="3" width="8" height="8" rx="1" /><rect x="13" y="3" width="8" height="8" rx="1" />
          <rect x="3" y="13" width="8" height="8" rx="1" /><rect x="13" y="13" width="8" height="8" rx="1" />
          <circle cx="7" cy="7" r="1.5" fill="currentColor" stroke="none" />
          <circle cx="17" cy="7" r="1.5" fill="currentColor" stroke="none" />
          <circle cx="7" cy="17" r="1.5" fill="currentColor" stroke="none" />
          <circle cx="17" cy="17" r="1.5" fill="currentColor" stroke="none" />
        </svg>
      ),
    },
    {
      title: "13 Icon Themes",
      desc: "44+ language icons, 294 folder associations — all palette-matched.",
      color: "#fce566",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" />
        </svg>
      ),
    },
    {
      title: "WCAG 2.1 AA Verified",
      desc: "Every theme passes automated contrast checks.",
      color: "#7bd88f",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M22 11.08V12a10 10 0 11-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />
        </svg>
      ),
    },
    {
      title: "Bracket Pair Guides",
      desc: "6 nesting levels with distinct palette colors.",
      color: "#fd9353",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M8 3H7a2 2 0 00-2 2v5a2 2 0 01-2 2 2 2 0 012 2v5a2 2 0 002 2h1" />
          <path d="M16 3h1a2 2 0 012 2v5a2 2 0 002 2 2 2 0 00-2 2v5a2 2 0 01-2 2h-1" />
        </svg>
      ),
    },
    {
      title: "Compatible Everywhere",
      desc: "VS Code, VSCodium, Cursor, Windsurf, Positron.",
      color: "#948ae3",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="2" y="3" width="20" height="14" rx="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" />
        </svg>
      ),
    },
  ];

  return (
    <div className={styles.shell} data-stage-surface="vscode-gallery" data-dimmed="false">
      <p className={styles.srOnly} aria-live="polite">
        {activeThemeId} theme selected
      </p>

      <motion.div
        key={activeThemeId}
        initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.28, ease: "easeOut" }}
        className={styles.main}
      >
        <VscodeEditorPreview
          theme={activeThemeId}
          onThemeChange={setActiveThemeId}
        />

        {/* Hero section */}
        <section className={styles.heroSection}>
          <p className={styles.heroSubtitle}>
            Hand-crafted color themes, palette-matched icon themes, and a custom product icon set for VS Code. WCAG 2.1 AA verified.
          </p>
          <div className={styles.heroActions}>
            <a
              className={styles.primaryButton}
              href={`https://vscode.dev/theme/xscriptor.xscriptor-themes/${activeThemeId.charAt(0).toUpperCase() + activeThemeId.slice(1)}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Try on vscode.dev
            </a>
            <a
              className={styles.secondaryButton}
              href="https://marketplace.visualstudio.com/items?itemName=xscriptor.xscriptor-themes"
              target="_blank"
              rel="noopener noreferrer"
            >
              Marketplace
            </a>
            <a
              className={styles.secondaryButton}
              href="https://github.com/xscriptor-colors/vscode/tree/main/themes/xscriptor-themes"
              target="_blank"
              rel="noopener noreferrer"
            >
              {t("viewSourceCode")}
            </a>
          </div>
        </section>

        {/* Theme gallery grid */}
        <section className={styles.themeGridSection}>
          <h2 className={styles.sectionTitle}>
            Try Any Theme <em className={styles.sectionTitleEm}>Live</em>
          </h2>
          <p className={styles.sectionDesc}>
            Each opens the real VS Code for the Web with the palette pre-applied.
          </p>
          <div className={styles.themeGrid}>
            {["X","Miami","Tokio","Oslo","Praha","Berlin","Madrid","Paris","Bogota","Helsinki","London","Lahabana"].map((name, i) => {
              const slug = name.toLowerCase();
              return (
                <motion.a
                  key={slug}
                  href={`https://vscode.dev/theme/xscriptor.xscriptor-themes/${name}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.04, duration: 0.3 }}
                  className={styles.themeGridCard}
                >
                  <div className={styles.themeGridCardHeader}>
                    <span className={styles.themeGridCardName}>{name}</span>
                    <span className={styles.themeGridCardDot} style={{ backgroundColor: slug === activeThemeId ? "#fc618d" : "#666" }} />
                  </div>
                  <div className={styles.themeGridCardPreview} style={{ background: "#0a0a0a" }}>
                    <div className={styles.themeGridCardSwatches}>
                      {["#fc618d","#fce566","#7bd88f","#fd9353","#948ae3","#5ad4e6","#e0e0e0","#555"].map((c) => (
                        <span key={c} className={styles.themeGridSwatch} style={{ backgroundColor: c }} />
                      ))}
                    </div>
                    <div className={styles.themeGridCardOverlay}>
                      <span>Open live</span>
                    </div>
                  </div>
                </motion.a>
              );
            })}
          </div>
        </section>

        {/* Feature cards */}
        <section className={styles.featuresSection}>
          <h2 className={styles.sectionTitle}>
            Beyond <em className={styles.sectionTitleEm}>Color</em>
          </h2>
          <p className={styles.sectionDesc}>
            Icon themes, product icons, bracket guides — every pixel follows the palette.
          </p>
          <div className={styles.featureGrid}>
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className={styles.featureCard}
              >
                <div className={styles.featureIconWrap} style={{ color: feature.color }}>
                  {feature.icon}
                </div>
                <h3 className={styles.featureTitle}>{feature.title}</h3>
                <p className={styles.featureDesc}>{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

      </motion.div>
    </div>
  );
}
