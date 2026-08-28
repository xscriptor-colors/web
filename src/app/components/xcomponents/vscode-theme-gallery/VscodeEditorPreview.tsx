"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { themes, themeList } from "@/data/resources/vscode/webVscodeThemes";

const MonacoEditor = dynamic(() => import("./MonacoEditor"), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-full bg-white/[0.02]">
      <div className="w-4 h-4 rounded-full border-2 border-white/10 border-t-current animate-spin" />
    </div>
  ),
});

interface FileEntry {
  name: string;
  language: string;
  code: string;
  icon: "ts" | "css" | "js" | "json" | "html" | "py" | "md";
}

const demoFiles: Record<string, FileEntry> = {
  "App.tsx": {
    name: "App.tsx",
    language: "typescript",
    icon: "ts",
    code: `import { defineTheme } from 'xscriptor'
import { glass } from '@xglass/core'

const theme = defineTheme({
  name: 'X',
  colors: {
    background: '#050505',
    foreground: '#e0e0e0',
    accent: '#fc618d',
    gold: '#fce566',
    green: '#7bd88f',
    orange: '#fd9353',
    purple: '#948ae3',
    cyan: '#5ad4e6',
  },
  syntax: {
    keyword: '#fc618d',
    string: '#fce566',
    function: '#7bd88f',
    comment: '#555555',
    number: '#fd9353',
    type: '#948ae3',
  },
})

glass.alpha = 180
glass.enable()

export default theme`,
  },
  "styles.css": {
    name: "styles.css",
    language: "css",
    icon: "css",
    code: `:root {
  --bg: #050505;
  --fg: #e0e0e0;
  --pink: #fc618d;
  --gold: #fce566;
  --green: #7bd88f;
  --orange: #fd9353;
  --purple: #948ae3;
  --cyan: #5ad4e6;
}

* { margin: 0; padding: 0; box-sizing: border-box; }

body {
  background: var(--bg);
  color: var(--fg);
  font-family: 'Geist', sans-serif;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.editor-panel {
  border: 1px solid rgba(255,255,255,0.06);
  border-radius: 12px;
  overflow: hidden;
}

.token.keyword { color: var(--pink); }
.token.string  { color: var(--gold); }
.token.fn      { color: var(--green); }
.token.number  { color: var(--orange); }
.token.type    { color: var(--purple); }
.token.comment { color: #555; font-style: italic; }`,
  },
  "main.py": {
    name: "main.py",
    language: "python",
    icon: "py",
    code: `from xglass import transparency
from xscriptor import ThemeManager

manager = ThemeManager()
manager.load_themes("./themes")

theme = manager.get_theme("X")
manager.apply(theme)

glass = transparency.EditorGlass(
    alpha=180,
    blur_radius=20,
    target_window="current",
)
glass.enable()

@glass.on_keybind("ctrl+alt+z")
def more_glass():
    glass.alpha -= 10
    print(f"Alpha: {glass.alpha}")

@glass.on_keybind("ctrl+alt+c")
def less_glass():
    glass.alpha += 10
    print(f"Alpha: {glass.alpha}")

if __name__ == "__main__":
    print("Xscriptor + XGlass ready")`,
  },
  "utils.ts": {
    name: "utils.ts",
    language: "typescript",
    icon: "ts",
    code: `interface ThemeConfig {
  name: string
  colors: Record<string, string>
  syntax: {
    keyword: string
    string: string
    function: string
    comment: string
  }
}

type ThemeType = 'dark' | 'light'

function createTheme(config: ThemeConfig): ThemeConfig {
  const { name, colors, syntax } = config
  return {
    name,
    colors: { ...colors },
    syntax: { ...syntax },
  }
}

function isValidHex(color: string): boolean {
  return /^#[0-9A-Fa-f]{6}$/.test(color)
}

function hexToRgb(hex: string) {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return { r, g, b }
}

export { createTheme, isValidHex, hexToRgb }
export type { ThemeConfig, ThemeType }`,
  },
  "theme.json": {
    name: "theme.json",
    language: "json",
    icon: "json",
    code: `{
  "name": "xscriptor-themes",
  "version": "1.1.4",
  "themes": [
    {
      "label": "X",
      "uiTheme": "vs-dark",
      "path": "./themes/x.json"
    },
    {
      "label": "Madrid",
      "uiTheme": "vs",
      "path": "./themes/madrid.json"
    },
    {
      "label": "Tokio",
      "uiTheme": "vs-dark",
      "path": "./themes/tokio.json"
    },
    {
      "label": "Miami",
      "uiTheme": "vs-dark",
      "path": "./themes/miami.json"
    }
  ],
  "iconThemes": [
    { "id": "x-icons", "label": "X", "path": "./icons/x.json" },
    { "id": "madrid-icons", "label": "Madrid", "path": "./icons/madrid.json" },
    { "id": "oslo-icons", "label": "Oslo", "path": "./icons/oslo.json" }
  ],
  "activationEvents": [],
  "categories": ["Themes", "Other"]
}`,
  },
  "index.html": {
    name: "index.html",
    language: "html",
    icon: "html",
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Xscriptor Preview</title>
  <link rel="stylesheet" href="styles.css" />
</head>
<body>
  <div class="container">
    <header class="editor-panel">
      <h1>Xscriptor Themes</h1>
      <p>12 color themes for VS Code</p>
      <nav>
        <a href="./">Home</a>
        <a href="#">XGlass</a>
        <a href="#">Dark Colors</a>
      </nav>
    </header>
    <section class="theme-gallery">
      <div class="theme-card" data-theme="X">
        <span class="accent" style="color: #fc618d">●</span>
        <h3>X — Flagship Dark</h3>
        <code>#050505 · #fc618d</code>
      </div>
      <div class="theme-card" data-theme="Miami">
        <span class="accent" style="color: #FF4C8B">●</span>
        <h3>Miami — Neon</h3>
        <code>#000000 · #FF4C8B</code>
      </div>
    </section>
  </div>
</body>
</html>`,
  },
  "app.js": {
    name: "app.js",
    language: "javascript",
    icon: "js",
    code: `const express = require('express')
const { ThemeManager } = require('@xscriptor/core')

const app = express()
const manager = new ThemeManager()

app.get('/api/themes', (req, res) => {
  const themes = manager.listThemes()
  res.json({
    total: themes.length,
    themes: themes.map(t => ({
      id: t.id,
      name: t.label,
      type: t.uiTheme,
      accent: t.colors.accent,
    })),
  })
})

app.get('/api/themes/:id', (req, res) => {
  const theme = manager.getTheme(req.params.id)
  if (!theme) {
    return res.status(404).json({ error: 'Theme not found' })
  }
  res.json(theme)
})

app.post('/api/themes/preview', (req, res) => {
  const { themeId } = req.body
  manager.preview(themeId)
  res.json({ status: 'previewing', theme: themeId })
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(\`Server running on port \${PORT}\`)
})`,
  },
  "README.md": {
    name: "README.md",
    language: "markdown",
    icon: "md",
    code: `# Xscriptor Themes

A collection of hand-crafted color themes, palette-matched
icon themes, and a custom product icon set for VS Code.

## Quick Start

1. Open VS Code
2. Go to Extensions (Ctrl+Shift+X)
3. Search for "Xscriptor Themes"
4. Install and select "X" from the theme picker

## Themes Included

| Theme   | Type  | Accent     | Description         |
|---------|-------|------------|----------------------|
| X       | dark  | #fc618d    | Flagship dark theme |
| Miami   | dark  | #FF4C8B    | Neon vaporwave      |
| Oslo    | dark  | #76cce0    | Slate-based nordic  |
| Madrid  | light | #990026    | Clean light theme   |

## Icon Themes

13 icon themes with 44+ language-specific file icons,
294 folder name associations, and custom terminal icons.

## Compatibility

VS Code, VSCodium, Cursor, Windsurf, Positron`,
  },
};

interface VscodeEditorPreviewProps {
  theme?: string;
  vscodeDevUrl?: string;
  title?: string;
  onThemeChange?: (slug: string) => void;
}

const activityBarItems = [
  { id: "files", icon: "files" },
  { id: "search", icon: "search" },
  { id: "git", icon: "git" },
  { id: "debug", icon: "debug" },
  { id: "extensions", icon: "extensions" },
];

const defaultLayout = ["App.tsx", "styles.css", "main.py"];

export default function VscodeEditorPreview({
  theme = "x",
  vscodeDevUrl = "https://vscode.dev/theme/xscriptor.xscriptor-themes/X",
  title = "Preview",
  onThemeChange,
}: VscodeEditorPreviewProps) {
  const [activeTheme, setActiveTheme] = useState(theme);
  const [panelFiles, setPanelFiles] = useState(defaultLayout);
  const [explorerOpen, setExplorerOpen] = useState(true);
  const [showFileList, setShowFileList] = useState(true);
  const themeScrollRef = useRef<HTMLDivElement>(null);

  const config = themes[activeTheme]?.chrome || themes.x.chrome;
  const panelCount = panelFiles.length;

  const handleThemeClick = (id: string) => {
    setActiveTheme(id);
    if (onThemeChange) onThemeChange(id);
  };

  const handleFileClick = (fileName: string) => {
    setPanelFiles((prev) => {
      if (prev.includes(fileName)) return prev;
      return [fileName, ...prev].slice(0, 3);
    });
  };

  const handleClosePanel = (index: number) => {
    setPanelFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const fileEntries = Object.keys(demoFiles).map((k) => demoFiles[k]);

  return (
    <div className="flex flex-col gap-3 min-w-0">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 text-xs font-mono min-w-0" style={{ color: config.textDim }}>
          <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: config.accent }} />
          <span className="truncate">{title}</span>
        </div>
        <a
          href={`https://vscode.dev/theme/xscriptor.xscriptor-themes/${themes[activeTheme]?.label || 'X'}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-2 sm:px-3 py-1.5 rounded-lg transition-colors text-[10px] sm:text-xs font-medium whitespace-nowrap shrink-0"
          style={{
            backgroundColor: `${config.accent}18`,
            border: `1px solid ${config.accent}40`,
            color: config.accent,
          }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = `${config.accent}28`}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = `${config.accent}18`}
        >
          <svg width="11" height="11" className="sm:w-[13px] sm:h-[13px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M7 17L17 7" /><path d="M7 7h10v10" />
          </svg>
          <span className="hidden sm:inline">Open real VS Code</span>
          <span className="sm:hidden">Open</span>
        </a>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full overflow-hidden rounded-xl border"
        style={{
          backgroundColor: config.bg,
          borderColor: config.border,
          boxShadow: `0 20px 60px rgba(0,0,0,0.5), 0 0 0 1px ${config.border}`,
        }}
      >
        {/* Title bar */}
        <div
          className="flex items-center justify-between px-3 sm:px-4 py-2 text-xs border-b select-none"
          style={{ backgroundColor: config.bg, borderColor: config.border }}
        >
          <div className="flex items-center gap-1 sm:gap-2 text-white/40 min-w-0">
            <div className="flex gap-1 sm:gap-1.5 shrink-0">
              <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-red-500/60" />
              <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-yellow-500/60" />
              <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-green-500/60" />
            </div>
            <span className="ml-1 sm:ml-2 text-[10px] sm:text-[11px] truncate">xscriptor — {themes[activeTheme]?.label || "X"}</span>
          </div>
          <div className="hidden sm:flex gap-1.5 text-white/30 text-[10px] shrink-0">
            <span className="px-2 py-0.5 rounded bg-white/[0.04]">Extensions</span>
            <span className="px-2 py-0.5 rounded bg-white/[0.04]">Terminal</span>
          </div>
        </div>

        {/* Theme selector strip */}
        <div
          className="flex items-center gap-1 px-3 py-2 border-b overflow-x-auto"
          style={{ backgroundColor: config.sidebar, borderColor: config.border }}
          ref={themeScrollRef}
        >
          {themeList.map((t) => {
            const isActive = t.id === activeTheme;
            return (
              <button
                key={t.id}
                onClick={() => handleThemeClick(t.id)}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[11px] whitespace-nowrap transition-all shrink-0"
                style={{
                  backgroundColor: isActive ? `${t.chrome.accent}18` : "transparent",
                  color: isActive ? t.chrome.accent : "rgba(255,255,255,0.4)",
                  border: isActive ? `1px solid ${t.chrome.accent}40` : "1px solid transparent",
                }}
              >
                <span
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: t.chrome.accent }}
                />
                <span className="font-medium">{t.label}</span>
                {isActive && <span className="text-[9px] opacity-60">✓</span>}
              </button>
            );
          })}
        </div>

        <div className="flex vscode-editor-body min-w-0" style={{ minHeight: "520px", height: "60vh", maxHeight: "700px" }}>
          {/* Activity bar */}
          <div
            className="w-9 sm:w-10 flex flex-col items-center py-2 gap-2 shrink-0 border-r vscode-editor-activity"
            style={{ backgroundColor: config.activity, borderColor: config.border }}
          >
            {activityBarItems.map((item, i) => (
              <div
                key={item.id}
                className="w-8 h-8 rounded-lg flex items-center justify-center transition-all cursor-pointer hover:bg-white/[0.06]"
                style={i === 0 ? { color: config.accent } : { color: config.textDim }}
              >
                <ActivityIcon name={item.icon} />
              </div>
            ))}
          </div>

          {/* Explorer sidebar */}
          {explorerOpen && (
            <div
              className="w-44 xl:w-52 shrink-0 border-r flex flex-col text-xs overflow-hidden vscode-editor-sidebar"
              style={{ backgroundColor: config.sidebar, borderColor: config.border }}
            >
              <div
                className="flex items-center justify-between px-3 py-2 cursor-pointer select-none text-[11px] uppercase tracking-wider"
                style={{ color: config.textDim }}
                onClick={() => setShowFileList(!showFileList)}
              >
                <div className="flex items-center gap-1">
                  {showFileList ? (
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="6 9 12 15 18 9" /></svg>
                  ) : (
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="9 18 15 12 9 6" /></svg>
                  )}
                  Explorer
                </div>
                <button
                  onClick={(e) => { e.stopPropagation(); setExplorerOpen(false); }}
                  className="text-white/20 hover:text-white/60"
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>
              {showFileList && (
                <div className="flex-1 overflow-y-auto px-1.5 pb-3">
                  {fileEntries.map((file) => (
                    <div
                      key={file.name}
                      onClick={() => handleFileClick(file.name)}
                      className="flex items-center gap-1.5 py-1 px-2 rounded cursor-pointer transition-colors hover:bg-white/[0.04]"
                      style={{
                        color: panelFiles.includes(file.name) ? config.accent : config.textDim,
                      }}
                    >
                      <FileIcon type={file.icon} />
                      <span className="truncate text-xs">{file.name}</span>
                      <span className="ml-auto text-[9px] text-white/20">{file.language}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Editor panels */}
          <div
            className="flex-1 flex flex-col min-w-0"
            style={{ backgroundColor: config.bg }}
          >
            {/* Tabs */}
            <div
              className="flex items-center text-xs border-b overflow-x-auto"
              style={{ backgroundColor: config.tabBg, borderColor: config.border }}
            >
              {panelFiles.map((fileName, i) => {
                const file = demoFiles[fileName];
                if (!file) return null;
                return (
                  <div
                    key={fileName}
                    className="flex items-center gap-1.5 px-3 py-1.5 border-r whitespace-nowrap group"
                    style={{
                      backgroundColor: i === 0 ? config.tabActive : "transparent",
                      borderColor: config.border,
                      color: i === 0 ? config.text : config.textDim,
                    }}
                  >
                    <FileIcon type={file.icon} size={12} />
                    <span className="text-xs">{file.name}</span>
                    {panelFiles.length > 1 && (
                      <button
                        onClick={() => handleClosePanel(i)}
                        className="ml-1 opacity-0 group-hover:opacity-100 hover:text-white transition-opacity"
                      >
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                      </button>
                    )}
                  </div>
                );
              })}
              {panelFiles.length < 3 && (
                <div className="px-2 opacity-30 cursor-pointer hover:opacity-60 transition-opacity">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
                  </svg>
                </div>
              )}
            </div>

            {/* Editor grid */}
            <div
              className="flex-1 grid overflow-hidden vscode-editor-grid"
              style={{
                gridTemplateColumns: panelCount >= 2 ? "1fr 1fr" : "1fr",
                gridTemplateRows: panelCount >= 3 ? "1fr 1fr" : "1fr",
              }}
            >
              {panelFiles.map((fileName, i) => {
                const file = demoFiles[fileName];
                if (!file) return null;
                return (
                  <div
                    key={`${fileName}-${i}`}
                    className="relative overflow-hidden"
                    style={{
                      borderRight: i === 0 && panelCount >= 2 ? `1px solid ${config.border}` : "none",
                      borderBottom: i === 2 ? "none" : panelCount === 3 && i < 2 ? `1px solid ${config.border}` : "none",
                    }}
                  >
                    <MonacoEditor
                      themeId={activeTheme}
                      code={file.code}
                      language={file.language}
                      editorId={`editor-${i}`}
                    />
                  </div>
                );
              })}

              {panelFiles.length === 0 && (
                <div className="flex items-center justify-center text-xs text-white/20">
                  Click a file in the Explorer to open it
                </div>
              )}
            </div>

            {/* Status bar */}
            <div
              className="flex items-center justify-between px-4 py-1 text-[11px] border-t"
              style={{ backgroundColor: config.statusBg, borderColor: config.border, color: config.textDim }}
            >
              <div className="flex items-center gap-4">
                <span style={{ color: config.accent }}>main</span>
                <span>{themes[activeTheme]?.label || "X"}</span>
                <span>UTF-8</span>
              </div>
              <div className="flex items-center gap-3">
                <span>Spaces: 2</span>
                <button
                  onClick={() => setExplorerOpen(!explorerOpen)}
                  className="hover:text-white/80 transition-colors"
                >
                  {explorerOpen ? "Hide Explorer" : "Show Explorer"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function ActivityIcon({ name }: { name: string }) {
  const size = 16;
  switch (name) {
    case "files":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="3" y="3" width="18" height="18" rx="2" /><line x1="9" y1="3" x2="9" y2="21" /><line x1="3" y1="9" x2="21" y2="9" />
        </svg>
      );
    case "search":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="11" cy="11" r="7" /><line x1="16.5" y1="16.5" x2="21" y2="21" />
        </svg>
      );
    case "git":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="12" cy="18" r="3" /><circle cx="6" cy="6" r="3" /><circle cx="18" cy="6" r="3" /><line x1="8.5" y1="7.5" x2="15.5" y2="16.5" />
        </svg>
      );
    case "debug":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M8 7l-2 2v6l2 2" /><path d="M16 7l2 2v6l-2 2" /><line x1="12" y1="3" x2="12" y2="7" /><line x1="12" y1="17" x2="12" y2="21" />
        </svg>
      );
    case "extensions":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="4" y="4" width="16" height="16" rx="2" /><line x1="4" y1="9" x2="20" y2="9" /><line x1="4" y1="15" x2="20" y2="15" /><line x1="9" y1="4" x2="9" y2="20" />
        </svg>
      );
    default:
      return null;
  }
}

function FileIcon({ type, size = 13 }: { type: string; size?: number }) {
  const colors: Record<string, string> = {
    ts: "#3178C6", css: "#264de4", js: "#f7df1e", json: "#5a5a5a", html: "#e44d26", py: "#3776AB", md: "#888",
  };
  const labels: Record<string, string> = {
    ts: "TS", css: "CSS", js: "JS", json: "{}", html: "HT", py: "PY", md: "MD",
  };
  return (
    <div
      className="w-[18px] h-[14px] rounded flex items-center justify-center text-[7px] font-bold shrink-0"
      style={{ backgroundColor: colors[type] || "#888", color: type === "js" ? "#000" : "#fff" }}
    >
      {labels[type] || "FI"}
    </div>
  );
}
