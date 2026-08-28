"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useT } from "@/app/i18n-provider";
import { usePageMeta } from "@/app/hooks/usePageMeta";
import { XTitle } from "@/app/components/Xtexts";
import Footer from "@/app/components/footer/footer";

import styles from "./jetbrains.module.css";

const THEMES = [
  { name: "X", city: "x", dark: true },
  { name: "Lahabana", city: "lahabana", dark: true },
  { name: "Miami", city: "miami", dark: true },
  { name: "Paris", city: "paris", dark: true },
  { name: "Tokio", city: "tokio", dark: true },
  { name: "Oslo", city: "oslo", dark: true },
  { name: "Berlin", city: "berlin", dark: true },
  { name: "Praha", city: "praha", dark: true },
  { name: "Bogota", city: "bogota", dark: true },
  { name: "Madrid", city: "madrid", dark: false },
  { name: "Helsinki", city: "helsinki", dark: false },
  { name: "London", city: "london", dark: false },
];

export default function JetBrainsPage() {
  const t = useT("JetBrainsPage");
  usePageMeta(t("title"));

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
          <figure className={styles.imageBlock}>
            <Image
              src="/images/resources/jetbrains/preview1.webp"
              alt="JetBrains Xscriptor theme overview"
              width={2400}
              height={1350}
              className={styles.imageBlockContent}
            />
          </figure>
        </section>

        <section
          data-stage={1}
          className={styles.stageSurface}
          data-dimmed={dim(1)}
          data-visible={visible(1)}
        >
          <div className={styles.section}>
            <XTitle as="h2" variant="subsection" className={styles.sectionTitle}>{t("featuresTitle")}</XTitle>
            <ul className={styles.featuresList}>
              <li className={styles.featureItem}>{t("feature1")}</li>
              <li className={styles.featureItem}>{t("feature2")}</li>
              <li className={styles.featureItem}>{t("feature3")}</li>
              <li className={styles.featureItem}>{t("feature4")}</li>
              <li className={styles.featureItem}>{t("feature5")}</li>
            </ul>
          </div>
          <div className={styles.imagePair}>
            <figure className={styles.imageBlock}>
              <Image
                src="/images/resources/jetbrains/preview2.webp"
                alt="JetBrains Xscriptor editor preview"
                width={1200}
                height={675}
                className={styles.imageBlockContent}
              />
            </figure>
            <figure className={styles.imageBlock}>
              <Image
                src="/images/resources/jetbrains/preview3.webp"
                alt="JetBrains Xscriptor code syntax"
                width={1200}
                height={675}
                className={styles.imageBlockContent}
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
            <XTitle as="h2" variant="subsection" className={styles.sectionTitle}>{t("themesTitle")}</XTitle>
            <p className={styles.configDescription}>{t("themesDesc")}</p>
            <div className={styles.themesGrid}>
              {THEMES.map((theme) => (
                <div key={theme.city} className={styles.themeChip}>
                  <span className={styles.themeChipBadge} data-dark={theme.dark}>
                    {theme.dark ? t("dark") : t("light")}
                  </span>
                  <span className={styles.themeChipName}>{theme.name}</span>
                </div>
              ))}
            </div>
          </div>
          <figure className={styles.imageBlock}>
            <Image
              src="/images/resources/jetbrains/preview4.webp"
              alt="JetBrains Xscriptor UI details"
              width={2400}
              height={1350}
              className={styles.imageBlockContent}
            />
          </figure>
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
                <XTitle as="h3" variant="label" className={styles.installLabel}>{t("installMarketplace")}</XTitle>
                <p className={styles.installText}>{t("installMarketplaceDesc")}</p>
              </div>
              <div className={styles.installBlock}>
                <XTitle as="h3" variant="label" className={styles.installLabel}>{t("installManual")}</XTitle>
                <pre className={styles.codeBlock}>
                  <code>{t("installManualCmd")}</code>
                </pre>
              </div>
              <div className={styles.installBlock}>
                <XTitle as="h3" variant="label" className={styles.installLabel}>{t("installBuild")}</XTitle>
                <pre className={styles.codeBlock}>
                  <code>{t("installBuildCmd")}</code>
                </pre>
              </div>
            </div>
          </div>
          <div className={styles.imagePair}>
            <figure className={styles.imageBlock}>
              <Image
                src="/images/resources/jetbrains/preview5.webp"
                alt="JetBrains Xscriptor dark theme showcase"
                width={1200}
                height={675}
                className={styles.imageBlockContent}
              />
            </figure>
            <figure className={styles.imageBlock}>
              <Image
                src="/images/resources/jetbrains/preview6.webp"
                alt="JetBrains Xscriptor light theme showcase"
                width={1200}
                height={675}
                className={styles.imageBlockContent}
              />
            </figure>
          </div>
        </section>

        <section
          data-stage={4}
          className={styles.stageSurface}
          data-dimmed={dim(4)}
          data-visible={visible(4)}
        >
          <div className={styles.section}>
            <XTitle as="h2" variant="subsection" className={styles.sectionTitle}>{t("scriptsTitle")}</XTitle>
            <p className={styles.configDescription}>{t("scriptsDesc")}</p>
            <pre className={styles.codeBlock}>
              <code>{t("scriptsExample")}</code>
            </pre>
            <div className={styles.palettePreview}>
              <div className={styles.paletteSwatch} style={{ backgroundColor: "#fc618d" }} />
              <div className={styles.paletteSwatch} style={{ backgroundColor: "#7bd88f" }} />
              <div className={styles.paletteSwatch} style={{ backgroundColor: "#fce566" }} />
              <div className={styles.paletteSwatch} style={{ backgroundColor: "#fd9353" }} />
              <div className={styles.paletteSwatch} style={{ backgroundColor: "#948ae3" }} />
              <div className={styles.paletteSwatch} style={{ backgroundColor: "#5ad4e6" }} />
              <div className={styles.paletteSwatch} style={{ backgroundColor: "#f7f1ff" }} />
              <div className={styles.paletteSwatch} style={{ backgroundColor: "#363537" }} />
            </div>
          </div>

          <div className={styles.viewSourceWrap}>
            <a
              className={styles.button}
              href="https://github.com/xscriptor-colors/jetbrains"
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
