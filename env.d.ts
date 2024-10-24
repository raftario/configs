declare module "@next/eslint-plugin-next" {
	import type { ESLint } from "eslint"

	const plugin: ESLint.Plugin & {
		configs: Record<"recommended" | "core-web-vitals", ESLint.ConfigData>
	}
	export default plugin
}

declare module "eslint-config-prettier" {
	import type { Linter } from "eslint"

	const config: Linter.Config
	export default config
}

declare module "eslint-plugin-jsx-a11y" {
	import type { ESLint, Linter } from "eslint"

	const plugin: ESLint.Plugin & {
		flatConfigs: Record<"recommended" | "strict", Linter.Config>
	}
	export default plugin
}

declare module "eslint-plugin-react-hooks" {
	import type { ESLint } from "eslint"

	const plugin: ESLint.Plugin & {
		configs: Record<"recommended", ESLint.ConfigData>
	}
	export default plugin
}
