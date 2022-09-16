import fs from 'node:fs';
import path from 'node:path';
import parsers from './parsers.js';
import getFormatter from './formatters/index.js';
import createDiffObject from './create_object.js';

const getDoc = (filepath) => {
  const pathToFile = path.resolve(process.cwd(), filepath);
  try {
    const doc = fs.readFileSync(pathToFile, 'utf8');
    return doc;
  } catch {
    return console.log(`File ${pathToFile} does not exist`);
  }
};

const getFileExtension = (filepath) => filepath.substring(filepath.lastIndexOf('.')).slice(1);

const genDiff = (filepath1, filepath2, styleFormat) => {
  const doc1 = getDoc(filepath1);
  const obj1 = parsers(doc1, getFileExtension(filepath1));
  const doc2 = getDoc(filepath2);
  const obj2 = parsers(doc2, getFileExtension(filepath2));

  const resStr = createDiffObject(obj1, obj2);

  return getFormatter(resStr, styleFormat);
};

export default genDiff;
