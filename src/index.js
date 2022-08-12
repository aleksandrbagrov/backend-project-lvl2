import _ from 'lodash';
import fs from 'node:fs';
import path from 'node:path';
import parsers from './parsers.js';
import stylish from './formatter.js';

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

    const diff1 = _.difference(keysObj1, keysObj2);
    const intersection = _.intersection(keysObj1, keysObj2);
    const diff2 = _.difference(keysObj2, keysObj1);

    const resArr = _.sortBy([...diff1, ...intersection, ...diff2]);

    const resObj = resArr.reduce((acc, item) => {
      if (diff1.includes(item)) {
        acc[`- ${item}`] = _.isObject(val1[item]) ? iter(val1[item]) : val1[item];
        return acc;
      }
      if (diff2.includes(item)) {
        acc[`+ ${item}`] = _.isObject(val2[item]) ? iter(val2[item]) : val2[item];
        return acc;
      }
      if (intersection.includes(item)) {
        if (_.isObject(val1[item]) && _.isObject(val2[item])) {
          acc[`  ${item}`] = iter(val1[item], val2[item]);
          return acc;
        }
        if (val1[item] === val2[item]) {
          acc[`  ${item}`] = val1[item];
          return acc;
        } else {
          acc[`- ${item}`] = _.isObject(val1[item]) ? iter(val1[item]) : val1[item];
          acc[`+ ${item}`] = _.isObject(val2[item]) ? iter(val2[item]) : val2[item];
          return acc;
        }
      }
    }, {});
    return resObj;
  };

  const resStr = (style) => {
    switch (style) {
      case 'json':
        return stylish(iter(obj1, obj2), ' ', 2);
      case 'yml':
        return stylish(iter(obj1, obj2), ' ', 2);
      case 'yaml':
        return stylish(iter(obj1, obj2), ' ', 2);
      default:
        return stylish(iter(obj1, obj2), ' ', 2);
    }
  };
  return resStr(styleFormat);
};

export default genDiff;
