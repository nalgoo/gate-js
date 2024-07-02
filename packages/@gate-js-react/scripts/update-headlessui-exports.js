import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createRequire } from 'module';

const dir = path.dirname(fileURLToPath(import.meta.url));
const packageJsonPath = path.join(dir, '..', 'node_modules', '@headlessui', 'react', 'package.json');
const require = createRequire(import.meta.url);
const packageJson = require(packageJsonPath);

packageJson.exports = {
	'.': {
		import: './dist/headlessui.esm.js',
		require: './dist/index.cjs',
		types: './dist/index.d.ts',
	},
	'./dist/hooks/*': {
		import: './dist/hooks/*.js',
		types: './dist/hooks/*.d.ts',
	},
	'./dist/utils/*': {
		import: './dist/utils/*.js',
		types: './dist/utils/*.d.ts',
	},
};
fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
