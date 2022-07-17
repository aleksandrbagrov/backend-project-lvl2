import _ from 'lodash';
import fs from 'node:fs';
import path from 'node:path';

const getObjectFromJson = (filepath) => {
  const pathToFile = path.resolve(process.cwd(), filepath);
  const jsonTextFile = fs.readFileSync(pathToFile, 'utf8');
  return JSON.parse(jsonTextFile);
};

const genDiff = (filepath1, filepath2) => {
  const obj1 = getObjectFromJson(filepath1);
  const obj2 = getObjectFromJson(filepath2);

  const keysObj1 = Object.keys(obj1);
  const keysObj2 = Object.keys(obj2);
  const diff1 = _.difference(keysObj1, keysObj2);
  const intersection = _.intersection(keysObj1, keysObj2);
  const diff2 = _.difference(keysObj2, keysObj1);
  const resArr = _.sortBy([...diff1, ...intersection, ...diff2]);
  const resStr = resArr.reduce((acc, item) => {
    if (diff1.includes(item)) {
      acc = acc + `  - ${item}: ${obj1[item]}\n`;
      return acc;
    }
    if (diff2.includes(item)) {
      acc = acc + `  + ${item}: ${obj2[item]}\n`;
      return acc;
    }
    if (intersection.includes(item)) {
      if (obj1[item] === obj2[item]) {
        acc = acc + `    ${item}: ${obj1[item]}\n`;
        return acc;
      } else {
        acc = acc + `  - ${item}: ${obj1[item]}\n`;
        acc = acc + `  + ${item}: ${obj2[item]}\n`;
        return acc;
      }
    }
  }, '');

  return `{\n${resStr}}`;
};

export default genDiff;
