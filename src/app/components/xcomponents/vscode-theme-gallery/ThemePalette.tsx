"use client";

import { vscodePaletteRoles } from "@/data/resources/vscode/vscodeThemes.data";
import type { VscodeTheme } from "@/types/resources/vscode.types";

import styles from "./VscodeThemeGallery.module.css";

type ThemePaletteProps = {
  theme: VscodeTheme;
};

export default function ThemePalette({ theme }: ThemePaletteProps) {
  return (
    <section className={styles.paletteCard}>
      <div className={styles.paletteHeader}>
        <span className={styles.paletteTitle}>Palette</span>
        <span className={styles.paletteCount}>16 tokens</span>
      </div>

      <div className={styles.paletteGrid}>
        {vscodePaletteRoles.map((paletteItem) => {
          const hex = theme.colors[paletteItem.key];
          const label = `${paletteItem.label}: ${hex}`;

          return (
            <article
              key={paletteItem.key}
              className={styles.paletteItem}
              aria-label={label}
              title={label}
            >
              <div
                className={styles.paletteSwatch}
                style={{ backgroundColor: hex }}
                aria-hidden="true"
              />
              <div className={styles.paletteMeta}>
                <span className={styles.paletteLabel}>{paletteItem.label}</span>
                <span className={styles.paletteValue}>{hex}</span>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
