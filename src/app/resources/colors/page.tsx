"use client";

import Image from "next/image";
import { useT } from "@/app/i18n-provider";
import { usePageMeta } from "@/app/hooks/usePageMeta";
import { withBasePath } from "@/lib/base-path";
import { THEMES } from "@/data/resources/colors/colors.data";
import { FloatingPaths } from "@/app/components/xcomponents/FloatingPaths";
import { XTitle } from "@/app/components/Xtexts";
import Footer from "@/app/components/footer/footer";
import ThemeCard from "./ThemeCard";
import styles from "./colors.module.css";

type ImageCard = {
  src: string;
  themeIndices: number[];
  label: string;
};

const IMAGE_CARDS: ImageCard[] = [
  { src: "/images/resources/colors/x.webp", themeIndices: [0], label: "X" },
  { src: "/images/resources/colors/x-tokio.webp", themeIndices: [0, 5], label: "X + Tokio" },
  { src: "/images/resources/colors/madrid.webp", themeIndices: [1], label: "Madrid" },
  { src: "/images/resources/colors/lahabana2.webp", themeIndices: [2], label: "Lahabana" },
  { src: "/images/resources/colors/miami.webp", themeIndices: [3], label: "Miami" },
  { src: "/images/resources/colors/paris.webp", themeIndices: [4], label: "Paris" },
  { src: "/images/resources/colors/tokio.webp", themeIndices: [5], label: "Tokio" },
  { src: "/images/resources/colors/oslo.webp", themeIndices: [6], label: "Oslo" },
  { src: "/images/resources/colors/helsinki.webp", themeIndices: [7], label: "Helsinki" },
  { src: "/images/resources/colors/berlin.webp", themeIndices: [8], label: "Berlin" },
  { src: "/images/resources/colors/praha.webp", themeIndices: [10], label: "Praha" },
  { src: "/images/resources/colors/bogota.webp", themeIndices: [11], label: "Bogota" },
  { src: "/images/resources/colors/bogota-paris.webp", themeIndices: [11, 4], label: "Bogota + Paris" },
];

export default function ColorsPage() {
  const t = useT("ColorsPage");
  usePageMeta(t("titleEm"));

  return (
    <div className={styles.page}>
      <style>{`html,body{overflow-x:hidden;overflow-y:auto;height:auto!important}`}</style>
      <div className={styles.bg}>
        <FloatingPaths />
      </div>
      <div className={styles.content}>
        <div className={styles.inner}>
          <div className={styles.header}>
            <XTitle em={t("titleEm")}>{t("title")}</XTitle>
            <p className={styles.description}>{t("description")}</p>
          </div>

          <div className={styles.grid}>
            {THEMES.map((theme, ti) => (
              <ThemeCard key={theme.name} theme={theme} delay={ti * 120} />
            ))}
          </div>

          <div className={styles.inspiration}>
            <XTitle as="h2" variant="subsection" size="md">{t("inspiration")}</XTitle>
            <div className={styles.imageGrid}>
              {IMAGE_CARDS.map((card, ci) => {
                const colors = card.themeIndices.flatMap((ti) => THEMES[ti].colors);
                const combinedLabel = card.themeIndices.map((ti) => THEMES[ti].name).join(" + ");
                return (
                  <div
                    key={card.src}
                    className={styles.imageCard}
                    style={{ animationDelay: `${ci * 90}ms` }}
                  >
                    <div className={styles.imageWrap}>
                      <Image
                        src={withBasePath(card.src)}
                        alt={combinedLabel}
                        width={960}
                        height={540}
                        className={styles.image}
                        style={{ display: "block" }}
                      />
                      <span className={styles.imageLabel}>{combinedLabel}</span>
                    </div>
                    <div className={styles.imageDots}>
                      {colors.map((hex, i) => (
                        <div
                          key={i}
                          className={styles.imageDot}
                          style={{ backgroundColor: hex }}
                          title={`${combinedLabel}: ${hex}`}
                        />
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
