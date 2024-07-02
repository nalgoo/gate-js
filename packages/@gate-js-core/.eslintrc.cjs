module.exports = {
	extends: [
		'nalgoo-typescript',
	],
	overrides: [{
		files: 'src/**/*.{ts,tsx}',
		rules: {
			'import/prefer-default-export': 0,
		},
	}],
	env: {
		browser: true,
	},
	parserOptions: {
		project: ['./tsconfig.json'],
	},
};
