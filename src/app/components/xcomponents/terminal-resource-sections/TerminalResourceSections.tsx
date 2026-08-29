"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { useT } from "@/app/i18n-provider";

import type {
  TerminalInstaller,
  TerminalTheme,
} from "@/types/resources/terminal.types";

import { TerminalFiltersIcon } from "@/app/components/xcomponents/icons";
import { withBasePath } from "@/lib/base-path";
import styles from "./TerminalResourceSections.module.css";

type TerminalResourceSectionsProps = {
  themes: TerminalTheme[];
  terminals: TerminalInstaller[];
  universalInstaller?: string;
  xfetchLogo?: string;
};

type CopyState = {
  key: string;
  copiedAt: number;
};

const COLOR_KEYS: (keyof TerminalTheme["colors"])[] = [
  "color0",
  "color1",
  "color2",
  "color3",
  "color4",
  "color5",
  "color6",
  "color7",
  "color8",
  "color9",
  "color10",
  "color11",
  "color12",
  "color13",
  "color14",
  "color15",
];

function normalizeQuery(value: string) {
  return value.trim().toLowerCase();
}

function hexToRgb(hex: string) {
  const normalized = hex.replace("#", "").trim();
  const value =
    normalized.length === 3
      ? normalized
          .split("")
          .map((char) => char + char)
          .join("")
      : normalized;

  if (!/^[0-9a-fA-F]{6}$/.test(value)) {
    return null;
  }

  const numberValue = Number.parseInt(value, 16);
  return {
    r: (numberValue >> 16) & 255,
    g: (numberValue >> 8) & 255,
    b: numberValue & 255,
  };
}

function relativeLuminance(hex: string) {
  const rgb = hexToRgb(hex);
  if (!rgb) {
    return 0;
  }

  const toLinear = (channel: number) => {
    const srgb = channel / 255;
    return srgb <= 0.04045 ? srgb / 12.92 : Math.pow((srgb + 0.055) / 1.055, 2.4);
  };

  const r = toLinear(rgb.r);
  const g = toLinear(rgb.g);
  const b = toLinear(rgb.b);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function contrastRatio(foreground: string, background: string) {
  const l1 = relativeLuminance(foreground);
  const l2 = relativeLuminance(background);
  const [lighter, darker] = l1 >= l2 ? [l1, l2] : [l2, l1];
  return (lighter + 0.05) / (darker + 0.05);
}

function mixHex(a: string, b: string, t: number) {
  const rgbA = hexToRgb(a);
  const rgbB = hexToRgb(b);
  if (!rgbA || !rgbB) {
    return a;
  }

  const clamp = (value: number) => Math.max(0, Math.min(255, Math.round(value)));
  const mix = (x: number, y: number) => clamp(x * (1 - t) + y * t);

  const r = mix(rgbA.r, rgbB.r);
  const g = mix(rgbA.g, rgbB.g);
  const bCh = mix(rgbA.b, rgbB.b);

  const hex = (value: number) => value.toString(16).padStart(2, "0");
  return `#${hex(r)}${hex(g)}${hex(bCh)}`;
}

function pickMostReadable(background: string, candidates: string[]) {
  return candidates
    .map((value) => ({ value, score: contrastRatio(value, background) }))
    .sort((a, b) => b.score - a.score)[0]?.value;
}

function pickReadablePair(background: string, candidates: string[]) {
  const ranked = candidates
    .map((value) => ({ value, score: contrastRatio(value, background) }))
    .sort((a, b) => b.score - a.score);

  const first = ranked[0]?.value;
  const second = ranked.find((entry) => entry.value !== first)?.value;

  return { first, second };
}

function ensureContrast(color: string, background: string, fallback: string, minRatio: number) {
  if (contrastRatio(color, background) >= minRatio) {
    return color;
  }

  let low = 0;
  let high = 1;
  let best = fallback;

  for (let i = 0; i < 18; i += 1) {
    const mid = (low + high) / 2;
    const mixed = mixHex(color, fallback, mid);
    const ratio = contrastRatio(mixed, background);

    if (ratio >= minRatio) {
      best = mixed;
      high = mid;
    } else {
      low = mid;
    }
  }

  return best;
}

function formatXfetchLogo(value?: string) {
  const fallback = `__  __
\\ \\/ /
 \\  /
 /  \\
/_/\\_\\
/____/linux`;

  const source = (value ?? fallback).replace(/\r\n/g, "\n").trimEnd();
  const lines = source.split("\n");

  const maxColumns = 54;
  const normalizedLines = lines.map((line) => {
    if (line.length <= maxColumns) {
      return line;
    }
    return `${line.slice(0, maxColumns - 1)}…`;
  });

  const beginIndex = normalizedLines.findIndex((line) => line.includes("BEGIN PUBLIC KEY"));
  const endIndex = normalizedLines.findIndex((line) => line.includes("END PUBLIC KEY"));

  if (beginIndex === -1 || endIndex === -1 || endIndex <= beginIndex) {
    return normalizedLines.join("\n");
  }

  const head = normalizedLines.slice(0, beginIndex + 1);
  const keyLines = normalizedLines.slice(beginIndex + 1, endIndex);
  const tail = normalizedLines.slice(endIndex);

  const maxKeyLines = 6;
  const keyPreview =
    keyLines.length > maxKeyLines
      ? [...keyLines.slice(0, 3), "…", ...keyLines.slice(-2)]
      : keyLines;

  return [...head, ...keyPreview, ...tail].join("\n");
}

export default function TerminalResourceSections({
  themes,
  terminals,
  universalInstaller,
  xfetchLogo,
}: TerminalResourceSectionsProps) {
  const t = useT("TerminalResourceSections");
  const [terminalSlug, setTerminalSlug] = useState<string>("all");
  const [query, setQuery] = useState("");
  const [previewThemeName, setPreviewThemeName] = useState(() => themes[0]?.name ?? "");
  const [copyState, setCopyState] = useState<CopyState | null>(null);

  const activeTerminal = useMemo(() => {
    if (terminalSlug === "all") {
      return null;
    }
    return terminals.find((terminal) => terminal.slug === terminalSlug) ?? null;
  }, [terminalSlug, terminals]);

  const filteredThemes = useMemo(() => {
    const normalized = normalizeQuery(query);
    if (!normalized) {
      return themes;
    }
    return themes.filter((theme) => theme.name.toLowerCase().includes(normalized));
  }, [query, themes]);

  const orderedTerminals = useMemo(() => {
    return [...terminals].sort((a, b) => a.name.localeCompare(b.name));
  }, [terminals]);

  const previewTheme = useMemo(() => {
    return themes.find((theme) => theme.name === previewThemeName) ?? themes[0] ?? null;
  }, [previewThemeName, themes]);

  const previewTerminalTokens = useMemo(() => {
    if (!previewTheme) {
      return null;
    }

    const background = previewTheme.colors.color0;
    const isDark = relativeLuminance(background) < 0.38;
    const terminalBg = isDark
      ? mixHex(background, "#000000", 0.78)
      : mixHex(background, "#ffffff", 0.12);

    const preferredForeground = isDark ? previewTheme.colors.color15 : previewTheme.colors.color7;
    const fallbackForeground = isDark ? previewTheme.colors.color7 : previewTheme.colors.color15;
    const foreground =
      contrastRatio(preferredForeground, terminalBg) >= contrastRatio(fallbackForeground, terminalBg)
        ? preferredForeground
        : fallbackForeground;

    const soft = mixHex(foreground, terminalBg, 0.18);
    const muted = mixHex(foreground, terminalBg, 0.32);
    const dim = mixHex(foreground, terminalBg, 0.5);

    const raw = {
      c2: previewTheme.colors.color2,
      c3: previewTheme.colors.color3,
      c4: previewTheme.colors.color4,
      c5: previewTheme.colors.color5,
      c6: previewTheme.colors.color6,
    };

    const c2 = ensureContrast(raw.c2, terminalBg, foreground, 4.5);
    const c3 = ensureContrast(raw.c3, terminalBg, foreground, 4.5);
    const c4 = ensureContrast(raw.c4, terminalBg, foreground, 4.5);
    const c5 = ensureContrast(raw.c5, terminalBg, foreground, 4.5);
    const c6 = ensureContrast(raw.c6, terminalBg, foreground, 4.5);

    return {
      terminalBg,
      foreground,
      soft,
      muted,
      dim,
      c2,
      c3,
      c4,
      c5,
      c6,
    };
  }, [previewTheme]);

  const copyToClipboard = async (key: string, value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopyState({ key, copiedAt: Date.now() });
    } catch {
      setCopyState(null);
    }
  };

  const wasCopied = (key: string) =>
    copyState?.key === key && Date.now() - copyState.copiedAt < 1400;

  return (
    <div className={styles.shell}>
      <section className={styles.controls} aria-label="Filters">
        <div className={styles.controlsHeader}>
          <h2 className={styles.controlsTitle}>
            <TerminalFiltersIcon size={18} />
            {t("filters")}
          </h2>
          <p className={styles.controlsMeta}>
            {t("themesCount", { filtered: filteredThemes.length, total: themes.length })}
          </p>
        </div>

        <div className={styles.controlsGrid}>
          <div className={styles.control}>
            <label htmlFor="terminal-filter" className={styles.controlLabel}>
              {t("terminal")}
            </label>
            <select
              id="terminal-filter"
              className={styles.select}
              value={terminalSlug}
              onChange={(event) => setTerminalSlug(event.target.value)}
            >
              <option value="all">{t("allTerminals")}</option>
              {orderedTerminals.map((terminal) => (
                <option key={terminal.slug} value={terminal.slug}>
                  {terminal.name}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.control}>
            <label htmlFor="theme-filter" className={styles.controlLabel}>
              {t("themeName")}
            </label>
            <input
              id="theme-filter"
              className={styles.input}
              type="search"
              value={query}
              placeholder={t("searchPlaceholder")}
              onChange={(event) => setQuery(event.target.value)}
            />
          </div>
        </div>

        <div className={styles.terminalChips} role="list">
          <button
            type="button"
            role="listitem"
            className={styles.chip}
            data-active={terminalSlug === "all"}
            onClick={() => setTerminalSlug("all")}
          >
            {t("all")}
          </button>
          {orderedTerminals.map((terminal) => (
            <button
              key={terminal.slug}
              type="button"
              role="listitem"
              className={styles.chip}
              data-active={terminalSlug === terminal.slug}
              onClick={() => setTerminalSlug(terminal.slug)}
            >
              {terminal.name}
            </button>
          ))}
        </div>
      </section>

      {previewTheme ? (
        <section className={styles.preview} aria-label="Terminal preview">
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>{t("preview")}</h2>
            <p className={styles.sectionDescription}>
              {t("previewDescription")}
            </p>
          </div>

          <div className={styles.previewControls}>
            <label htmlFor="preview-theme" className={styles.controlLabel}>
              {t("scheme")}
            </label>
            <select
              id="preview-theme"
              className={styles.select}
              value={previewThemeName}
              onChange={(event) => setPreviewThemeName(event.target.value)}
            >
              {themes.map((theme) => (
                <option key={theme.name} value={theme.name}>
                  {theme.name}
                </option>
              ))}
            </select>
          </div>

          {previewTerminalTokens ? (
              <div
                className={styles.previewSurface}
                style={{
                  backgroundImage: `url(${withBasePath("/images/terminal/terminal-background.webp")})`,
                }}
              >
              <div
                className={styles.terminalFrame}
                style={{
                  ["--t-bg" as never]: previewTerminalTokens.terminalBg,
                  ["--t-fg" as never]: previewTerminalTokens.foreground,
                  ["--t-muted" as never]: previewTerminalTokens.muted,
                  ["--t-soft" as never]: previewTerminalTokens.soft,
                  ["--t-dim" as never]: previewTerminalTokens.dim,
                  ["--t-c2" as never]: previewTerminalTokens.c2,
                  ["--t-c3" as never]: previewTerminalTokens.c3,
                  ["--t-c4" as never]: previewTerminalTokens.c4,
                  ["--t-c5" as never]: previewTerminalTokens.c5,
                  ["--t-c6" as never]: previewTerminalTokens.c6,
                }}
              >
                <div className={styles.terminalHeader}>
                  <div className={styles.trafficLights} aria-hidden="true">
                    <span className={styles.light} data-variant="close" />
                    <span className={styles.light} data-variant="min" />
                    <span className={styles.light} data-variant="max" />
                  </div>
                  <p className={styles.terminalTitle}>
                    terminal —{" "}
                    <span className={styles.terminalTitleAccent}>{previewTheme.name}</span>
                  </p>
                  <div className={styles.terminalHeaderSpacer} aria-hidden="true" />
                </div>

                <div className={styles.terminalBody}>
                  <p className={styles.terminalNotice}>
                    <span className={styles.noticeTag}>[oh-my-zsh]</span>{" "}
                    <span className={styles.noticeText}>{t("loadedTheme")}</span>{" "}
                    <span className={styles.tokenString}>&apos;af-magic&apos;</span>{" "}
                    <span className={styles.tokenDim}>•</span>{" "}
                    <span className={styles.noticeText}>{t("plugins")}</span>{" "}
                    <span className={styles.tokenKey}>git</span>
                    <span className={styles.tokenDim}>,</span>{" "}
                    <span className={styles.tokenKey}>z</span>
                    <span className={styles.tokenDim}>,</span>{" "}
                    <span className={styles.tokenKey}>sudo</span>
                  </p>
                  <p className={styles.promptLine}>
                    <span className={styles.promptUser}>xscriptor</span>
                    <span className={styles.promptAt}>@</span>
                    <span className={styles.promptHost}>x</span>{" "}
                    <span className={styles.promptPath}>~</span>{" "}
                    <span className={styles.promptSigil}>$</span>{" "}
                    <span className={styles.promptCommand}>xfetch</span>
                  </p>

                  <div className={styles.fetchGrid}>
                    <pre className={styles.logoBlock}>
                      <code>{formatXfetchLogo(xfetchLogo)}</code>
                    </pre>

                    <div className={styles.fetchColumns}>
                      <div className={styles.fetchSection}>
                        <p className={styles.fetchHeading}>{t("hardware")}</p>
                        <dl className={styles.fetchList}>
                          <div className={styles.fetchRow}>
                            <dt>host</dt>
                            <dd>xscriptor</dd>
                          </div>
                          <div className={styles.fetchRow}>
                            <dt>cpu</dt>
                            <dd>Intel(R) Core(TM) i7-14650HX @ 2.4 GHz</dd>
                          </div>
                          <div className={styles.fetchRow}>
                            <dt>memory</dt>
                            <dd>8.0 GiB / 64.0 GiB</dd>
                          </div>
                          <div className={styles.fetchRow}>
                            <dt>disk</dt>
                            <dd>0.0 GiB / 1.2 TiB</dd>
                          </div>
                        </dl>
                      </div>

                      <div className={styles.fetchSection}>
                        <p className={styles.fetchHeading}>{t("software")}</p>
                        <dl className={styles.fetchList}>
                          <div className={styles.fetchRow}>
                            <dt>os</dt>
                            <dd>Ubuntu 24.04</dd>
                          </div>
                          <div className={styles.fetchRow}>
                            <dt>shell</dt>
                            <dd>zsh 5.9</dd>
                          </div>
                          <div className={styles.fetchRow}>
                            <dt>terminal</dt>
                            <dd>xterm-256color</dd>
                          </div>
                          <div className={styles.fetchRow}>
                            <dt>editor</dt>
                            <dd>nvim</dd>
                          </div>
                        </dl>
                      </div>

                      <div className={styles.fetchSection}>
                        <p className={styles.fetchHeading}>{t("session")}</p>
                        <dl className={styles.fetchList}>
                          <div className={styles.fetchRow}>
                            <dt>uptime</dt>
                            <dd>2 hours, 55 mins</dd>
                          </div>
                          <div className={styles.fetchRow}>
                            <dt>theme</dt>
                            <dd>{previewTheme.name}</dd>
                          </div>
                          <div className={styles.fetchRow}>
                            <dt>locale</dt>
                            <dd>en_US.UTF-8</dd>
                          </div>
                        </dl>
                      </div>

                      <div className={styles.fetchSection}>
                        <p className={styles.fetchHeading}>{t("colors")}</p>
                        <div className={styles.fetchSwatches} aria-label="ANSI palette preview">
                          {COLOR_KEYS.map((key) => (
                            <span
                              key={key}
                              className={styles.fetchSwatch}
                              style={{ backgroundColor: previewTheme.colors[key] }}
                              title={`${key}: ${previewTheme.colors[key]}`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <p className={styles.promptLine}>
                    <span className={styles.promptUser}>xscriptor</span>
                    <span className={styles.promptAt}>@</span>
                    <span className={styles.promptHost}>x</span>{" "}
                    <span className={styles.promptPath}>~</span>{" "}
                    <span className={styles.promptSigil}>$</span>{" "}
                    <span className={styles.promptCommand}>xfetch</span>{" "}
                    <span className={styles.tokenDim}>--scheme</span>{" "}
                    <span className={styles.tokenString}>&quot;{previewTheme.name}&quot;</span>{" "}
                    <span className={styles.tokenDim}>--style</span>{" "}
                    <span className={styles.tokenString}>&quot;compact&quot;</span>
                  </p>

                  <p className={styles.promptLine}>
                    <span className={styles.promptUser}>xscriptor</span>
                    <span className={styles.promptAt}>@</span>
                    <span className={styles.promptHost}>x</span>{" "}
                    <span className={styles.promptPath}>~</span>{" "}
                    <span className={styles.promptSigil}>$</span>{" "}
                    <span className={styles.promptCommand}>cat</span>{" "}
                    <span className={styles.inlinePath}>
                      ~/.config/xfetch/schemes/{previewTheme.name.toLowerCase()}.json
                    </span>{" "}
                    <span className={styles.tokenDim}>|</span>{" "}
                    <span className={styles.promptCommand}>head</span>{" "}
                    <span className={styles.tokenDim}>-n</span>{" "}
                    <span className={styles.tokenNumber}>8</span>
                  </p>

                  <pre className={styles.inlineOutput} aria-label="Config preview">
                    <code>
                      <span className={styles.tokenPunct}>{"{"}</span>
                      {"\n"}
                      <span className={styles.tokenKey}>&quot;background&quot;</span>
                      <span className={styles.tokenPunct}>: </span>
                      <span className={styles.tokenString}>&quot;{previewTheme.colors.color0}&quot;</span>
                      <span className={styles.tokenPunct}>,</span>
                      {"\n"}
                      <span className={styles.tokenKey}>&quot;foreground&quot;</span>
                      <span className={styles.tokenPunct}>: </span>
                      <span className={styles.tokenString}>&quot;{previewTheme.colors.color15}&quot;</span>
                      <span className={styles.tokenPunct}>,</span>
                      {"\n"}
                      <span className={styles.tokenKey}>&quot;accent&quot;</span>
                      <span className={styles.tokenPunct}>: </span>
                      <span className={styles.tokenString}>&quot;{previewTheme.colors.color11}&quot;</span>
                      <span className={styles.tokenPunct}>,</span>
                      {"\n"}
                      <span className={styles.tokenKey}>&quot;cursor&quot;</span>
                      <span className={styles.tokenPunct}>: </span>
                      <span className={styles.tokenString}>&quot;{previewTheme.colors.color14}&quot;</span>
                      {"\n"}
                      <span className={styles.tokenPunct}>{"}"}</span>
                    </code>
                  </pre>

                  <p className={styles.promptLine}>
                    <span className={styles.promptUser}>xscriptor</span>
                    <span className={styles.promptAt}>@</span>
                    <span className={styles.promptHost}>x</span>{" "}
                    <span className={styles.promptPath}>~</span>{" "}
                    <span className={styles.promptSigil}>$</span>{" "}
                    <span className={styles.cursor} aria-hidden="true" />
                  </p>
                </div>
              </div>
            </div>
          ) : null}
        </section>
      ) : null}

      <section className={styles.install} aria-label="Quick install">
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>{t("quickInstall")}</h2>
          <p className={styles.sectionDescription}>
            {t("quickInstallDescription")}
          </p>
        </div>

        {universalInstaller ? (
          <div className={styles.commandCard}>
            <div className={styles.commandHeader}>
              <p className={styles.commandTitle}>{t("universalInstaller")}</p>
              <button
                type="button"
                className={styles.copyButton}
                onClick={() => copyToClipboard("universal", universalInstaller)}
              >
                {wasCopied("universal") ? t("copied") : t("copy")}
              </button>
            </div>
            <pre className={styles.codeBlock}>
              <code>{universalInstaller}</code>
            </pre>
          </div>
        ) : null}

        {activeTerminal ? (
          <div className={styles.commandCard}>
            <div className={styles.commandHeader}>
              <p className={styles.commandTitle}>{activeTerminal.name}</p>
              {activeTerminal.commands.length ? (
                <button
                  type="button"
                  className={styles.copyButton}
                  onClick={() =>
                    copyToClipboard(
                      `terminal:${activeTerminal.slug}`,
                      activeTerminal.commands.join("\n\n"),
                    )
                  }
                >
                  {wasCopied(`terminal:${activeTerminal.slug}`) ? t("copied") : t("copy")}
                </button>
              ) : null}
            </div>

            {activeTerminal.commands.length ? (
              <div className={styles.commandStack}>
                {activeTerminal.commands.map((command) => (
                  <pre key={command} className={styles.codeBlock}>
                    <code>{command}</code>
                  </pre>
                ))}
              </div>
            ) : (
              <p className={styles.commandNote}>
                {t("manualSteps")}
              </p>
            )}
          </div>
        ) : (
          <div className={styles.installHint}>
            <p className={styles.installHintTitle}>{t("terminalAll")}</p>
            <p className={styles.installHintText}>
              {t("chooseTerminal")}
            </p>
          </div>
        )}
      </section>

      <section className={styles.media} aria-label="Previews">
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>{t("previews")}</h2>
          <p className={styles.sectionDescription}>
            {t("previewsDescription")}
          </p>
        </div>
        <figure className={styles.mediaBlock}>
          <Image
            src={withBasePath("/images/terminal/terminal.gif")}
            alt="Xscriptor terminal themes in action"
            width={1000}
            height={708}
            className={styles.mediaImage}
          />
        </figure>
      </section>

      <section className={styles.prompts} aria-label="Prompts">
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>{t("prompts")}</h2>
          <p className={styles.sectionDescription}>
            {t("promptsDescription")}
          </p>
        </div>
        <figure className={styles.mediaBlock}>
          <Image
            src={withBasePath("/images/terminal/prompts.gif")}
            alt="Xscriptor terminal prompt styles"
            width={900}
            height={80}
            className={styles.mediaImage}
          />
        </figure>
        <div className={styles.toolChips}>
          {["Starship", "OhMyPosh", "Spaceship", "BashZsh"].map((key) => (
            <span key={key} className={styles.toolChip}>{t(`prompt${key}`)}</span>
          ))}
        </div>
      </section>

      <section className={styles.cli} aria-label="CLI">
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>{t("cli")}</h2>
          <p className={styles.sectionDescription}>
            {t("cliDescription")}
          </p>
        </div>
        <div className={styles.toolChips}>
          {["Helix", "ClaudeCode", "OpenCode", "GitNapse"].map((key) => (
            <span key={key} className={styles.toolChip}>{t(`cli${key}`)}</span>
          ))}
        </div>
      </section>

      <section className={styles.themes} aria-label="Themes">
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>{t("themes")}</h2>
          <p className={styles.sectionDescription}>
            {t("themesDescription")}
          </p>
        </div>

        <div className={styles.grid}>
          {filteredThemes.map((theme) => {
            const json = JSON.stringify(theme.colors, null, 2);
            return (
              <article key={theme.name} className={styles.themeCard}>
                <div className={styles.themeHeader}>
                  <h3 className={styles.themeTitle}>{theme.name}</h3>
                  <button
                    type="button"
                    className={styles.copyButton}
                    onClick={() => copyToClipboard(`theme:${theme.name}`, json)}
                  >
                    {wasCopied(`theme:${theme.name}`) ? t("copied") : t("copyJson")}
                  </button>
                </div>

                <div className={styles.swatches} aria-label={`${theme.name} palette`}>
                  {COLOR_KEYS.map((key) => (
                    <div
                      key={key}
                      className={styles.swatch}
                      style={{ backgroundColor: theme.colors[key] }}
                      title={`${key}: ${theme.colors[key]}`}
                    />
                  ))}
                </div>

                <pre className={styles.themeJson}>
                  <code>{json}</code>
                </pre>
              </article>
            );
          })}
        </div>
      </section>
    </div>
  );
}
