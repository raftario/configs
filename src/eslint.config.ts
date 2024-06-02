import js from "@eslint/js"
import prettier from "eslint-config-prettier"
import deprecation from "eslint-plugin-deprecation"
import jsdoc from "eslint-plugin-jsdoc"
import a11y from "eslint-plugin-jsx-a11y"
import hooks from "eslint-plugin-react-hooks"
import imports from "eslint-plugin-simple-import-sort"
import unicorn from "eslint-plugin-unicorn"
import ts from "typescript-eslint"

function dir(path: string) {
	if (path.endsWith("/")) {
		path = path.slice(0, -1)
	}
	return path
}

/**
 * Generates an opinionated ESLint configuration for TypeScript projects
 *
 * @param options
 * @param options.sources - Source directories for library code
 * @param options.targets - Target directories for compiler output
 * @param options.ignores - Patterns to ignore
 * @param options.root - Project root, usually `import.meta.dirname`
 * @param configs - Additional configs to extend
 */
export function config(
	{
		sources = ["src"],
		targets = ["target", "dist", "out"],
		ignores = [],
		root,
	}: {
		sources?: string[]
		targets?: string[]
		ignores?: string[]
		root?: string
	} = {},
	...configs: ts.ConfigWithExtends[]
) {
	return ts.config(
		{
			ignores: [
				"node_modules/**",
				...ignores,
				...targets.map((t) => `${dir(t)}/**`),
			],
		},
		{
			files: ["**/*.ts", "**/*.js", "**/*.tsx", "**/*.jsx"],
			extends: [
				js.configs.recommended,
				...ts.configs.stylistic,
				...ts.configs.strict,
			],
			plugins: { imports, deprecation, jsdoc, unicorn },
			languageOptions: {
				parserOptions: {
					EXPERIMENTAL_useProjectService: {
						defaultProject: "./tsconfig.json",
						allowDefaultProjectForFiles: ["./*.js"],
					} as unknown as boolean,
					tsconfigRootDir: root,
				},
			},
			settings: {
				jsdoc: {
					mode: "typescript",
					tagNamePreference: {
						fires: "emits",
						property: "prop",
						template: "typeparam",
					},
				},
			},
			rules: {
				"imports/imports": "warn",
				"imports/exports": "warn",
				"deprecation/deprecation": "error",

				"@typescript-eslint/consistent-type-imports": [
					"error",
					{ prefer: "type-imports", fixStyle: "separate-type-imports" },
				],
				"@typescript-eslint/no-non-null-assertion": "off",
				"@typescript-eslint/no-unused-vars": [
					"warn",
					{
						vars: "all",
						args: "all",
						caughtErrors: "all",
						varsIgnorePattern: "^_",
						argsIgnorePattern: "^_",
						destructuredArrayIgnorePattern: "^_",
					},
				],

				"jsdoc/check-alignment": "warn",
				"jsdoc/check-indentation": "warn",
				"jsdoc/check-param-names": "error",
				"jsdoc/check-tag-names": ["error", { typed: true }],
				"jsdoc/empty-tags": "error",
				"jsdoc/multiline-blocks": "error",
				"jsdoc/no-blank-blocks": "warn",
				"jsdoc/no-defaults": "error",
				"jsdoc/no-multi-asterisks": "error",
				"jsdoc/no-types": "error",
				"jsdoc/require-asterisk-prefix": "error",
				"jsdoc/require-returns-check": "error",
				"jsdoc/require-yields-check": "error",
				"jsdoc/sort-tags": [
					"warn",
					{
						tagSequence: [
							{ tags: ["summary", "description"] },
							{
								tags: [
									"experimental",
									"since",
									"deprecated",
									"module",
									"category",
								],
							},
							{ tags: ["typeparam"] },
							{ tags: ["param", "prop"] },
							{ tags: ["emits", "throws", "yields", "returns"] },
							{ tags: ["see"] },
							{ tags: ["example"] },
						],
						linesBetween: 1,
						reportIntraTagGroupSpacing: true,
					},
				],
				"jsdoc/tag-lines": ["warn", "any", { startLines: 1 }],
				"jsdoc/valid-types": "error",

				"unicorn/better-regex": "warn",
				"unicorn/consistent-empty-array-spread": "error",
				"unicorn/consistent-function-scoping": "warn",
				"unicorn/custom-error-definition": "error",
				"unicorn/explicit-length-check": "error",
				"unicorn/filename-case": "warn",
				"unicorn/new-for-builtins": "error",
				"unicorn/no-array-for-each": "warn",
				"unicorn/no-array-method-this-argument": "error",
				"unicorn/no-array-push-push": "warn",
				"unicorn/no-await-expression-member": "error",
				"unicorn/no-await-in-promise-methods": "error",
				"unicorn/no-console-spaces": "error",
				"unicorn/no-for-loop": "warn",
				"unicorn/no-instanceof-array": "error",
				"unicorn/no-lonely-if": "warn",
				"unicorn/no-new-array": "warn",
				"unicorn/no-object-as-default-parameter": "error",
				"unicorn/no-single-promise-in-promise-methods": "error",
				"unicorn/no-static-only-class": "error",
				"unicorn/no-typeof-undefined": "error",
				"unicorn/no-unnecessary-polyfills": "error",
				"unicorn/no-unreadable-array-destructuring": "warn",
				"unicorn/no-unreadable-iife": "error",
				"unicorn/no-useless-fallback-in-spread": "error",
				"unicorn/no-useless-length-check": "error",
				"unicorn/no-useless-promise-resolve-reject": "error",
				"unicorn/no-useless-spread": "error",
				"unicorn/no-useless-switch-case": "error",
				"unicorn/numeric-separators-style": "error",
				"unicorn/prefer-add-event-listener": "warn",
				"unicorn/prefer-array-find": "error",
				"unicorn/prefer-array-flat": "error",
				"unicorn/prefer-array-flat-map": "warn",
				"unicorn/prefer-array-index-of": "error",
				"unicorn/prefer-array-some": "error",
				"unicorn/prefer-at": "error",
				"unicorn/prefer-blob-reading-methods": "error",
				"unicorn/prefer-code-point": "warn",
				"unicorn/prefer-date-now": "error",
				"unicorn/prefer-default-parameters": "error",
				"unicorn/prefer-dom-node-append": "error",
				"unicorn/prefer-dom-node-dataset": "error",
				"unicorn/prefer-dom-node-remove": "warn",
				"unicorn/prefer-event-target": "error",
				"unicorn/prefer-export-from": "error",
				"unicorn/prefer-includes": "error",
				"unicorn/prefer-keyboard-event-key": "error",
				"unicorn/prefer-logical-operator-over-ternary": "warn",
				"unicorn/prefer-modern-dom-apis": "error",
				"unicorn/prefer-modern-math-apis": "error",
				"unicorn/prefer-native-coercion-functions": "error",
				"unicorn/prefer-negative-index": "error",
				"unicorn/prefer-node-protocol": "error",
				"unicorn/prefer-number-properties": "error",
				"unicorn/prefer-object-from-entries": "error",
				"unicorn/prefer-optional-catch-binding": "error",
				"unicorn/prefer-prototype-methods": "error",
				"unicorn/prefer-query-selector": "error",
				"unicorn/prefer-regexp-test": "error",
				"unicorn/prefer-set-has": "warn",
				"unicorn/prefer-set-size": "error",
				"unicorn/prefer-spread": "error",
				"unicorn/prefer-string-raw": "warn",
				"unicorn/prefer-string-replace-all": "warn",
				"unicorn/prefer-string-slice": "error",
				"unicorn/prefer-string-starts-ends-with": "error",
				"unicorn/prefer-string-trim-start-end": "error",
				"unicorn/prefer-structured-clone": "error",
				"unicorn/prefer-switch": "error",
				"unicorn/prefer-type-error": "error",
				"unicorn/require-array-join-separator": "error",
				"unicorn/require-number-to-fixed-digits-argument": "error",
				"unicorn/switch-case-braces": "error",
				"unicorn/throw-new-error": "error",
			},
		},
		{
			files: ["**/*.ts", "**/*.tsx"],
			extends: [
				...ts.configs.stylisticTypeCheckedOnly,
				...ts.configs.strictTypeCheckedOnly,
			],
		},
		{
			files: ["**/*.tsx", "**/*.jsx"],
			plugins: { "jsx-a11y": a11y, "react-hooks": hooks },
			rules: {
				...a11y.configs.strict.rules,
				...hooks.configs.recommended.rules,
			},
		},
		{
			files: sources.flatMap((s) =>
				["ts", "js", "tsx", "jsx"].map((e) => `${s}/**/*.${e}`),
			),
			rules: {
				"jsdoc/require-jsdoc": [
					"warn",
					{
						publicOnly: true,
						contexts: [
							"ExportNamedDeclaration[declaration]",
							"ExportDefaultDeclaration",
						],
					},
				],
			},
		},
		...configs,
		prettier,
	)
}

/**
 * A default opinionated ESLint configuration for TypeScript projects
 */
export default config()
