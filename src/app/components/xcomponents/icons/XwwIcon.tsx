"use client";

import type { CSSProperties } from "react";

import type { XIconProps } from "./icons.types";
import Svg from "@/public/svg/icons/xww.svg";

export default function XwwIcon({
  size = 16,
  color = "currentColor",
  title = "XWW",
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
