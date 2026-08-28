"use client";

import { useState, useRef, useEffect } from "react";
import type { VscodeTheme } from "@/types/resources/vscode.types";

const SWATCHES = ["color0","color1","color2","color3","color4","color5","color6","color7"] as const;

export default function FloatingThemeSwitcher({
  themes,
  selectedSlug,
  onSelect,
}: {
  themes: VscodeTheme[];
  selectedSlug: string | null;
  onSelect: (slug: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  return (
    <div ref={ref} style={{ position: "absolute", bottom: "0.75rem", right: "0.75rem", zIndex: 10 }}>
      <button
        onClick={() => setOpen((p) => !p)}
        aria-label="Switch theme"
        style={{
          width: "2.75rem",
          height: "2.75rem",
          borderRadius: "50%",
          border: "1px solid var(--border)",
          background: "var(--card-bg)",
          color: "var(--foreground)",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "1.25rem",
          boxShadow: "0 2px 12px rgba(0,0,0,0.15)",
          transition: "transform 0.15s",
          transform: open ? "rotate(45deg)" : "none",
        }}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="3" />
          <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
        </svg>
      </button>

      {open && (
        <div
          style={{
            position: "absolute",
            bottom: "calc(100% + 0.5rem)",
            right: 0,
            minWidth: "14rem",
            background: "var(--card-bg)",
            border: "1px solid var(--border)",
            borderRadius: "0.5rem",
            boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
            padding: "0.5rem",
            display: "flex",
            flexDirection: "column",
            gap: "0.25rem",
          }}
        >
          {themes.map((theme) => {
            const active = theme.slug === selectedSlug;
            return (
              <button
                key={theme.slug}
                onClick={() => { onSelect(theme.slug); setOpen(false); }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  padding: "0.4rem 0.6rem",
                  borderRadius: "0.375rem",
                  border: active ? "1px solid var(--primary)" : "1px solid transparent",
                  background: active ? "color-mix(in srgb, var(--primary) 12%, transparent)" : "transparent",
                  color: "var(--foreground)",
                  cursor: "pointer",
                  fontSize: "0.85rem",
                  textAlign: "left",
                  transition: "background 0.15s",
                }}
                onMouseEnter={(e) => { if (!active) e.currentTarget.style.background = "var(--card-bg)"; }}
                onMouseLeave={(e) => { if (!active) e.currentTarget.style.background = "transparent"; }}
              >
                <span style={{ display: "flex", gap: "2px", flexShrink: 0 }}>
                  {SWATCHES.map((key) => (
                    <span
                      key={key}
                      style={{
                        width: "0.5rem",
                        height: "0.5rem",
                        borderRadius: "1px",
                        background: theme.colors[key],
                      }}
                    />
                  ))}
                </span>
                <span style={{ flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  {theme.name}
                </span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
