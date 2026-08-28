"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import ColorRain from "@/app/components/ColorRain";
import { XTitle } from "@/app/components/Xtexts";

export default function Home() {
  return (
    <>
      <div style={{ position: "fixed", inset: 0, zIndex: 0, background: "var(--background)" }}>
        <ColorRain />
      </div>

      <div
        style={{
          position: "relative",
          zIndex: 1,
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 24,
          padding: "2rem 1rem",
        }}
      >
        <XTitle em="Colors">Xscriptor</XTitle>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          style={{
            color: "var(--text-muted)",
            maxWidth: "42rem",
            textAlign: "center",
            lineHeight: 1.8,
          }}
        >
          Open-source resources from the Xscriptor Colors organization — themes, tools, and
          customizations for VS Code, JetBrains, Obsidian, terminal, and more.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.5 }}
        >
          <Link
            href="/resources"
            style={{
              display: "inline-block",
              padding: "0.75rem 2rem",
              background: "var(--primary)",
              color: "var(--background)",
              borderRadius: 9999,
              fontWeight: 600,
              fontSize: "0.9rem",
              textDecoration: "none",
              transition: "opacity 0.3s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          >
            Explore resources
          </Link>
        </motion.div>
      </div>
    </>
  );
}
