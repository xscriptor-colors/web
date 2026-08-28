"use client";

import { useState, type CSSProperties } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useT } from "@/app/i18n-provider";
import { usePageMeta } from "@/app/hooks/usePageMeta";
import { resourceRepos } from "@/data/resources/resources.data";
import {
  VscodeIcon, TerminalIcon, ObsidianIcon,
  JetBrainsIcon, WebLabIcon, ColorsIcon,
  FreshIcon, HyprlandIcon, MacosIcon, WindowsIcon,
  IdeIcon, NvimIcon, XwwIcon,
} from "@/app/components/xcomponents/icons";
import { XTitle } from "@/app/components/Xtexts";
import { XTextDecrypt } from "@/app/components/Xtexts/XTextDecrypt";
import ColorRain from "@/app/components/ColorRain";
import Footer from "@/app/components/footer/footer";
import styles from "./resources.module.css";
import type { ResourceRepo } from "@/types/resources/resources.types";

const iconMap: Record<string, React.ComponentType<{ size?: number; color?: string }>> = {
  vscode: VscodeIcon, terminal: TerminalIcon,
  obsidian: ObsidianIcon, jetbrains: JetBrainsIcon,
  web: WebLabIcon, colors: ColorsIcon,
  fresh: FreshIcon, hyprland: HyprlandIcon,
  macos: MacosIcon, windows: WindowsIcon,
  ide: IdeIcon, nvim: NvimIcon, xww: XwwIcon,
};

function RepoCard({ repo, colorIndex }: { repo: ResourceRepo; colorIndex: number }) {
  const Icon = iconMap[repo.name];
  const isExternal = !repo.href.startsWith("/");
  const ccVar = `var(--cc${(colorIndex % 6) + 1})`;

  return (
    <Link
      href={repo.href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      aria-label={repo.name}
      className={styles.card}
      style={{ "--cc": ccVar } as CSSProperties}
    >
      <div className={styles.panel}>
        {Icon ? (
          <span className={styles.keyIcon}>
            <Icon color="currentColor" />
          </span>
        ) : (
          <span className={styles.keyGlyph}>X</span>
        )}
        <XTextDecrypt
          text={repo.name}
          animateOn="view"
          sequential
          revealDirection="start"
          speed={45}
          maxIterations={6}
          delay={colorIndex * 100 + 150}
          parentClassName={styles.repoName}
          encryptedClassName={styles.encrypted}
        />
      </div>
    </Link>
  );
}

const FILTER_OPTIONS = [
  { key: "themes" },
  { key: "applications" },
  { key: "internal" },
  { key: "external" },
];

const categoryMap: Record<string, string> = {
  vscode: "themes", jetbrains: "themes", terminal: "themes",
  obsidian: "themes", colors: "themes", fresh: "themes",
  hyprland: "applications", ide: "applications", nvim: "applications",
  macos: "applications", windows: "applications", web: "applications",
  xww: "applications",
};

export default function ResourcesPage() {
  const t = useT("ResourcesPage");
  usePageMeta(`${t("title1")} ${t("title1Em")}`);
  const [typeFilter, setTypeFilter] = useState("");

  const filterLabels: Record<string, string> = {
    themes: t("filterThemes"),
    applications: t("filterApps"),
    internal: t("filterInternal"),
    external: t("filterExternal"),
  };

  const allRepos = resourceRepos.filter((r) => r.href);

  const filtered = allRepos.filter((r) => {
    const isExternal = !r.href.startsWith("/");
    const cat = categoryMap[r.name] || "applications";
    if (typeFilter === "themes") return cat === "themes";
    if (typeFilter === "applications") return cat === "applications";
    if (typeFilter === "internal") return !isExternal;
    if (typeFilter === "external") return isExternal;
    return true;
  });

  return (
    <>
      {/* Full-viewport matrix background — same pattern as FlowFieldBg */}
      <div style={{ position: "fixed", inset: 0, zIndex: 0, background: "var(--background)" }}>
        <ColorRain />
      </div>

      {/* Content in normal flow — the page itself scrolls */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 20,
        }}
      >
        <div style={{ width: "100%", maxWidth: "72rem", margin: "0 auto" }}>
          <XTitle em={t("title1Em")}>{t("title1")}</XTitle>
        </div>

        <div className={styles.filters}>
          {FILTER_OPTIONS.map((f) => {
            const active = typeFilter === f.key;
            return (
              <button
                key={f.key}
                onClick={() => setTypeFilter(active ? "" : f.key)}
                className={`${styles.filterBtn} ${
                  active ? styles.filterBtnActive : ""
                }`}
              >
                {active && (
                  <motion.span
                    layoutId="filter-thumb"
                    className={styles.filterThumb}
                    transition={{ type: "spring", stiffness: 420, damping: 34 }}
                  />
                )}
                <span className={styles.filterLabel}>{filterLabels[f.key]}</span>
              </button>
            );
          })}
        </div>

        <div className={styles.grid}>
          {filtered.map((repo, i) => (
            <RepoCard key={repo.name} repo={repo} colorIndex={i} />
          ))}
        </div>

        <Footer />
      </div>
    </>
  );
}
