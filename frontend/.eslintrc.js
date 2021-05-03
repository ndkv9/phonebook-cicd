module.exports = {
	env: {
		node: true,
		browser: true,
		es6: true,
	},
	extends: ['eslint:recommended', 'plugin:react/recommended'],
	parserOptions: {
		ecmaFeatures: {
			jsx: true,
		},
		ecmaVersion: 2018,
		sourceType: 'module',
	},
	plugins: ['react'],
	rules: {
		indent: 0,
		'linebreak-style': ['error', 'unix'],
		quotes: ['error', 'single'],
		semi: ['error', 'never'],
		eqeqeq: 'error',
		'no-trailing-spaces': 'error',
		'no-mixed-spaces-and-tabs': 0,
		'no-console': 'error',
		'object-curly-spacing': ['error', 'always'],
		'arrow-spacing': ['error', { before: true, after: true }],
		'react/prop-types': 0,
	},
	root: true,
}
