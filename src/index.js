import _ from 'lodash';
import fs from 'node:fs';
import path from 'node:path';
import parsers from './parsers.js';
import getFormatter from './formatters/index.js';

const getDoc = (filepath) => {
  const pathToFile = path.resolve(process.cwd(), filepath);
  return fs.readFileSync(pathToFile, 'utf8');
};

const getFileExtension = (filepath) => filepath.substring(filepath.lastIndexOf('.'));

const genDiff = (filepath1, filepath2, styleFormat) => {
  const obj1 = parsers(getDoc(filepath1), getFileExtension(filepath1));
  const obj2 = parsers(getDoc(filepath2), getFileExtension(filepath2));

  const iter = (val1, val2 = val1) => {
    const keysObj1 = Object.keys(val1);
    const keysObj2 = Object.keys(val2);

    const diff12 = _.difference(keysObj1, keysObj2);
    const intersection = _.intersection(keysObj1, keysObj2);
    const diff21 = _.difference(keysObj2, keysObj1);

    const resArr = _.sortBy([...diff12, ...intersection, ...diff21]);

    const resObj = resArr.reduce((acc, item) => {
      const newAcc = acc;
      if (diff12.includes(item)) {
        newAcc[`- ${item}`] = _.isObject(val1[item]) ? iter(val1[item]) : val1[item];
        return newAcc;
      }
      if (diff21.includes(item)) {
        newAcc[`+ ${item}`] = _.isObject(val2[item]) ? iter(val2[item]) : val2[item];
        return newAcc;
      }
      if (intersection.includes(item)) {
        if (_.isObject(val1[item]) && _.isObject(val2[item])) {
          newAcc[`  ${item}`] = iter(val1[item], val2[item]);
          return newAcc;
        }
        if (val1[item] === val2[item]) {
          newAcc[`  ${item}`] = val1[item];
          return newAcc;
        }
        newAcc[`- ${item}`] = _.isObject(val1[item]) ? iter(val1[item]) : val1[item];
        newAcc[`+ ${item}`] = _.isObject(val2[item]) ? iter(val2[item]) : val2[item];
        return newAcc;
      }
    }, {});
    return resObj;
  };

  const resStr = iter(obj1, obj2);

  return getFormatter(resStr, styleFormat);
};

export default genDiff;
