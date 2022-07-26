import _ from 'lodash';
import fs from 'node:fs';
import path from 'node:path';
import parsers from './parsers.js';

const getDoc = (filepath) => {
  const pathToFile = path.resolve(process.cwd(), filepath);
  return fs.readFileSync(pathToFile, 'utf8');
};

const getFileExtension = (filepath) => filepath.substring(filepath.lastIndexOf('.'));

const genDiff = (filepath1, filepath2) => {
  const obj1 = parsers(getDoc(filepath1), getFileExtension(filepath1));
  const obj2 = parsers(getDoc(filepath2), getFileExtension(filepath2));

  const iter = (val1, val2) => {
    const keysObj1 = Object.keys(obj1);
    console.log(keysObj1);
    const keysObj2 = Object.keys(obj2);
    console.log(keysObj2);
    const diff1 = _.difference(keysObj1, keysObj2);
    console.log(diff1);
    const intersection = _.intersection(keysObj1, keysObj2);
    console.log(intersection);
    const diff2 = _.difference(keysObj2, keysObj1);
    console.log(diff2);
    const resArr = _.sortBy([...diff1, ...intersection, ...diff2]); //, ([k, v]) => [k]);
    console.log(resArr);

    const resObj = resArr.reduce((acc, item) => {
      if (diff1.includes(item)) {
        console.log(`Item: ${item} with value: ${obj1[item]}`);
        acc[`- ${item}`] = obj1[item];
        return acc;
      }
      if (diff2.includes(item)) {
        acc[`+ ${item}`] = obj2[item];
        return acc;
      }
      if (intersection.includes(item)) {
        if (!_.isObject(obj1[item]) && !_.isObject(obj1[item])) {
          if (obj1[item] === obj2[item]) {
            acc[`  ${item}`] = obj1[item];
            return acc;
          } else {
            acc[`- ${item}`] = obj1[item];
            acc[`+ ${item}`] = obj2[item];
            return acc;
          }
        }
      }
    }, {});
    return resObj;
  };
  //iter(obj1, obj2);

  const resStr = JSON.stringify(iter(obj1, obj2), null, '  ').replace(/[",]/g, '');

  return resStr;
};

export default genDiff;
