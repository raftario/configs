import js from "@eslint/js"
import prettier from "eslint-config-prettier"
import deprecation from "eslint-plugin-deprecation"
import a11y from "eslint-plugin-jsx-a11y"
import hooks from "eslint-plugin-react-hooks"
import imports from "eslint-plugin-simple-import-sort"
import tsdoc from "eslint-plugin-tsdoc"
import unicorn from "eslint-plugin-unicorn"
import ts from "typescript-eslint"

const unused = {
	vars: "all",
	args: "all",
	caughtErrors: "all",
	varsIgnorePattern: "^_",
	argsIgnorePattern: "^_",
	destructuredArrayIgnorePattern: "^_",
}

export function config(
	{ src = ["src", "test"], target = ["target", "dist"], ignore = [] } = {},
	...configs: ts.ConfigWithExtends[]
) {
	return ts.config(
		{
			ignores: [...target, ...ignore, "node_modules"].map((dir) => `${dir}/**`),
		},
		{
			files: ["**/*.ts", "**/*.js"],
			extends: [js.configs.recommended],
			plugins: { imports, unicorn },
			rules: {
				"no-unused-vars": ["warn", unused],

				"imports/imports": "warn",
				"imports/exports": "warn",

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
			files: ["**/*.jsx", "**/*.tsx"],
			plugins: { "jsx-a11y": a11y, "react-hooks": hooks },
			rules: {
				...a11y.configs.strict.rules,
				...hooks.configs.recommended.rules,
			},
		},
		{
			files: [
				"**/*.ts",
				"**/*.tsx",
				...src.flatMap((dir) => [`${dir}/**/*.js`, `${dir}/**/*.jsx`]),
			],
			extends: [
				...ts.configs.stylisticTypeChecked,
				...ts.configs.strictTypeChecked,
			],
			plugins: { deprecation, tsdoc },
			languageOptions: {
				parserOptions: {
					EXPERIMENTAL_useProjectService: true,
				},
			},
			rules: {
				"deprecation/deprecation": "error",
				"tsdoc/syntax": "error",

				"@typescript-eslint/consistent-type-imports": [
					"error",
					{ prefer: "type-imports", fixStyle: "separate-type-imports" },
				],
				"@typescript-eslint/no-non-null-assertion": "off",
				"@typescript-eslint/no-unused-vars": ["warn", unused],
			},
		},
		...configs,
		prettier,
	)
}

export default config()
