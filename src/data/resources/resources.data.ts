import { JetBrainsIcon, ObsidianIcon, TerminalIcon, VscodeIcon, WebLabIcon, ColorsIcon, FreshIcon, HyprlandIcon, MacosIcon, WindowsIcon, IdeIcon, NvimIcon, XwwIcon } from "@/app/components/xcomponents/icons";

import type { ResourceRepo } from "../../types/resources/resources.types";

export const resourceRepos: ResourceRepo[] = [
  {
    name: "vscode",
    description:
      "A complete collection of Xscriptor customizations for VSCode & Forks, including themes, code snippets, and UI mods.",
    href: "/vscode",
    icon: VscodeIcon,
    iconProps: {
      color: "var(--primary)",
      size: 25,
    },
  },
  {
    name: "jetbrains",
    description:
      "Essential settings and customizations to improve accessibility and personalization of JetBrains IDEs using the Xscriptor ecosystem (themes, snippets...).",
    href: "/jetbrains",
    icon: JetBrainsIcon,
    iconProps: {
      color: "var(--primary)",
      size: 25,
    },
  },
  {
    name: "terminal",
    description:
      "Twelve themes, one vision. The full palette of my perspective, adapted for most terminals. —X.",
    href: "/terminal",
    icon: TerminalIcon,
    iconProps: {
      color: "var(--primary)",
      size: 25,
    },
  },
  {
    name: "obsidian",
    description:
      "An elegant Obsidian theme for coders and writers with beautiful EB Garamond typography and flexible customization.",
    href: "/obsidian",
    icon: ObsidianIcon,
    iconProps: {
      color: "var(--primary)",
      size: 25,
    },
  },
  {
    name: "colors",
    description:
      "All Xscriptor color palettes in one place — themes for terminals, editors, and IDEs.",
    href: "/colors",
    icon: ColorsIcon,
    iconProps: {
      color: "var(--primary)",
      size: 25,
    },
  },
  {
    name: "web",
    description:
      "The Xscriptor Colors organization website, built as a static site for GitHub Pages.",
    href: "https://github.com/xscriptor-colors/web",
    icon: WebLabIcon,
    iconProps: {
      color: "var(--primary)",
      size: 25,
    },
  },
  {
    name: "ide",
    description:
      "Monorepo for editor and IDE X themes/schemes.",
    href: "https://github.com/xscriptor-colors/ide",
    icon: IdeIcon,
    iconProps: {
      color: "var(--primary)",
      size: 25,
    },
  },
  {
    name: "nvim",
    description:
      "Nvim X setting",
    href: "/nvim",
    icon: NvimIcon,
    iconProps: {
      color: "var(--primary)",
      size: 25,
    },
  },
  {
    name: "macos",
    description:
      "Custom macOS desktop configurations, themes, and dotfiles featuring AeroSpace and Sketchybar.",
    href: "/macos",
    icon: MacosIcon,
    iconProps: {
      color: "var(--primary)",
      size: 25,
    },
  },
  {
    name: "windows",
    description:
      "Desktop customisation: Linux • MacOs • Windows.",
    href: "/windows",
    icon: WindowsIcon,
    iconProps: {
      color: "var(--primary)",
      size: 25,
    },
  },
  {
    name: "hyprland",
    description:
      "A clean, performance-oriented Hyprland configuration featuring a [X] aesthetic, optimized for productivity and seamless workflow on X and Arch Linux",
    href: "/hyprland",
    icon: HyprlandIcon,
    iconProps: {
      color: "var(--primary)",
      size: 25,
    },
  },
  {
    name: "fresh",
    description:
      "A collection of custom color themes for Fresh, the terminal text editor",
    href: "/fresh",
    icon: FreshIcon,
    iconProps: {
      color: "var(--primary)",
      size: 25,
    },
  },
  {
    name: "xww",
    description:
      "Web application to create X fresh wallpapers",
    href: "https://github.com/xscriptor-colors/xww",
    icon: XwwIcon,
    iconProps: {
      color: "var(--primary)",
      size: 25,
    },
  },
];
