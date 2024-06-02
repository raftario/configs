import type { Config } from "prettier"

export default {
	printWidth: 80,
	tabWidth: 2,
	useTabs: true,
	semi: false,
	singleQuote: false,
	quoteProps: "as-needed",
	trailingComma: "all",
	bracketSpacing: true,
	arrowParens: "always",
	endOfLine: "lf",

	jsxSingleQuote: false,
	bracketSameLine: false,
	proseWrap: "never",

	experimentalTernaries: true,
} satisfies Config
