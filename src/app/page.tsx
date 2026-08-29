"use client";

import { type CSSProperties } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import ColorRain from "@/app/components/ColorRain";
import { XTitle } from "@/app/components/Xtexts";
import { XTextDecrypt } from "@/app/components/Xtexts/XTextDecrypt";
import { resourceRepos } from "@/data/resources/resources.data";
import {
  VscodeIcon, TerminalIcon, ObsidianIcon,
  JetBrainsIcon, WebLabIcon, ColorsIcon,
  FreshIcon, HyprlandIcon, MacosIcon, WindowsIcon,
  IdeIcon, NvimIcon, XwwIcon,
} from "@/app/components/xcomponents/icons";
import Footer from "@/app/components/footer/footer";
import styles from "./home.module.css";
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



export default function Home() {
  const allRepos = resourceRepos.filter((r) => r.href);

  return (
    <>
      <div style={{ position: "fixed", inset: 0, zIndex: 0, background: "var(--background)" }}>
        <ColorRain />
      </div>

      <div
        style={{
          position: "relative",
          zIndex: 1,
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 24,
          padding: "4rem 1rem 2rem",
        }}
      >
        <XTitle em="Colors">Xscriptor</XTitle>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          style={{
            color: "var(--text-muted)",
            maxWidth: "42rem",
            textAlign: "center",
            lineHeight: 1.8,
          }}
        >
          Open-source resources from Xscriptor Colors — themes, tweaks and
          customizations for VS Code, JetBrains, Obsidian, terminal, and more...
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          style={{ width: "100%", display: "flex", justifyContent: "center" }}
        >
          <div className={styles.grid}>
            {allRepos.map((repo, i) => (
              <RepoCard key={repo.name} repo={repo} colorIndex={i} />
            ))}
          </div>
        </motion.div>

        <Footer />
      </div>
    </>
  );
}
