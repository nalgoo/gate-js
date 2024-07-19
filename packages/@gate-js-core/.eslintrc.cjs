module.exports = {
	root: true,
	extends: [
		'nalgoo-typescript',
	],
	overrides: [{
		files: 'src/**/*.{ts,tsx}',
		rules: {
			'import/prefer-default-export': 0,
		},
	}],
	ignorePatterns: ['dist', '.eslintrc.cjs'],
	env: { browser: true, es2019: true },
	parser: '@typescript-eslint/parser',
	parserOptions: {
		project: ['./tsconfig.json'],
	},
};
