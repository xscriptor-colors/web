export type VscodeThemeColorKey =
  | "color0"
  | "color1"
  | "color2"
  | "color3"
  | "color4"
  | "color5"
  | "color6"
  | "color7"
  | "color8"
  | "color9"
  | "color10"
  | "color11"
  | "color12"
  | "color13"
  | "color14"
  | "color15";

export type VscodeThemeColors = Record<VscodeThemeColorKey, string>;

export type VscodeTokenRole =
  | "plain"
  | "keyword"
  | "string"
  | "attribute"
  | "function"
  | "number"
  | "type"
  | "foreground"
  | "comment"
  | "error"
  | "success"
  | "warning"
  | "info"
  | "operator"
  | "storage"
  | "inherit";

export type VscodePreviewToken = {
  text: string;
  role?: VscodeTokenRole;
};

export type VscodePaletteRole = {
  key: VscodeThemeColorKey;
  label: string;
  description: string;
};

export type VscodeTheme = {
  slug: string;
  name: string;
  description: string;
  summary: string;
  bestFor: string;
  isLight: boolean;
  repositoryHref: string;
  colors: VscodeThemeColors;
};
