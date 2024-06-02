declare module "eslint-config-prettier" {
	import { type Linter } from "eslint"

	const config: Linter.FlatConfig
	export default config
}

declare module "eslint-plugin-jsx-a11y" {
	import { type ESLint } from "eslint"

	const plugin: ESLint.Plugin & {
		configs: Record<"recommended" | "strict", ESLint.ConfigData>
	}
	export default plugin
}

declare module "eslint-plugin-react-hooks" {
	import { type ESLint } from "eslint"

	const plugin: ESLint.Plugin & {
		configs: Record<"recommended", ESLint.ConfigData>
	}
	export default plugin
}

declare module "eslint-plugin-unicorn" {
	import { type ESLint } from "eslint"

	const plugin: ESLint.Plugin
	export default plugin
}
