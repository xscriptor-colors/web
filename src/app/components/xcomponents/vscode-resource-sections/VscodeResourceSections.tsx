"use client";

import Image from "next/image";
import Link from "next/link";
import { useT } from "@/app/i18n-provider";
import Footer from "@/app/components/footer/footer";
import { VscodeThemeGallery } from "../vscode-theme-gallery";
import { withBasePath } from "@/lib/base-path";
import styles from "./VscodeResourceSections.module.css";

const REEL = [
  { src: "/images/vscode/preview1.gif", alt: "Xscriptor VSCode themes preview 1", wide: false },
  { src: "/images/vscode/preview2.gif", alt: "Xscriptor VSCode themes preview 2", wide: false },
  { src: "/images/vscode/preview3.gif", alt: "Xscriptor VSCode themes preview 3", wide: true },
];

export default function VscodeResourceSections() {
  const t = useT("VscodeThemeGallery");

  return (
    <div className={styles.stack}>
      <section className={styles.stageSurface}>
        <VscodeThemeGallery />
      </section>

      <section className={styles.reelGrid} aria-label="Preview reel">
        {REEL.map((slide) => (
          <figure
            key={slide.src}
            className={`${styles.reelBlock} ${slide.wide ? styles.reelWide : ""}`}
          >
            <Image
              src={withBasePath(slide.src)}
              alt={slide.alt}
              width={720}
              height={405}
              className={styles.reelImage}
            />
          </figure>
        ))}
      </section>

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
          <Link className={styles.secondaryButton} href="/">
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
