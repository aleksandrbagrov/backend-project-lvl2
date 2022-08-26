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
const path5 = getFixturePath('file3.json');
const path6 = getFixturePath('file3.yml');
const path7 = getFixturePath('file4.json');
const path8 = getFixturePath('file4.yaml');

test('Flat Files Comparison - json vs json', () => {
  expect(genDiff(path1, path2)).toEqual(readFile('expected.file.txt').trim());
});

test('Flat Files Comparison - yml vs yaml', () => {
  expect(genDiff(path3, path4)).toEqual(readFile('expected.file.txt').trim());
});

test('Flat Files Comparison - json vs yaml', () => {
  expect(genDiff(path1, path4)).toEqual(readFile('expected.file.txt').trim());
});

test('Flat Files Comparison - yml vs json', () => {
  expect(genDiff(path3, path2)).toEqual(readFile('expected.file.txt').trim());
});

test('Files with recursive structure comparison - json vs yaml', () => {
  expect(genDiff(path5, path8)).toBe(readFile('expected.stylish.recursivefile.txt').trim());
});

test('Files with recursive structure comparison - json vs json', () => {
  expect(genDiff(path5, path7)).toEqual(readFile('expected.stylish.recursivefile.txt').trim());
});

test('Files with recursive structure comparison - yml vs yaml', () => {
  expect(genDiff(path6, path8)).toEqual(readFile('expected.stylish.recursivefile.txt').trim());
});

test('Files with recursive structure comparison in plain format - json vs yaml', () => {
  expect(genDiff(path5, path8, 'plain')).toBe(readFile('expected.plain.recursivefile.txt').trim());
});

test('Files with recursive structure comparison in plain format - json vs json', () => {
  expect(genDiff(path5, path7, 'plain')).toEqual(
    readFile('expected.plain.recursivefile.txt').trim()
  );
});

test('Files with recursive structure comparison in plain format - yml vs yaml', () => {
  expect(genDiff(path6, path8, 'plain')).toEqual(
    readFile('expected.plain.recursivefile.txt').trim()
  );
});
