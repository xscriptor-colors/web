"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useT } from "@/app/i18n-provider";
import { usePageMeta } from "@/app/hooks/usePageMeta";
import { withBasePath } from "@/lib/base-path";
import { XTitle } from "@/app/components/Xtexts";
import Footer from "@/app/components/footer/footer";

import styles from "./hyprland.module.css";

const REEL = [
  { src: "/images/gifs/hyprland/hyprland-demo-1.gif", alt: "Xscriptor Hyprland desktop overview" },
  { src: "/images/gifs/hyprland/hyprland-demo-2.gif", alt: "Xscriptor Hyprland QuickShell widgets" },
  { src: "/images/gifs/hyprland/hyprland-demo-4.gif", alt: "Xscriptor Hyprland Dock Editor palette switcher" },
  { src: "/images/gifs/hyprland/hyprland-demo-3.gif", alt: "Xscriptor Hyprland workspace preview" },
  { src: "/images/gifs/hyprland/hyprland-demo-5.gif", alt: "Xscriptor Hyprland wallpaper picker" },
  { src: "/images/gifs/hyprland/hyprland-demo-6.gif", alt: "Xscriptor Hyprland dynamic theming preview" },
];

export default function HyprlandPage() {
  const t = useT("HyprlandPage");
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
              src={withBasePath(REEL[0].src)}
              alt={REEL[0].alt}
              width={1280}
              height={720}
              className={styles.imageBlockContent}
              unoptimized
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
            <XTitle as="h2" variant="subsection" className={styles.sectionTitle}>{t("shellTitle")}</XTitle>
            <ul className={styles.featuresList}>
              <li className={styles.featureItem}>{t("feature1")}</li>
              <li className={styles.featureItem}>{t("feature2")}</li>
              <li className={styles.featureItem}>{t("feature3")}</li>
              <li className={styles.featureItem}>{t("feature4")}</li>
              <li className={styles.featureItem}>{t("feature5")}</li>
            </ul>
          </div>
          <figure className={styles.imageBlock}>
            <Image
              src={withBasePath(REEL[1].src)}
              alt={REEL[1].alt}
              width={1280}
              height={720}
              className={styles.imageBlockContent}
              unoptimized
            />
          </figure>
        </section>

        <section
          data-stage={2}
          className={styles.stageSurface}
          data-dimmed={dim(2)}
          data-visible={visible(2)}
        >
          <div className={styles.section}>
            <XTitle as="h2" variant="subsection" className={styles.sectionTitle}>{t("paletteTitle")}</XTitle>
            <p className={styles.configDescription}>{t("paletteDesc")}</p>
          </div>
          <figure className={styles.imageBlock}>
            <Image
              src={withBasePath(REEL[2].src)}
              alt={REEL[2].alt}
              width={1280}
              height={720}
              className={styles.imageBlockContent}
              unoptimized
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
            <XTitle as="h2" variant="subsection" className={styles.sectionTitle}>{t("customizationTitle")}</XTitle>
            <p className={styles.configDescription}>{t("customizationDesc")}</p>
            <pre className={styles.codeBlock}>
              <code>{t("customizationExample")}</code>
            </pre>
          </div>
          <figure className={styles.imageBlock}>
            <Image
              src={withBasePath(REEL[3].src)}
              alt={REEL[3].alt}
              width={1280}
              height={720}
              className={styles.imageBlockContent}
              unoptimized
            />
          </figure>
        </section>

        <section
          data-stage={4}
          className={styles.stageSurface}
          data-dimmed={dim(4)}
          data-visible={visible(4)}
        >
          <div className={styles.section}>
            <XTitle as="h2" variant="subsection" className={styles.sectionTitle}>{t("installTitle")}</XTitle>
            <p className={styles.configDescription}>{t("installDesc")}</p>
            <pre className={styles.codeBlock}>
              <code>{t("installCmd")}</code>
            </pre>
          </div>

          <div className={styles.imagePair}>
            <figure className={styles.imageBlock}>
              <Image
                src={withBasePath(REEL[4].src)}
                alt={REEL[4].alt}
                width={1280}
                height={720}
                className={styles.imageBlockContent}
                unoptimized
              />
            </figure>
            <figure className={styles.imageBlock}>
              <Image
                src={withBasePath(REEL[5].src)}
                alt={REEL[5].alt}
                width={1280}
                height={720}
                className={styles.imageBlockContent}
                unoptimized
              />
            </figure>
          </div>

          <div className={styles.viewSourceWrap}>
            <a
              className={styles.button}
              href="https://github.com/xscriptor-colors/hyprland"
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
