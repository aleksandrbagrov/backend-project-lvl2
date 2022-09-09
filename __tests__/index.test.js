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

const fixturesCombinations1 = [
  ['file1', 'file2', '.json', 'stylish', 'expected.file.txt'],
  ['file1', 'file2', '.yml', 'stylish', 'expected.file.txt'],
  ['file1', 'file2', '.yaml', 'stylish', 'expected.file.txt'],
  ['file3', 'file4', '.json', 'stylish', 'expected.stylish.recursivefile.txt'],
  ['file3', 'file4', '.yml', 'stylish', 'expected.stylish.recursivefile.txt'],
  ['file3', 'file4', '.yaml', 'stylish', 'expected.stylish.recursivefile.txt'],
  ['file3', 'file4', '.json', 'plain', 'expected.plain.recursivefile.txt'],
  ['file3', 'file4', '.yml', 'plain', 'expected.plain.recursivefile.txt'],
  ['file3', 'file4', '.yaml', 'plain', 'expected.plain.recursivefile.txt'],
];

const fixturesCombinations2 = [
  ['file1', 'file2', '.json', 'json'],
  ['file1', 'file2', '.yml', 'json'],
  ['file1', 'file2', '.yaml', 'json'],
  ['file3', 'file4', '.json', 'json'],
  ['file3', 'file4', '.yml', 'json'],
  ['file3', 'file4', '.yaml', 'json'],
];

describe('Comparing configuration files', () => {
  test.each(fixturesCombinations1)(
    'Comparing configuration files %s and %s in %s format and outputting the result in %s format',
    (before, after, extension, format, result) => {
      const initialFile = getFixturePath(before.concat(extension));
      const finalFile = getFixturePath(after.concat(extension));
      const expectedDifference = readFile(result).trim();
      expect(genDiff(initialFile, finalFile, format)).toEqual(expectedDifference);
    }
  );

  test.each(fixturesCombinations2)(
    'Comparing configuration files %s and %s in %s format and outputting the result in %s format',
    (before, after, extension) => {
      const initialFile = getFixturePath(before.concat(extension));
      const finalFile = getFixturePath(after.concat(extension));
      const genJson = genDiff(initialFile, finalFile, 'json');
      expect(() => JSON.parse(genJson)).not.toThrow();
    }
  );
});
