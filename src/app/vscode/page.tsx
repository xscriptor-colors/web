"use client";
import { useT } from "@/app/i18n-provider";
import { usePageMeta } from "@/app/hooks/usePageMeta";
import { XTitle } from "@/app/components/Xtexts";
import { VscodeResourceSections } from "@/app/components/xcomponents/vscode-resource-sections";
import { LightLines } from "@/app/components/xcomponents/LightLines";
import styles from "./vscode.module.css";

export default function VscodePage() {
  const t = useT("VscodePage");
  usePageMeta(t("title"));

  return (
    <section className={styles.page}>
      <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 0 }}>
        <LightLines lineCount={16} />
      </div>
      <div className="relative z-10">
        <header className={`${styles.header} text-center`}>
          <XTitle em={t("titleEm")}>{t("title")}</XTitle>
          <p className={styles.description}>
            {t("description")}
          </p>
        </header>
        <VscodeResourceSections />
      </div>
    </section>
  );
}
