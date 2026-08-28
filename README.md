# Colors Web

Open-source resources from the **Xscriptor Colors** organization — themes, tools, and customizations for VS Code, JetBrains, Obsidian, terminal, and more.

Built with **Next.js (App Router) + static export** (`output: "export"`), designed to run on GitHub Pages or any static server. It ports the classic `/resources` view of [devxscriptor](https://github.com/xscriptor/xscriptor.pages) into a single-site experience for the organization. English only.

## Pages

| Route | Repo | Description |
| --- | --- | --- |
| `/` | — | Home |
| `/resources` | — | Resources index with all organization repos |
| `/resources/vscode` | [vscode](https://github.com/xscriptor-colors/vscode) | Interactive theme gallery with live Monaco editor |
| `/resources/jetbrains` | [jetbrains](https://github.com/xscriptor-colors/jetbrains) | JetBrains themes, install and scripts |
| `/resources/terminal` | [terminal](https://github.com/xscriptor-colors/terminal) | Terminal themes with per-emulator installers |
| `/resources/obsidian` | [obsidian](https://github.com/xscriptor-colors/obsidian) | Obsidian theme, features and style settings |
| `/resources/colors` | — | All color palettes in one place |

## Stack

- Next.js 16 with `output: "export"` (pure static HTML/JS/CSS)
- Tailwind CSS v4
- Framer Motion (single-shot animations only)
- Monaco Editor (vscode page only, loaded on demand)

## Development

```bash
npm install
npm run dev        # http://localhost:3000
```

## Static build

```bash
npm run build      # generates ./out
```

`next.config.ts` supports `NEXT_PUBLIC_BASE_PATH` for GitHub Pages project routes:

```bash
# Project site (https://xscriptor-colors.github.io/web/)
NEXT_PUBLIC_BASE_PATH=/web npm run build

# Custom domain or organization page
npm run build
```

## Deploy to GitHub Pages

`.github/workflows/deploy.yml` builds with `NEXT_PUBLIC_BASE_PATH=/web` and deploys to GitHub Pages on every push to `main`.

One-time setup:

1. Repo → Settings → Pages → Source: **GitHub Actions**
2. Push to `main` — the workflow builds and deploys automatically.

You can also serve `./out` with any static server (nginx, Apache, Vercel, etc.).

## Repository structure

```
src/app/
  page.tsx                      # Home
  resources/page.tsx            # Resources index (org repos)
  resources/vscode/page.tsx     # VS Code themes & icons (interactive Monaco)
  resources/jetbrains/page.tsx  # JetBrains themes
  resources/terminal/page.tsx   # Terminal themes (read from colors/colors.md)
  resources/obsidian/page.tsx   # Obsidian theme
  resources/colors/page.tsx     # Color palettes
  components/                   # ClassicControls, Xtexts, Footer, icons, etc.
data/resources/                 # Repo, theme and palette data
colors/colors.md                # Source data for terminal themes
```

## Roadmap

See [ROADMAP.md](./ROADMAP.md) for what's missing.
