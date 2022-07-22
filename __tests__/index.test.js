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
const path3 = getFixturePath('file1.yml');
const path4 = getFixturePath('file2.yaml');

test('Comparison json vs json', () => {
  expect(genDiff(path1, path2)).toEqual(readFile('expected.file.txt').trim());
});

test('Comparison yml vs yaml', () => {
  expect(genDiff(path3, path4)).toEqual(readFile('expected.file.txt').trim());
});

test('Comparison json vs yaml', () => {
  expect(genDiff(path1, path4)).toEqual(readFile('expected.file.txt').trim());
});

test('Comparison yml vs json', () => {
  expect(genDiff(path3, path2)).toEqual(readFile('expected.file.txt').trim());
});
