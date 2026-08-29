"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useT } from "@/app/i18n-provider";
import { usePageMeta } from "@/app/hooks/usePageMeta";
import { withBasePath } from "@/lib/base-path";
import { XTitle } from "@/app/components/Xtexts";
import Footer from "@/app/components/footer/footer";

import styles from "./windows.module.css";

const GALLERY = [
  { src: "/images/windows/preview1.webp", alt: "Windows Xscriptor desktop preview 1", width: 1200, height: 677 },
  { src: "/images/windows/preview2.webp", alt: "Windows Xscriptor desktop preview 2", width: 1200, height: 676 },
  { src: "/images/windows/preview3.webp", alt: "Windows Xscriptor desktop preview 3", width: 1200, height: 673 },
  { src: "/images/windows/preview4.webp", alt: "Windows Xscriptor desktop preview 4", width: 1200, height: 676 },
];

const THEMES = [
  { name: "X", dark: true },
  { name: "Lahabana", dark: true },
  { name: "Miami", dark: true },
  { name: "Paris", dark: true },
  { name: "Tokio", dark: true },
  { name: "Oslo", dark: true },
  { name: "Berlin", dark: true },
  { name: "Praha", dark: true },
  { name: "Bogota", dark: true },
  { name: "Madrid", dark: false },
  { name: "Helsinki", dark: false },
  { name: "London", dark: false },
];

const STRUCTURE = [
  { key: "Yasb" },
  { key: "Zebar" },
  { key: "Windhawk" },
];

const COMPAT = ["compat1", "compat2"];

export default function WindowsPage() {
  const t = useT("WindowsPage");
  usePageMeta(t("title") + " " + t("titleEm"));

  const [activeIdx, setActiveIdx] = useState(0);
  const [seen, setSeen] = useState<Set<number>>(new Set([0]));

  useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>("[data-stage]");
    if (sections.length === 0) return;

    const update = () => {
      let pastCount = 0;
      const nextSeen = new Set(seen);
      sections.forEach((el, idx) => {
        const rect = el.getBoundingClientRect();
        if (rect.bottom <= 0) pastCount = idx + 1;
        if (rect.top < window.innerHeight - 60) nextSeen.add(idx);
      });
      setActiveIdx(pastCount);
      if (nextSeen.size !== seen.size) setSeen(nextSeen);
    };

    update();

    const observer = new IntersectionObserver(update, { threshold: [0] });
    sections.forEach((el) => observer.observe(el));

    window.addEventListener("scroll", update, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", update);
    };
  }, [seen]);

  const dim = (idx: number) => idx < activeIdx;
  const visible = (idx: number) => seen.has(idx);

  return (
    <section className={styles.page}>
      <div className={styles.stack}>
        <section
          data-stage={0}
          className={styles.stageSurface}
          data-dimmed={dim(0)}
          data-visible={visible(0)}
        >
          <header className={`${styles.header} text-center`}>
            <XTitle em={t("titleEm")}>{t("title")}</XTitle>
            <p className={styles.description}>
              {t("description")}
            </p>
          </header>
        </section>

        <section
          data-stage={1}
          className={styles.stageSurface}
          data-dimmed={dim(1)}
          data-visible={visible(1)}
        >
          <div className={styles.section}>
            <XTitle as="h2" variant="subsection" className={styles.sectionTitle}>{t("galleryTitle")}</XTitle>
            <div className={styles.galleryGrid}>
              {GALLERY.map((slide, i) => (
                <figure
                  key={slide.src}
                  className={`${styles.imageBlock} ${i < 2 ? styles.galleryWide : ""}`}
                >
                  <Image
                    src={withBasePath(slide.src)}
                    alt={slide.alt}
                    width={slide.width}
                    height={slide.height}
                    className={styles.imageBlockContent}
                  />
                </figure>
              ))}
            </div>
          </div>
        </section>

        <section
          data-stage={2}
          className={styles.stageSurface}
          data-dimmed={dim(2)}
          data-visible={visible(2)}
        >
          <div className={styles.section}>
            <XTitle as="h2" variant="subsection" className={styles.sectionTitle}>{t("structureTitle")}</XTitle>
            <p className={styles.configDescription}>{t("structureDesc")}</p>
            <div className={styles.structureStack}>
              {STRUCTURE.map((block) => (
                <div key={block.key} className={styles.structureBlock}>
                  <XTitle as="h3" variant="label" className={styles.structureLabel}>
                    {t(`struct${block.key}Title`)}
                  </XTitle>
                  <p className={styles.structureText}>{t(`struct${block.key}Desc`)}</p>
                </div>
              ))}
            </div>
          </div>
          <div className={styles.section}>
            <XTitle as="h2" variant="subsection" className={styles.sectionTitle}>{t("themesTitle")}</XTitle>
            <p className={styles.configDescription}>{t("themesDesc")}</p>
            <div className={styles.themesGrid}>
              {THEMES.map((theme) => (
                <div key={theme.name} className={styles.themeChip}>
                  <span className={styles.themeChipBadge} data-dark={theme.dark}>
                    {theme.dark ? t("dark") : t("light")}
                  </span>
                  <span className={styles.themeChipName}>{theme.name}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section
          data-stage={3}
          className={styles.stageSurface}
          data-dimmed={dim(3)}
          data-visible={visible(3)}
        >
          <div className={styles.section}>
            <XTitle as="h2" variant="subsection" className={styles.sectionTitle}>{t("installTitle")}</XTitle>
            <div className={styles.installStack}>
              <div className={styles.installBlock}>
                <XTitle as="h3" variant="label" className={styles.installLabel}>{t("installRemote")}</XTitle>
                <pre className={styles.codeBlock}>
                  <code>{t("installRemoteCmdYasb")}</code>
                </pre>
                <pre className={styles.codeBlock}>
                  <code>{t("installRemoteCmdZebar")}</code>
                </pre>
              </div>
              <div className={styles.installBlock}>
                <XTitle as="h3" variant="label" className={styles.installLabel}>{t("installClone")}</XTitle>
                <pre className={styles.codeBlock}>
                  <code>{t("installCloneCmdYasb")}</code>
                </pre>
                <pre className={styles.codeBlock}>
                  <code>{t("installCloneCmdZebar")}</code>
                </pre>
              </div>
              <p className={styles.installText}>{t("installNote")}</p>
            </div>
          </div>
        </section>

        <section
          data-stage={4}
          className={styles.stageSurface}
          data-dimmed={dim(4)}
          data-visible={visible(4)}
        >
          <div className={styles.section}>
            <XTitle as="h2" variant="subsection" className={styles.sectionTitle}>{t("usageTitle")}</XTitle>
            <div className={styles.installStack}>
              <div className={styles.installBlock}>
                <XTitle as="h3" variant="label" className={styles.installLabel}>{t("usageZebarTitle")}</XTitle>
                <p className={styles.installText}>{t("usageZebarDesc")}</p>
              </div>
              <div className={styles.installBlock}>
                <XTitle as="h3" variant="label" className={styles.installLabel}>{t("usageYasbTitle")}</XTitle>
                <p className={styles.installText}>{t("usageYasbDesc")}</p>
              </div>
            </div>
          </div>
          <div className={styles.section}>
            <XTitle as="h2" variant="subsection" className={styles.sectionTitle}>{t("compatTitle")}</XTitle>
            <ul className={styles.featuresList}>
              {COMPAT.map((key) => (
                <li key={key} className={styles.featureItem}>
                  {t(key)}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section
          data-stage={5}
          className={styles.stageSurface}
          data-dimmed={dim(5)}
          data-visible={visible(5)}
        >
          <div className={styles.viewSourceWrap}>
            <a
              className={styles.button}
              href="https://github.com/xscriptor-colors/windows"
              target="_blank"
              rel="noopener noreferrer"
            >
              {t("viewSourceCode")}
            </a>
          </div>
        </section>
      </div>

      <Footer />
    </section>
  );
}
