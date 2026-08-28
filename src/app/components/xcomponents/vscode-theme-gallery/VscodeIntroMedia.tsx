"use client";

import styles from "./VscodeThemeGallery.module.css";

type VscodeIntroMediaProps = {
  videoSrc: string;
};

export default function VscodeIntroMedia({ videoSrc }: VscodeIntroMediaProps) {
  return (
    <section
      className={styles.introMedia}
      aria-label="Video preview of the Xscriptor VSCode themes"
    >
      <video
        className={styles.introVideo}
        src={videoSrc}
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        disablePictureInPicture
        aria-hidden="true"
      />
      <div className={styles.introOverlay}>
        <p className={styles.introEyebrow}>Preview reel</p>
        <p className={styles.introHint}>
          Select a theme to switch from video preview to the interactive editor.
        </p>
      </div>
    </section>
  );
}
