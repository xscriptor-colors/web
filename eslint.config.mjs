import jsxA11y from "eslint-plugin-jsx-a11y";

const eslintConfig = [
  ...(await import("eslint-config-next/core-web-vitals")).default,
  ...(await import("eslint-config-next/typescript")).default,
  {
    rules: {
      ...jsxA11y.configs.recommended.rules,
      // New react-hooks v6 rules flag patterns in the original devxscriptor
      // codebase (ported as-is). Kept aligned with the upstream project.
      "react-hooks/set-state-in-effect": "off",
      "react-hooks/immutability": "off",
      "react-hooks/refs": "off",
      "react-hooks/impure-function": "off",
      "react-hooks/purity": "off",
      "jsx-a11y/click-events-have-key-events": "off",
      "jsx-a11y/no-static-element-interactions": "off",
      "jsx-a11y/no-interactive-element-to-noninteractive-role": "off",
      "@typescript-eslint/no-explicit-any": "off",
    },
  },
];

export default eslintConfig;
