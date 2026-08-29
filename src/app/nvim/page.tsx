"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useT } from "@/app/i18n-provider";
import { usePageMeta } from "@/app/hooks/usePageMeta";
import { withBasePath } from "@/lib/base-path";
import { XTitle } from "@/app/components/Xtexts";
import Footer from "@/app/components/footer/footer";

import styles from "./nvim.module.css";

const GALLERY = [
  { src: "/images/nvim/preview1.webp", alt: "Nvim Xscriptor preview 1", width: 1200, height: 694, wide: true },
  { src: "/images/nvim/preview2.webp", alt: "Nvim Xscriptor preview 2", width: 1200, height: 727, wide: true },
  { src: "/images/nvim/preview3.webp", alt: "Nvim Xscriptor preview 3", width: 1200, height: 689, wide: false },
  { src: "/images/nvim/preview4.webp", alt: "Nvim Xscriptor preview 4", width: 1200, height: 697, wide: false },
];

const THEMES = [
  { name: "x", label: "X", dark: true },
  { name: "madrid", label: "Madrid", dark: false },
  { name: "lahabana", label: "Lahabana", dark: true },
  { name: "miami", label: "Miami", dark: true },
  { name: "paris", label: "Paris", dark: true },
  { name: "tokio", label: "Tokio", dark: true },
  { name: "oslo", label: "Oslo", dark: true },
  { name: "helsinki", label: "Helsinki", dark: false },
  { name: "berlin", label: "Berlin", dark: true },
  { name: "london", label: "London", dark: false },
  { name: "seul", label: "Seul", dark: true },
  { name: "praha", label: "Praha", dark: true },
  { name: "bogota", label: "Bogota", dark: true },
];

const REQUIREMENTS = ["Neovim", "Git", "Ripgrep", "Fd", "Node", "Python"];

const PLUGINS = ["Lsp", "Treesitter", "Completion", "Ui", "Tools", "Git"];

export default function NvimPage() {
  const t = useT("NvimPage");
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
            <div className={styles.galleryGrid}>
              {GALLERY.map((slide) => (
                <figure
                  key={slide.src}
                  className={`${styles.imageBlock} ${slide.wide ? styles.galleryWide : ""}`}
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
            <XTitle as="h2" variant="subsection" className={styles.sectionTitle}>{t("requirementsTitle")}</XTitle>
            <p className={styles.configDescription}>{t("requirementsDesc")}</p>
            <ul className={styles.featuresList}>
              {REQUIREMENTS.map((key) => (
                <li key={key} className={styles.featureItem}>{t(`req${key}`)}</li>
              ))}
            </ul>
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
                <XTitle as="h3" variant="label" className={styles.installLabel}>{t("installStep1")}</XTitle>
                <pre className={styles.codeBlock}>
                  <code>{t("installCloneCmd")}</code>
                </pre>
              </div>
              <p className={styles.installText}>{t("installStep2")}</p>
              <p className={styles.installText}>{t("installStep3")}</p>
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
                  <span className={styles.themeChipName}>{theme.label}</span>
                </div>
              ))}
            </div>
            <p className={styles.configDescription}>{t("themesUsage")}</p>
            <pre className={styles.codeBlock}>
              <code>{t("themesCmd")}</code>
            </pre>
            <p className={styles.configDescription}>{t("themesAltCmd")}</p>
            <p className={styles.configDescription}>{t("themesDefault")}</p>
          </div>
        </section>

        <section
          data-stage={4}
          className={styles.stageSurface}
          data-dimmed={dim(4)}
          data-visible={visible(4)}
        >
          <div className={styles.section}>
            <XTitle as="h2" variant="subsection" className={styles.sectionTitle}>{t("keybindingsTitle")}</XTitle>
            <p className={styles.configDescription}>{t("keybindingsDesc")}</p>
            <pre className={styles.codeBlock}>
              <code>{t("keybindingsCmd")}</code>
            </pre>
            <p className={styles.configDescription}>{t("keybindingsCmdNote")}</p>
          </div>
          <div className={styles.section}>
            <XTitle as="h2" variant="subsection" className={styles.sectionTitle}>{t("pluginsTitle")}</XTitle>
            <ul className={styles.featuresList}>
              {PLUGINS.map((key) => (
                <li key={key} className={styles.featureItem}>{t(`plugins${key}`)}</li>
              ))}
            </ul>
          </div>
          <div className={styles.section}>
            <XTitle as="h2" variant="subsection" className={styles.sectionTitle}>{t("notesTitle")}</XTitle>
            <p className={styles.configDescription}>{t("note1")}</p>
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
              href="https://github.com/xscriptor-colors/nvim"
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
