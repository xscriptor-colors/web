"use client";

import { memo, useState } from "react";
import { ANSI_LABELS, type ThemePalette } from "@/data/resources/colors/colors.data";
import styles from "./colors.module.css";

type ThemeCardProps = {
  theme: ThemePalette;
  delay: number;
};

function ThemeCard({ theme, delay }: ThemeCardProps) {
  const [hovered, setHovered] = useState<number | null>(null);
  const [copied, setCopied] = useState<string | null>(null);

  const copy = async (hex: string) => {
    try {
      await navigator.clipboard.writeText(hex);
      setCopied(hex);
      setTimeout(() => setCopied(null), 1200);
    } catch {}
  };

  return (
    <div className={styles.card} style={{ animationDelay: `${delay}ms` }}>
      <div className={styles.swatchGrid}>
        {theme.colors.map((hex, ci) => (
          <button
            key={ci}
            onClick={() => copy(hex)}
            onMouseEnter={() => setHovered(ci)}
            onMouseLeave={() => setHovered(null)}
            className={styles.swatch}
            style={{ backgroundColor: hex }}
            title={`${ANSI_LABELS[ci]}: ${hex}`}
          >
            <div
              className={`${styles.swatchGlow} ${
                hovered === ci ? styles.swatchGlowOn : ""
              }`}
            />
          </button>
        ))}
      </div>

      <div className={styles.meta}>
        <div className={styles.metaRow}>
          <h2 className={styles.cardTitle} style={{ color: "var(--foreground)" }}>
            {theme.name}
          </h2>
          <div className={styles.bgFg}>
            {[{ label: "Bg", hex: theme.background }, { label: "Fg", hex: theme.foreground }].map(({ label, hex }) => (
              <button key={label} onClick={() => copy(hex)} className={styles.bgFgBtn}>
                <span className={styles.bgFgLabel}>{label}</span>
                <div
                  className={styles.bgFgSwatch}
                  style={{ backgroundColor: hex, borderColor: "color-mix(in srgb, var(--border) 30%, transparent)" }}
                />
              </button>
            ))}
          </div>
        </div>

        <div className={styles.status}>
          <div
            className={`${styles.statusText} ${hovered !== null ? styles.statusTextOn : ""}`}
            style={{ color: "var(--primary)" }}
          >
            {hovered !== null ? `${ANSI_LABELS[hovered]}: ${theme.colors[hovered]}` : ""}
          </div>
          <div
            className={`${styles.statusText} ${
              copied && hovered === null ? styles.statusTextOn : ""
            }`}
            style={{ color: "var(--primary)" }}
          >
            {copied && hovered === null ? `✓ ${copied}` : ""}
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(ThemeCard);
