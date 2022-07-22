import _ from 'lodash';
import fs from 'node:fs';
import path from 'node:path';
import parsers from 'parsers.js';

const getObjectFromFile = (filepath) => {
  const pathToFile = path.resolve(process.cwd(), filepath);
  const TextFile = fs.readFileSync(pathToFile, 'utf8');
  const typeOfFile = pathToFile.substring(pathToFile.lastIndexOf('.'));
  return parsers(TextFile, typeOfFile);
};

const genDiff = (filepath1, filepath2) => {
  const obj1 = getObjectFromFile(filepath1);
  const obj2 = getObjectFromFile(filepath2);

  const keysObj1 = Object.keys(obj1);
  const keysObj2 = Object.keys(obj2);
  const diff1 = _.difference(keysObj1, keysObj2);
  const intersection = _.intersection(keysObj1, keysObj2);
  const diff2 = _.difference(keysObj2, keysObj1);
  const resArr = _.sortBy([...diff1, ...intersection, ...diff2]);
  const resObj = resArr.reduce((acc, item) => {
    if (diff1.includes(item)) {
      acc[` - ${item}`] = obj1[item];
      return acc;
    }
    if (diff2.includes(item)) {
      acc[` + ${item}`] = obj2[item];
      return acc;
    }
    if (intersection.includes(item)) {
      if (obj1[item] === obj2[item]) {
        acc[`   ${item}`] = obj1[item];
        return acc;
      } else {
        acc[` - ${item}`] = obj1[item];
        acc[` + ${item}`] = obj2[item];
        return acc;
      }
    }
  }, {});
  const resStr = JSON.stringify(resObj, null, ' ').replace(/[",]/g, '');

  return resStr;
};

export default genDiff;
