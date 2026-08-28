"use client";

import Link from "next/link";
import { useT } from "@/app/i18n-provider";
import Footer from "@/app/components/footer/footer";
import { VscodeThemeGallery } from "../vscode-theme-gallery";
import VscodeIntroMedia from "../vscode-theme-gallery/VscodeIntroMedia";
import styles from "./VscodeResourceSections.module.css";

export default function VscodeResourceSections() {
  const t = useT("VscodeThemeGallery");

  return (
    <div className={styles.stack}>
      <section className={styles.stageSurface}>
        <VscodeThemeGallery />
      </section>

      <VscodeIntroMedia videoSrc="https://i.imgur.com/gNmRAgD.mp4" />

      <section className={styles.videoFooter}>
        <p className={styles.a11yNote}>{t("a11yNote")}</p>
        <div className={styles.footerActions}>
          <a
            className={styles.primaryButton}
            href="https://github.com/xscriptor-colors/vscode/tree/main/themes/xscriptor-themes"
            target="_blank"
            rel="noopener noreferrer"
          >
            {t("viewSourceCode")}
          </a>
          <a
            className={styles.secondaryButton}
            href="https://github.com/xscriptor-colors/vscode/tree/main/themes/xscriptor-themes/icons"
            target="_blank"
            rel="noopener noreferrer"
          >
            {t("productIcons")}
          </a>
          <Link className={styles.secondaryButton} href="/resources">
            {t("backToResources")}
          </Link>
        </div>
      </section>

      <div className={styles.pageFooter}>
        <Footer />
      </div>
    </div>
  );
}
