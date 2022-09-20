import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

const fixturesCombinations = [
  ['file3', 'file4', '.json', 'expected.stylish.recursivefile.txt'],
  ['file3', 'file4', '.yml', 'expected.stylish.recursivefile.txt'],
  ['file3', 'file4', '.yaml', 'expected.stylish.recursivefile.txt'],
];

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

const fixturesCombinationsJSON = [
  ['file1', 'file2', '.json'],
  ['file1', 'file2', '.yml'],
  ['file1', 'file2', '.yaml'],
  ['file3', 'file4', '.json'],
  ['file3', 'file4', '.yml'],
  ['file3', 'file4', '.yaml'],
];

const wrongFileName = [
  ['file3', 'file5', '.json'],
];

const wrongExtension = [
  ['file3', '.json', 'file4', '.ipg', 'stylish'],
];

const wrongJSON = [
  ['file3', 'file', '.json'],
];

const wrongFomatName = [
  ['file3', 'file4', '.json', 'styl'],
];

describe('Comparing configuration files', () => {
  test.each(fixturesCombinations)(
    'Comparing configuration files %s and %s with %s extension without indication of formatting style',
    (before, after, extension, result) => {
      const initialFile = getFixturePath(before.concat(extension));
      const finalFile = getFixturePath(after.concat(extension));
      const expectedDifference = readFile(result).trim();
      expect(genDiff(initialFile, finalFile)).toEqual(expectedDifference);
    },
  );

  test.each(fixturesCombinations1)(
    'Comparing configuration files %s and %s with %s extension and outputting the result in %s format',
    (before, after, extension, format, result) => {
      const initialFile = getFixturePath(before.concat(extension));
      const finalFile = getFixturePath(after.concat(extension));
      const expectedDifference = readFile(result).trim();
      expect(genDiff(initialFile, finalFile, format)).toEqual(expectedDifference);
    },
  );

  test.each(fixturesCombinationsJSON)(
    'Comparing configuration files %s and %s with %s extension and outputting the result in JSON format',
    (before, after, extension) => {
      const initialFile = getFixturePath(before.concat(extension));
      const finalFile = getFixturePath(after.concat(extension));
      const genJson = genDiff(initialFile, finalFile, 'json');
      expect(() => JSON.parse(genJson)).not.toThrow();
    },
  );
});

describe('Сhecking the program operation with incorrect file name input', () => {
  test.each(wrongFileName)(
    'Сhecking the program operation when a non-existent file name is entered',
    (before, after, extension) => {
      const initialFile = getFixturePath(before.concat(extension));
      const finalFile = getFixturePath(after.concat(extension));
      expect(() => genDiff(initialFile, finalFile)).toThrow();
    },
  );

  test.each(wrongExtension)(
    'Checking the program operation when file has has not-supported extension',
    (before, extension1, after, extension2, format) => {
      const initialFile = getFixturePath(before.concat(extension1));
      const finalFile = getFixturePath(after.concat(extension2));
      expect(() => genDiff(initialFile, finalFile, format)).toThrow();
    },
  );

  test.each(wrongJSON)(
    'Checking the program operation when one of the files has wrong content (non-valid JSON)',
    (before, after, extension) => {
      const initialFile = getFixturePath(before.concat(extension));
      const finalFile = getFixturePath(after.concat(extension));
      expect(() => genDiff(initialFile, finalFile)).toThrow();
    },
  );

  test.each(wrongFomatName)(
    'Сhecking the program operation when entered wrong format name',
    (before, after, extension, format) => {
      const initialFile = getFixturePath(before.concat(extension));
      const finalFile = getFixturePath(after.concat(extension));
      const exp = () => genDiff(initialFile, finalFile, format);
      expect(() => exp()).toThrow();
    },
  );
});
