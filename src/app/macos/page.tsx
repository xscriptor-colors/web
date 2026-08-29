"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useT } from "@/app/i18n-provider";
import { usePageMeta } from "@/app/hooks/usePageMeta";
import { withBasePath } from "@/lib/base-path";
import { XTitle } from "@/app/components/Xtexts";
import Footer from "@/app/components/footer/footer";

import styles from "./macos.module.css";

const STRUCTURE = [
  "Sketchybar",
  "Aerospace",
  "Install",
  "Uninstall",
];

const MANUAL = [1, 2, 3, 4, 5, 6, 7];

const USAGE = [
  "SwitchWorkspace",
  "MoveWorkspace",
  "Focus",
  "MoveWindow",
  "Resize",
  "Fullscreen",
  "Close",
  "Float",
  "Apps",
  "Reload",
  "Topbar",
];

export default function MacosPage() {
  const t = useT("MacosPage");
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
            <figure className={styles.imageBlock}>
              <Image
                src={withBasePath("/images/macos/preview1.webp")}
                alt="MacOS Xscriptor desktop preview"
                width={1200}
                height={780}
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
            <XTitle as="h2" variant="subsection" className={styles.sectionTitle}>{t("aboutTitle")}</XTitle>
            <p className={styles.configDescription}>{t("aboutDesc")}</p>
            <ul className={styles.featuresList}>
              <li className={styles.featureItem}>{t("aboutSketchybar")}</li>
              <li className={styles.featureItem}>{t("aboutAerospace")}</li>
            </ul>
          </div>
          <div className={styles.section}>
            <XTitle as="h2" variant="subsection" className={styles.sectionTitle}>{t("structureTitle")}</XTitle>
            <ul className={styles.featuresList}>
              {STRUCTURE.map((key) => (
                <li key={key} className={styles.featureItem}>{t(`struct${key}`)}</li>
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
            <pre className={styles.codeBlock}>
              <code>{t("installCmd")}</code>
            </pre>
          </div>
          <div className={styles.section}>
            <XTitle as="h2" variant="subsection" className={styles.sectionTitle}>{t("remoteTitle")}</XTitle>
            <p className={styles.configDescription}>{t("remoteDesc")}</p>
            <pre className={styles.codeBlock}>
              <code>{t("remoteInstallCmd")}</code>
            </pre>
          </div>
          <div className={styles.section}>
            <XTitle as="h2" variant="subsection" className={styles.sectionTitle}>{t("remoteUninstallTitle")}</XTitle>
            <pre className={styles.codeBlock}>
              <code>{t("remoteUninstallCmd")}</code>
            </pre>
          </div>
        </section>

        <section
          data-stage={4}
          className={styles.stageSurface}
          data-dimmed={dim(4)}
          data-visible={visible(4)}
        >
          <div className={styles.section}>
            <XTitle as="h2" variant="subsection" className={styles.sectionTitle}>{t("manualTitle")}</XTitle>
            <ul className={styles.featuresList}>
              {MANUAL.map((n) => (
                <li key={n} className={styles.featureItem}>{t(`manual${n}`)}</li>
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
          <div className={styles.section}>
            <XTitle as="h2" variant="subsection" className={styles.sectionTitle}>{t("usageTitle")}</XTitle>
            <p className={styles.configDescription}>{t("usageDesc")}</p>
            <ul className={styles.featuresList}>
              {USAGE.map((key) => (
                <li key={key} className={styles.featureItem}>{t(`usage${key}`)}</li>
              ))}
            </ul>
          </div>
        </section>

        <section
          data-stage={6}
          className={styles.stageSurface}
          data-dimmed={dim(6)}
          data-visible={visible(6)}
        >
          <div className={styles.section}>
            <XTitle as="h2" variant="subsection" className={styles.sectionTitle}>{t("customTitle")}</XTitle>
            <p className={styles.configDescription}>{t("customDesc")}</p>
            <pre className={styles.codeBlock}>
              <code>{t("customCmd")}</code>
            </pre>
            <p className={styles.configDescription}>{t("customNote")}</p>
          </div>
        </section>

        <section
          data-stage={7}
          className={styles.stageSurface}
          data-dimmed={dim(7)}
          data-visible={visible(7)}
        >
          <div className={styles.viewSourceWrap}>
            <a
              className={styles.button}
              href="https://github.com/xscriptor-colors/macos"
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
