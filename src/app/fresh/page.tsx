"use client";

import { useEffect, useState } from "react";
import { useT } from "@/app/i18n-provider";
import { usePageMeta } from "@/app/hooks/usePageMeta";
import { withBasePath } from "@/lib/base-path";
import { XTitle } from "@/app/components/Xtexts";
import Footer from "@/app/components/footer/footer";

import styles from "./fresh.module.css";

const THEMES = [
  { name: "x", label: "X", dark: true },
  { name: "lahabana", label: "Lahabana", dark: true },
  { name: "miami", label: "Miami", dark: true },
  { name: "paris", label: "Paris", dark: true },
  { name: "tokio", label: "Tokio", dark: true },
  { name: "oslo", label: "Oslo", dark: true },
  { name: "berlin", label: "Berlin", dark: true },
  { name: "praha", label: "Praha", dark: true },
  { name: "bogota", label: "Bogota", dark: true },
  { name: "madrid", label: "Madrid", dark: false },
  { name: "helsinki", label: "Helsinki", dark: false },
  { name: "london", label: "London", dark: false },
];

export default function FreshPage() {
  const t = useT("FreshPage");
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
            <XTitle as="h2" variant="subsection" className={styles.sectionTitle}>{t("lookTitle")}</XTitle>
            <figure className={styles.videoBlock}>
              <video
                className={styles.video}
                src={withBasePath("/images/fresh/preview.mp4")}
                autoPlay
                muted
                loop
                playsInline
                controls
                preload="metadata"
              />
            </figure>
          </div>
        </section>

        <section
          data-stage={2}
          className={styles.stageSurface}
          data-dimmed={dim(2)}
          data-visible={visible(2)}
        >
          <div className={styles.section}>
            <XTitle as="h2" variant="subsection" className={styles.sectionTitle}>{t("overviewTitle")}</XTitle>
            <p className={styles.configDescription}>{t("overviewDesc")}</p>
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
                  <span className={styles.themeChipName}>{theme.label}</span>
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
                  <code>{t("installCurl")}</code>
                </pre>
                <pre className={styles.codeBlock}>
                  <code>{t("installWget")}</code>
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
            <XTitle as="h2" variant="subsection" className={styles.sectionTitle}>{t("uninstallTitle")}</XTitle>
            <div className={styles.installStack}>
              <div className={styles.installBlock}>
                <XTitle as="h3" variant="label" className={styles.installLabel}>{t("uninstallRemote")}</XTitle>
                <pre className={styles.codeBlock}>
                  <code>{t("uninstallCurl")}</code>
                </pre>
                <pre className={styles.codeBlock}>
                  <code>{t("uninstallWget")}</code>
                </pre>
              </div>
              <p className={styles.installText}>{t("uninstallNote")}</p>
            </div>
          </div>
        </section>

        <section
          data-stage={5}
          className={styles.stageSurface}
          data-dimmed={dim(5)}
          data-visible={visible(5)}
        >
          <div className={styles.section}>
            <XTitle as="h2" variant="subsection" className={styles.sectionTitle}>{t("manualTitle")}</XTitle>
            <pre className={styles.codeBlock}>
              <code>{t("manualCmd")}</code>
            </pre>
          </div>
          <div className={styles.section}>
            <XTitle as="h2" variant="subsection" className={styles.sectionTitle}>{t("notesTitle")}</XTitle>
            <ul className={styles.featuresList}>
              <li className={styles.featureItem}>{t("note1")}</li>
              <li className={styles.featureItem}>{t("note2")}</li>
            </ul>
          </div>
        </section>

        <section
          data-stage={6}
          className={styles.stageSurface}
          data-dimmed={dim(6)}
          data-visible={visible(6)}
        >
          <div className={styles.viewSourceWrap}>
            <a
              className={styles.button}
              href="https://github.com/xscriptor-colors/fresh"
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
