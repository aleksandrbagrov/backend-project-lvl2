import fs from 'node:fs';
import path from 'node:path';
import parsers from './parsers.js';
import getFormatter from './formatters/index.js';
import createDiffObject from './create_object.js';

const absolutePath = (filepath) => path.resolve(process.cwd(), filepath);

const getDoc = (pathToFile) => fs.readFileSync(pathToFile, 'utf8');

const getFileExtension = (filepath) => filepath.substring(filepath.lastIndexOf('.')).slice(1);

const genDiff = (filepath1, filepath2, styleFormat = 'stylish') => {
  const absolutePath1 = absolutePath(filepath1);
  const doc1 = getDoc(absolutePath1);
  const obj1 = parsers(doc1, getFileExtension(filepath1));
  const absolutePath2 = absolutePath(filepath2);
  const doc2 = getDoc(absolutePath2);
  const obj2 = parsers(doc2, getFileExtension(filepath2));

  const diffObject = createDiffObject(obj1, obj2);

  return getFormatter(diffObject, styleFormat);
};

export default genDiff;
