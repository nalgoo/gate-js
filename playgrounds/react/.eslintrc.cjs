module.exports = {
	root: true,
	extends: [
		'nalgoo-typescript',
		'plugin:react/jsx-runtime'
	],
	overrides: [{
		files: 'src/**/*.tsx',
		rules: {
			'react/jsx-props-no-spreading': [1, { html: 'ignore' }],
		},
	}, {
		files: 'src/**/*.{ts,tsx}',
		rules: {
			'import/prefer-default-export': 0,
			'import/extensions': ['error', 'never'],
		},
	}],
	env: {
		browser: true,
	},
	parserOptions: {
		project: ['./tsconfig.json'],
	},
	ignorePatterns: ['**/*.draft.*'],
};
