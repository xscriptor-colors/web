import { readFile } from "node:fs/promises";
import path from "node:path";

import type {
  TerminalInstaller,
  TerminalResources,
  TerminalTheme,
} from "@/types/resources/terminal.types";

const COLORS_FILE_PATH = path.join(process.cwd(), "colors", "colors.md");
const EMULATORS_FILE_PATH = path.join(
  process.cwd(),
  "src",
  "app",
  "terminal",
  "emulators.md",
);
const XFETCH_LOGO_FILE_PATH = path.join(
  process.cwd(),
  "src",
  "app",
  "terminal",
  "xfetchlogologo.md",
);

function normalizeWhitespace(value: string) {
  return value.replace(/\r\n/g, "\n").trim();
}

function parseColorThemes(markdown: string): TerminalTheme[] {
  const normalized = normalizeWhitespace(markdown);
  const headings: { name: string; start: number; end: number }[] = [];
  const headingRegex = /<h2[^>]*>([^<]+)<\/h2>/g;

  let match: RegExpExecArray | null = null;
  while ((match = headingRegex.exec(normalized))) {
    headings.push({
      name: match[1].trim(),
      start: match.index,
      end: headingRegex.lastIndex,
    });
  }

  return headings
    .map((heading, index) => {
      const sliceStart = heading.end;
      const sliceEnd = headings[index + 1]?.start ?? normalized.length;
      const segment = normalized.slice(sliceStart, sliceEnd);
      const jsonBlock = /```json\s*([\s\S]*?)```/m.exec(segment);

      if (!jsonBlock) {
        return null;
      }

      const rawJson = jsonBlock[1].trim();
      try {
        const colors = JSON.parse(rawJson) as TerminalTheme["colors"];
        return { name: heading.name, colors };
      } catch {
        return null;
      }
    })
    .filter((theme): theme is TerminalTheme => theme !== null);
}

function parseInstallers(markdown: string): {
  universalInstaller?: string;
  terminals: TerminalInstaller[];
} {
  const normalized = normalizeWhitespace(markdown);

  const universalSectionIndex = normalized.indexOf("Universal Installer");
  let universalInstaller: string | undefined;
  if (universalSectionIndex !== -1) {
    const afterHeading = normalized.slice(universalSectionIndex);
    const universalMatch = /<pre><code>([\s\S]*?)<\/code><\/pre>/m.exec(afterHeading);
    if (universalMatch) {
      universalInstaller = normalizeWhitespace(universalMatch[1]);
    }
  }

  const terminals: TerminalInstaller[] = [];
  const liRegex = /<li>[\s\S]*?<\/li>/g;
  let liMatch: RegExpExecArray | null = null;

  while ((liMatch = liRegex.exec(normalized))) {
    const li = liMatch[0];
    const anchor = /<a href="\.\/([^"]+)">([^<]+)<\/a>/.exec(li);
    if (!anchor) {
      continue;
    }

    const href = anchor[1];
    const name = anchor[2].trim();
    const slug = href.split("/")[0].trim();

    const codeBlocks = Array.from(li.matchAll(/<pre><code>([\s\S]*?)<\/code><\/pre>/g)).map(
      (block) => normalizeWhitespace(block[1]),
    );

    const isWindowsOnly = /\(Windows\)/i.test(name);

    terminals.push({
      slug,
      name,
      commands: codeBlocks,
      isWindowsOnly: isWindowsOnly || undefined,
    });
  }

  const uniqueBySlug = new Map<string, TerminalInstaller>();
  for (const terminal of terminals) {
    const existing = uniqueBySlug.get(terminal.slug);
    if (!existing) {
      uniqueBySlug.set(terminal.slug, terminal);
      continue;
    }

    const combinedCommands = Array.from(new Set([...existing.commands, ...terminal.commands]));
    uniqueBySlug.set(terminal.slug, {
      ...existing,
      commands: combinedCommands,
      isWindowsOnly: existing.isWindowsOnly || terminal.isWindowsOnly,
    });
  }

  return {
    universalInstaller,
    terminals: Array.from(uniqueBySlug.values()),
  };
}

export async function getTerminalResources(): Promise<TerminalResources> {
  try {
    const [colorsMd, emulatorsMd, xfetchLogoRaw] = await Promise.all([
      readFile(COLORS_FILE_PATH, "utf8"),
      readFile(EMULATORS_FILE_PATH, "utf8"),
      readFile(XFETCH_LOGO_FILE_PATH, "utf8"),
    ]);

    const themes = parseColorThemes(colorsMd);
    const { universalInstaller, terminals } = parseInstallers(emulatorsMd);
    const xfetchLogo = normalizeWhitespace(xfetchLogoRaw);

    return {
      themes,
      terminals,
      universalInstaller,
      xfetchLogo,
    };
  } catch {
    return {
      themes: [],
      terminals: [],
      universalInstaller: undefined,
      xfetchLogo: undefined,
    };
  }
}
