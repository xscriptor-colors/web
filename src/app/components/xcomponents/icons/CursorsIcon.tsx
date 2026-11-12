"use client";

import type { CSSProperties } from "react";

import type { XIconProps } from "./icons.types";

export default function CursorsIcon({
  size = 16,
  color = "currentColor",
  title = "Cursors",
  style,
  ...props
}: XIconProps) {
  const iconStyle: CSSProperties = {
    color,
    display: "inline-block",
    verticalAlign: "middle",
    ...style,
  };

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      role="img"
      aria-label={title}
      style={iconStyle}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M5 3.2 17.5 12l-5.7 1.1L9 20 5 3.2Z" />
      <path d="m16 3 5 5M21 3l-5 5" />
    </svg>
  );
}
