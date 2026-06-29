import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
      "react-hooks/set-state-in-effect": "off",
      "react-hooks/immutability": "off",
      "react-hooks/preserve-manual-memoization": "off",
      "@typescript-eslint/no-unused-vars": "warn",
      "prefer-const": "warn",
    },
  },
  // Homepage i18n isolation: forbid legacy i18n barrel in homepage-scope files
  {
    files: [
      "src/app/page.tsx",
      "src/components/EntryProtocol.tsx",
      "src/components/UserSwitcher.tsx",
      "src/components/UserSetup.tsx",
      "src/components/ui/AchievementVault.tsx",
    ],
    rules: {
      // Static import() — exact path match, no prefix bleed
      "no-restricted-imports": [
        "error",
        {
          paths: [
            {
              name: "@/lib/i18n",
              message:
                "FORBIDDEN: legacy i18n barrel in homepage scope. Use @/lib/i18n/home-i18n.",
            },
            {
              name: "@/lib/i18n/index",
              message:
                "FORBIDDEN: legacy i18n/index in homepage scope. Use @/lib/i18n/home-i18n.",
            },
          ],
        },
      ],
      // Dynamic import() + legacy hook usage (not covered by no-restricted-imports)
      "no-restricted-syntax": [
        "error",
        {
          selector: "ImportExpression[source.value='@/lib/i18n']",
          message:
            "FORBIDDEN: dynamic import of legacy i18n barrel in homepage scope. Use home-i18n.ts.",
        },
        {
          selector: "ImportExpression[source.value='@/lib/i18n/index']",
          message:
            "FORBIDDEN: dynamic import of legacy i18n/index in homepage scope. Use home-i18n.ts.",
        },
        {
          selector: "CallExpression[callee.name='useLanguage']",
          message:
            "FORBIDDEN in homepage scope: useLanguage() is legacy i18n. Use useHomeLanguage() from @/lib/i18n/home-i18n.",
        },
        {
          selector: "CallExpression[callee.name='useNamespace']",
          message:
            "FORBIDDEN in homepage scope: useNamespace() is legacy i18n. Use useHomeLanguage() from @/lib/i18n/home-i18n.",
        },
      ],
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    "src/scripts/**",
    "*.js",
  ]),
]);

export default eslintConfig;
