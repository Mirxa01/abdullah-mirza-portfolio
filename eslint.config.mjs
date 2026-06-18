// ESLint flat configuration (ESLint 9 / Next.js 16).
// Replaces the legacy `.eslintrc.json` + `next lint`, which were removed in
// Next.js 16. Run via `pnpm lint` (`eslint .`).
import coreWebVitals from "eslint-config-next/core-web-vitals";
import typescript from "eslint-config-next/typescript";

const config = [
    {
        ignores: [
            ".next/**",
            "node_modules/**",
            "next-env.d.ts",
            "**/*.config.{js,mjs,ts}",
        ],
    },
    ...coreWebVitals,
    ...typescript,
];

export default config;
