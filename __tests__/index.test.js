import { test, expect } from '@jest/globals';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');
const path1 = getFixturePath('file1.json');
const path2 = getFixturePath('file2.json');

test('Comparison', () => {
  expect(genDiff(path1, path2)).toEqual(readFile('expected.file.txt').trim());
});
