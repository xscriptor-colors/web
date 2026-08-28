"use client";

import type { CSSProperties } from "react";

import type { XIconProps } from "./icons.types";
import Svg from "@/public/svg/icons/nvim.svg";

export default function NvimIcon({
  size = 16,
  color = "currentColor",
  title = "Nvim",
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
