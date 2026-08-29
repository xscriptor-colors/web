"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useT } from "@/app/i18n-provider";
import { usePageMeta } from "@/app/hooks/usePageMeta";
import { withBasePath } from "@/lib/base-path";
import { XTitle } from "@/app/components/Xtexts";
import Footer from "@/app/components/footer/footer";

import styles from "./obsidian.module.css";

const FEATURES = [
  "ebGaramond",
  "lightDark",
  "frostedGlass",
  "codeBlocks",
  "styleSettings",
];

const MOBILE_SLIDES = [
  { src: "/images/obsidian/preview02.webp", alt: "Obsidian Xscriptor Mobile Theme Dark Mode 1" },
  { src: "/images/obsidian/preview03.webp", alt: "Obsidian Xscriptor Mobile Theme Dark Mode 2" },
  { src: "/images/obsidian/preview04.webp", alt: "Obsidian Xscriptor Mobile Theme Light Mode" },
];

export default function ObsidianPage() {
  const t = useT("ObsidianPage");
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
              {FEATURES.map((key) => (
                <li key={key} className={styles.featureItem}>
                  {t(`features.${key}`)}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section
          data-stage={2}
          className={styles.stageSurface}
          data-dimmed={dim(2)}
          data-visible={visible(2)}
        >
          <div className={styles.section}>
            <XTitle as="h2" variant="subsection" className={styles.sectionTitle}>{t("mobileTitle")}</XTitle>
            <div className={styles.mobileGrid}>
              {MOBILE_SLIDES.map((slide) => (
                <figure key={slide.src} className={styles.mobileFigure}>
                  <Image
                    src={withBasePath(slide.src)}
                    alt={slide.alt}
                    width={400}
                    height={800}
                    className={styles.mobileImage}
                  />
                </figure>
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
            <XTitle as="h2" variant="subsection" className={styles.sectionTitle}>{t("desktopTitle")}</XTitle>
            <figure className={styles.desktopFigure}>
              <Image
                src={withBasePath("/images/obsidian/preview06.webp")}
                alt="Obsidian Xscriptor Desktop Theme Dark Mode"
                width={1400}
                height={800}
                className={styles.desktopImage}
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
            <figure className={styles.desktopFigure}>
              <Image
                src={withBasePath("/images/obsidian/preview07.webp")}
                alt="Obsidian Xscriptor Desktop Theme Dark Mode"
                width={1400}
                height={800}
                className={styles.desktopImage}
              />
            </figure>
          </div>
        </section>

        <section
          data-stage={5}
          className={styles.stageSurface}
          data-dimmed={dim(5)}
          data-visible={visible(5)}
        >
          <div className={styles.section}>
            <XTitle as="h2" variant="subsection" className={styles.sectionTitle}>{t("installTitle")}</XTitle>
            <div className={styles.installStack}>
              <div className={styles.installBlock}>
                <XTitle as="h3" variant="label" className={styles.installLabel}>{t("installCommunity")}</XTitle>
                <p className={styles.installText}>{t("installCommunityDesc")}</p>
              </div>
              <div className={styles.installBlock}>
                <XTitle as="h3" variant="label" className={styles.installLabel}>{t("installManual")}</XTitle>
                <pre className={styles.codeBlock}>
                  <code>{t("installManualCmd")}</code>
                </pre>
              </div>
            </div>
          </div>
        </section>

        <section
          data-stage={6}
          className={styles.stageSurface}
          data-dimmed={dim(6)}
          data-visible={visible(6)}
        >
          <div className={styles.section}>
            <XTitle as="h2" variant="subsection" className={styles.sectionTitle}>{t("styleSettingsTitle")}</XTitle>
            <p className={styles.configDescription}>{t("styleSettingsDesc")}</p>
            <div className={styles.settingsGrid}>
              <div className={styles.settingCard}>
                <XTitle as="h3" variant="subtitle" className={styles.settingName}>{t("settings.transparency")}</XTitle>
                <p className={styles.settingDesc}>{t("settings.transparencyDesc")}</p>
              </div>
              <div className={styles.settingCard}>
                <XTitle as="h3" variant="subtitle" className={styles.settingName}>{t("settings.mica")}</XTitle>
                <p className={styles.settingDesc}>{t("settings.micaDesc")}</p>
              </div>
              <div className={styles.settingCard}>
                <XTitle as="h3" variant="subtitle" className={styles.settingName}>{t("settings.accent")}</XTitle>
                <p className={styles.settingDesc}>{t("settings.accentDesc")}</p>
              </div>
              <div className={styles.settingCard}>
                <XTitle as="h3" variant="subtitle" className={styles.settingName}>{t("settings.typography")}</XTitle>
                <p className={styles.settingDesc}>{t("settings.typographyDesc")}</p>
              </div>
            </div>
          </div>

          <div className={styles.viewSourceWrap}>
            <a
              className={styles.button}
              href="https://github.com/xscriptor-colors/obsidian"
              target="_blank"
              rel="noopener noreferrer"
            >
              {t("viewSourceCode")}
            </a>
          </div>
        </section>

        <section
          data-stage={7}
          className={styles.stageSurface}
          data-dimmed={dim(7)}
          data-visible={visible(7)}
        >
          <div className={styles.section}>
            <XTitle as="h2" variant="subsection" className={styles.sectionTitle}>{t("devTitle")}</XTitle>
            <p className={styles.configDescription}>{t("devIntro")}</p>

            <div className={styles.devPipeline}>
              <div className={styles.devStep}>
                <span className={styles.devStepLabel}>{t("devStep1")}</span>
              </div>
              <span className={styles.devArrow}>{"\u2192"}</span>
              <div className={styles.devStep}>
                <span className={styles.devStepLabel}>{t("devStep2")}</span>
              </div>
              <span className={styles.devArrow}>{"\u2192"}</span>
              <div className={styles.devStep}>
                <span className={styles.devStepLabel}>{t("devStep3")}</span>
              </div>
            </div>

            <XTitle as="h3" variant="subtitle" className={styles.devSubtitle}>{t("devQuickPalette")}</XTitle>
            <pre className={styles.codeBlock}>
              <code>{`{
  "colors": {
    "accent_light": "#2563eb",
    "accent_dark": "#7aa2ff",
    "heading_light": "#7c3aed",
    "heading_dark": "#a78bfa",
    "support_light": "#0f766e",
    "support_dark": "#2dd4bf",
    "warm_light": "#c2410c",
    "warm_dark": "#f5b971"
  },
  "backgrounds": {
    "light_base": "#ffffff",
    "light_surface": "#fcfdff",
    "dark_base": "#0a0a0a",
    "dark_surface": "#121212"
  }
}`}</code>
            </pre>

            <p className={styles.configDescription}>{t("devQuickPaletteDesc")}</p>

            <XTitle as="h3" variant="subtitle" className={styles.devSubtitle}>{t("devAutoDerive")}</XTitle>
            <pre className={styles.codeBlock}>
              <code>
                <span className={styles.ky}>light_alt</span>
                <span className={styles.op}>=</span>
                <span className={styles.fn}>mix</span>
                <span className={styles.pn}>(</span>
                <span className={styles.st}>light_base</span>
                <span className={styles.pn}>,</span>
                <span className=" "> </span>
                <span className={styles.st}>light_surface</span>
                <span className={styles.pn}>,</span>
                <span className=" "> </span>
                <span className={styles.nb}>0.35</span>
                <span className={styles.pn}>)
</span>
                <span className={styles.ky}>light_border</span>
                <span className={styles.op}>=</span>
                <span className={styles.fn}>mix</span>
                <span className={styles.pn}>(</span>
                <span className={styles.st}>light_base</span>
                <span className={styles.pn}>,</span>
                <span className=" "> </span>
                <span className={styles.st}>accent_light</span>
                <span className={styles.pn}>,</span>
                <span className=" "> </span>
                <span className={styles.nb}>0.08</span>
                <span className={styles.pn}>)
</span>
                <span className={styles.ky}>dark_border</span>
                <span className={styles.op}>=</span>
                <span className={styles.fn}>mix</span>
                <span className={styles.pn}>(</span>
                <span className={styles.st}>dark_surface</span>
                <span className={styles.pn}>,</span>
                <span className=" "> </span>
                <span className={styles.st}>accent_dark</span>
                <span className={styles.pn}>,</span>
                <span className=" "> </span>
                <span className={styles.nb}>0.16</span>
                <span className={styles.pn}>)
</span>
                <span className={styles.ky}>light_code_bg</span>
                <span className={styles.op}>=</span>
                <span className={styles.fn}>mix</span>
                <span className={styles.pn}>(</span>
                <span className={styles.st}>light_base</span>
                <span className={styles.pn}>,</span>
                <span className=" "> </span>
                <span className={styles.st}>accent_light</span>
                <span className={styles.pn}>,</span>
                <span className=" "> </span>
                <span className={styles.nb}>0.04</span>
                <span className={styles.pn}>)
</span>
                <span className={styles.ky}>dark_code_bg</span>
                <span className={styles.op}>=</span>
                <span className={styles.fn}>mix</span>
                <span className={styles.pn}>(</span>
                <span className={styles.st}>dark_base</span>
                <span className={styles.pn}>,</span>
                <span className=" "> </span>
                <span className={styles.st}>accent_dark</span>
                <span className={styles.pn}>,</span>
                <span className=" "> </span>
                <span className={styles.nb}>0.08</span>
                <span className={styles.pn}>)
</span>
                <span className={styles.ky}>dark_hover</span>
                <span className={styles.op}>=</span>
                <span className={styles.fn}>mix</span>
                <span className={styles.pn}>(</span>
                <span className={styles.st}>dark_surface</span>
                <span className={styles.pn}>,</span>
                <span className=" "> </span>
                <span className={styles.st}>accent_dark</span>
                <span className={styles.pn}>,</span>
                <span className=" "> </span>
                <span className={styles.nb}>0.08</span>
                <span className={styles.pn}>)
</span>
                <br />
                <span className={styles.cm}># ~150 CSS variables derived from 8 colors + 4 backgrounds</span>
              </code>
            </pre>

            <XTitle as="h3" variant="subtitle" className={styles.devSubtitle}>{t("devFastPalette")}</XTitle>
            <pre className={styles.codeBlock}>
              <code>{`{
  "typography": {
    "light_emphasis": "#7c3aed",
    "dark_emphasis": "#a78bfa"
  }
}`}</code>
            </pre>
            <p className={styles.configDescription}>{t("devFastPaletteDesc")}</p>

            <XTitle as="h3" variant="subtitle" className={styles.devSubtitle}>{t("devCli")}</XTitle>
            <pre className={styles.codeBlock}>
              <code>
                <span className={styles.tk}>python3</span>
                <span className=" "> </span>
                <span className={styles.st}>scripts/apply_quick_palette.py</span>
                <span className={styles.op}> \\</span>
                {"\n"}

                <span className=" ">  </span>
                <span className={styles.op}>--quick-config</span>
                <span className=" "> </span>
                <span className={styles.st}>quick-palette.json</span>
                <span className={styles.op}> \\</span>
                {"\n"}
                <span className=" ">  </span>
                <span className={styles.op}>--input</span>
                <span className=" "> </span>
                <span className={styles.st}>theme.css</span>
                <span className={styles.op}> \\</span>
                {"\n"}
                <span className=" ">  </span>
                <span className={styles.op}>--output</span>
                <span className=" "> </span>
                <span className={styles.st}>my-custom-theme.css</span>
              </code>
            </pre>

            <div className={styles.viewSourceWrap}>
              <a
                className={styles.button}
                href="https://github.com/xscriptor-colors/obsidian/tree/labs"
                target="_blank"
                rel="noopener noreferrer"
              >
                {t("devViewSource")}
              </a>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </section>
  );
}
