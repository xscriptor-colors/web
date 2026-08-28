const PALETTE = ["#fbbf24", "#fc618d", "#7bd88f", "#fce566", "#fd9353", "#948ae3", "#5ad4e6"];

import styles from "./FloatingPaths.module.css";

const LAYER_COUNT = 12;

function PathLayer({ position, offset }: { position: number; offset: number }) {
  const paths = Array.from({ length: LAYER_COUNT }, (_, i) => {
    const c = PALETTE[(i + offset) % PALETTE.length];
    return {
      id: i,
      d: `M-${380 - i * 5 * position} -${189 + i * 6}C-${
        380 - i * 5 * position
      } -${189 + i * 6} -${312 - i * 5 * position} ${216 - i * 6} ${
        152 - i * 5 * position
      } ${343 - i * 6}C${616 - i * 5 * position} ${470 - i * 6} ${
        684 - i * 5 * position
      } ${875 - i * 6} ${684 - i * 5 * position} ${875 - i * 6}`,
      color: c,
      width: 0.4 + i * 0.02,
      duration: 6 + ((i * 3) % 6),
      delay: (i * 0.7) % 5,
    };
  });

  return (
    <div className={styles.layer}>
      <svg
        className={styles.svg}
        viewBox="0 0 696 316"
        fill="none"
        preserveAspectRatio="xMidYMid slice"
      >
        <title>Background Paths</title>
        {paths.map((path) => (
          <path
            key={path.id}
            d={path.d}
            stroke={path.color}
            strokeWidth={path.width}
            strokeOpacity={0.06 + path.id * 0.008}
            className={styles.path}
            style={{
              animationDuration: `${path.duration}s`,
              animationDelay: `${path.delay}s`,
            }}
          />
        ))}
      </svg>
    </div>
  );
}

export default function FloatingPaths({ className = "" }: { className?: string }) {
  return (
    <div
      className={`absolute pointer-events-none overflow-hidden ${className}`}
      style={{
        left: "50%",
        transform: "translateX(-50%)",
        width: "100vw",
        height: "100%",
        top: 0,
      }}
    >
      <PathLayer position={1} offset={0} />
      <PathLayer position={-1} offset={3} />
    </div>
  );
}
