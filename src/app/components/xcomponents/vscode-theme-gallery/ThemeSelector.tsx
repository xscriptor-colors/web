"use client";

import Image from "next/image";
import type { KeyboardEvent } from "react";
import { useRef } from "react";

import type { VscodeTheme } from "@/types/resources/vscode.types";
import { withBasePath } from "@/lib/base-path";

import styles from "./VscodeThemeGallery.module.css";

type ThemeSelectorProps = {
  themes: VscodeTheme[];
  selectedSlug: string | null;
  onSelect: (slug: string) => void;
  onReset: () => void;
};

function cn(...values: Array<string | false | null | undefined>) {
  return values.filter(Boolean).join(" ");
}

export default function ThemeSelector({
  themes,
  selectedSlug,
  onSelect,
  onReset,
}: ThemeSelectorProps) {
  const buttonRefs = useRef<Array<HTMLButtonElement | null>>([]);

  function moveSelection(index: number) {
    const nextTheme = themes[index];

    if (!nextTheme) {
      return;
    }

    onSelect(nextTheme.slug);
    buttonRefs.current[index]?.focus();
  }

  function handleKeyDown(index: number, event: KeyboardEvent<HTMLButtonElement>) {
    switch (event.key) {
      case "ArrowRight":
      case "ArrowDown":
        event.preventDefault();
        moveSelection((index + 1) % themes.length);
        break;
      case "ArrowLeft":
      case "ArrowUp":
        event.preventDefault();
        moveSelection((index - 1 + themes.length) % themes.length);
        break;
      case "Home":
        event.preventDefault();
        moveSelection(0);
        break;
      case "End":
        event.preventDefault();
        moveSelection(themes.length - 1);
        break;
      default:
        break;
    }
  }

  return (
    <aside className={styles.selector}>
      <div className={styles.selectorCard}>
        <p id="vscode-theme-selector-hint" className={styles.srOnly}>
          Use the product icon to return to the intro video. Use arrow keys, Home or End to move
          between themes and open the interactive preview.
        </p>
        <button
          type="button"
          className={cn(styles.selectorResetButton, !selectedSlug && styles.selectorResetButtonActive)}
          onClick={onReset}
          aria-label="Return to the intro video preview"
          aria-pressed={!selectedSlug}
          title="Return to the intro video preview"
        >
          <Image
            src={withBasePath("/images/resources/vscode/xscriptor-themes/icon.webp")}
            alt=""
            width={72}
            height={72}
            className={styles.selectorResetImage}
            priority
          />
        </button>
        <div
          className={styles.selectorList}
          role="tablist"
          aria-label="VSCode themes"
          aria-describedby="vscode-theme-selector-hint"
        >
          {themes.map((theme, index) => {
            const isActive = theme.slug === selectedSlug;

            return (
              <button
                key={theme.slug}
                ref={(node) => {
                  buttonRefs.current[index] = node;
                }}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-controls={`vscode-theme-panel-${theme.slug}`}
                id={`vscode-theme-tab-${theme.slug}`}
                tabIndex={selectedSlug ? (isActive ? 0 : -1) : index === 0 ? 0 : -1}
                className={cn(styles.selectorButton, isActive && styles.selectorButtonActive)}
                onClick={() => onSelect(theme.slug)}
                onKeyDown={(event) => handleKeyDown(index, event)}
              >
                <span className={styles.selectorName}>{theme.name}</span>
              </button>
            );
          })}
        </div>
      </div>
    </aside>
  );
}
