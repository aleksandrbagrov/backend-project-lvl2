import _ from 'lodash';
import fs from 'node:fs';
import path from 'node:path';

const genDiff = (filepath1, filepath2) => {
  const pathToFile1 = path.resolve(process.cwd(), filepath1);
  const jsonTextFile1 = fs.readFileSync(pathToFile1, 'utf8');
  const obj1 = JSON.parse(jsonTextFile1);

  const pathToFile2 = path.resolve(process.cwd(), filepath2);
  const jsonTextFile2 = fs.readFileSync(pathToFile2, 'utf8');
  const obj2 = JSON.parse(jsonTextFile2);

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

  const resDiff = `{\n${resStr}}`;
  return resDiff;
};

export default genDiff;
