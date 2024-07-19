module.exports = {
	root: true,
	env: {browser: true, es2019: true},
	extends: [
		'nalgoo-typescript',
		'plugin:react/jsx-runtime'
	],
	overrides: [{
		files: 'src/**/*.{ts,tsx}',
		rules: {
			'import/prefer-default-export': 0,
		},
	}],
	ignorePatterns: ['dist', '.eslintrc.cjs', 'src/utils/match.ts', 'src/utils/render.ts', 'src/utils/types.ts'],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		project: ['./tsconfig.json'],
	}
};
