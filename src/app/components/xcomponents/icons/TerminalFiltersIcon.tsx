"use client";

import type { CSSProperties } from "react";

import type { XIconProps } from "./icons.types";
import Svg from "@/public/svg/icons/terminal-filters.svg";

export default function TerminalFiltersIcon({
  size = 18,
  title = "Terminal",
  style,
  ...props
}: XIconProps) {
  const iconStyle: CSSProperties = {
    display: "inline-block",
    verticalAlign: "middle",
    ...style,
  };

  return (
    <Svg
      width={size}
      height={size}
      role="img"
      aria-label={title}
      style={iconStyle}
      {...props}
    />
  );
}
