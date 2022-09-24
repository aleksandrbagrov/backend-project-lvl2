import fs from 'node:fs';
import path from 'node:path';
import parse from './parsers.js';
import getFormatted from './formatters/index.js';
import createDiffObject from './treeBuilder';

const getDoc = (filepath) => {
  const absolutePath = path.resolve(process.cwd(), filepath);
  return fs.readFileSync(absolutePath, 'utf8');
};

const getFileExtension = (filepath) => filepath.substring(filepath.lastIndexOf('.')).slice(1);

const genDiff = (filepath1, filepath2, styleFormat = 'stylish') => {
  const doc1 = getDoc(filepath1);
  const doc1ToObj = parse(doc1, getFileExtension(filepath1));
  const doc2 = getDoc(filepath2);
  const doc2ToObj = parse(doc2, getFileExtension(filepath2));

  const obj1_2DiffObj = createDiffObject(doc1ToObj, doc2ToObj);

  return getFormatted(obj1_2DiffObj, styleFormat);
};

export default genDiff;
