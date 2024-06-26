declare module "eslint-config-prettier" {
	import type { Linter } from "eslint"

	const config: Linter.FlatConfig
	export default config
}

declare module "eslint-plugin-jsx-a11y" {
	import type { ESLint, Linter } from "eslint"

	const plugin: ESLint.Plugin & {
		configs: Record<"recommended" | "strict", ESLint.ConfigData>
		flatConfigs: Record<"recommended" | "strict", Linter.FlatConfig>
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

declare module "eslint-plugin-unicorn" {
	import type { ESLint } from "eslint"

	const plugin: ESLint.Plugin
	export default plugin
}
