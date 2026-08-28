export type ThemePalette = {
  name: string;
  colors: string[];
  background: string;
  foreground: string;
};

export const THEMES: ThemePalette[] = [
  {
    name: "X",
    colors: [
      "#0a0a0a","#fc618d","#7bd88f","#fce566","#fd9353","#948ae3","#5ad4e6","#f7f1ff",
      "#0f0f0f","#fc618d","#7bd88f","#fce566","#fd9353","#948ae3","#5ad4e6","#f7f1ff",
    ],
    background: "#050505",
    foreground: "#f7f1ff",
  },
  {
    name: "Madrid",
    colors: [
      "#fafafa","#990026","#007a28","#8a6408","#007a9e","#4d2699","#007a9e","#1a1a1a",
      "#4d4d4d","#990026","#007a28","#8a6408","#007a9e","#4d2699","#007a9e","#1a1a1a",
    ],
    background: "#fafafa",
    foreground: "#1a1a1a",
  },
  {
    name: "Lahabana",
    colors: [
      "#19191a","#fc618d","#7bd88f","#e5ff9d","#fd9353","#948ae3","#5ad4e6","#f7f1ff",
      "#19191a","#fc618d","#7bd88f","#e5ff9d","#fd9353","#948ae3","#5ad4e6","#f7f1ff",
    ],
    background: "#19191a",
    foreground: "#f7f1ff",
  },
  {
    name: "Miami",
    colors: [
      "#000000","#FF4C8B","#7FFFD4","#FFD84C","#00FFA8","#D36CFF","#47CFFF","#f7f1ff",
      "#69676c","#FF4C8B","#7FFFD4","#FFD84C","#00FFA8","#D36CFF","#47CFFF","#f7f1ff",
    ],
    background: "#000000",
    foreground: "#f7f1ff",
  },
  {
    name: "Paris",
    colors: [
      "#1a0a30","#fc618d","#7bd88f","#fce566","#a3f3ff","#c4bdff","#a3f3ff","#1a0a30",
      "#c4bdff","#fc618d","#7bd88f","#fce566","#a3f3ff","#c4bdff","#a3f3ff","#f7f1ff",
    ],
    background: "#1a0a30",
    foreground: "#f7f1ff",
  },
  {
    name: "Tokio",
    colors: [
      "#1c1c1d","#fc618d","#7bd88f","#fce566","#fd9353","#948ae3","#5ad4e6","#f7f1ff",
      "#1c1c1d","#fc618d","#7bd88f","#fce566","#fd9353","#948ae3","#5ad4e6","#f7f1ff",
    ],
    background: "#1c1c1d",
    foreground: "#f7f1ff",
  },
  {
    name: "Oslo",
    colors: [
      "#3f4451","#e05561","#8cc265","#d18f52","#4aa5f0","#c162de","#42b3c2","#e6e6e6",
      "#4f5666","#ff616e","#a5e075","#f0a45d","#4dc4ff","#de73ff","#4cd1e0","#ffffff",
    ],
    background: "#3f4451",
    foreground: "#abb2bf",
  },
  {
    name: "Helsinki",
    colors: [
      "#f8fafe","#1faa9e","#733d9a","#2e70ad","#b55a0f","#3e9d21","#bd4c3d","#544d40",
      "#b0a999","#009e91","#5a1f8a","#0f5ba2","#b23b00","#218c00","#b32e1f","#000000",
    ],
    background: "#f8fafe",
    foreground: "#544d40",
  },
  {
    name: "Berlin",
    colors: [
      "#000000","#999999","#bbbbbb","#dddddd","#888888","#aaaaaa","#cccccc","#ffffff",
      "#333333","#bbbbbb","#dddddd","#ffffff","#aaaaaa","#cccccc","#eeeeee","#ffffff",
    ],
    background: "#000000",
    foreground: "#cccccc",
  },
  {
    name: "London",
    colors: [
      "#ffffff","#333333","#444444","#555555","#666666","#777777","#888888","#333333",
      "#333333","#444444","#555555","#666666","#777777","#888888","#999999","#aaaaaa",
    ],
    background: "#ffffff",
    foreground: "#333333",
  },
  {
    name: "Praha",
    colors: [
      "#1A1A1A","#FF5555","#B8E6A0","#FFE4A3","#BD93F9","#FF9AA2","#8BE9FD","#FFFFFF",
      "#6272A4","#FF6E6E","#B8E6A0","#FFE4A3","#D6ACFF","#FF9AA2","#A4FFFF","#FFFFFF",
    ],
    background: "#1a1a1a",
    foreground: "#ffffff",
  },
  {
    name: "Bogota",
    colors: [
      "#200b0a","#fc618d","#7bd88f","#ffed89","#47e6ff","#ff9999","#47e6ff","#f7f1ff",
      "#525053","#fc618d","#7bd88f","#ffed89","#47e6ff","#ff9999","#47e6ff","#f7f1ff",
    ],
    background: "#200b0a",
    foreground: "#f7f1ff",
  },
];

export const ANSI_LABELS = [
  "black","red","green","yellow","blue","magenta","cyan","white",
  "br black","br red","br green","br yellow","br blue","br magenta","br cyan","br white",
];
