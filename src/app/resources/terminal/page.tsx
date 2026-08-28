import type { Metadata } from "next";
import { XTitle } from "@/app/components/Xtexts";
import { TerminalResourceSections } from "@/app/components/xcomponents/terminal-resource-sections";
import { getTerminalResources } from "@/data/resources/terminal/terminalResources.data";
import Footer from "@/app/components/footer/footer";
import enMessages from "../../../../messages/en.json";

import styles from "./terminal.module.css";

function getMsg(messages: Record<string, unknown>, key: string): string {
  return key.split(".").reduce<unknown>((obj, k) => {
    if (obj && typeof obj === "object" && k in obj) {
      return (obj as Record<string, unknown>)[k];
    }
    return key;
  }, messages) as string;
}

export const metadata: Metadata = {
  title: "Terminal",
  description: "Xscriptor terminal themes",
};

export default async function TerminalPage() {
  const msgs = enMessages;
  const resources = await getTerminalResources();

  return (
    <section className={styles.page}>
      <header className={`${styles.header} text-center`}>
        <XTitle em={getMsg(msgs, "TerminalPage.titleEm")}>{getMsg(msgs, "TerminalPage.title")}</XTitle>
        <p className={styles.description}>
          {getMsg(msgs, "TerminalPage.description")}
        </p>
      </header>

      <TerminalResourceSections
        themes={resources.themes}
        terminals={resources.terminals}
        universalInstaller={resources.universalInstaller}
        xfetchLogo={resources.xfetchLogo}
      />

      <Footer />
    </section>
  );
}
