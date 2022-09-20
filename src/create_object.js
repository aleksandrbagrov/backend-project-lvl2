import _ from 'lodash';

const createDiffObject = (obj1, obj2 = obj1) => {
  const keysObj1 = Object.keys(obj1);
  const keysObj2 = Object.keys(obj2);

  const diff12 = _.difference(keysObj1, keysObj2);
  const intersection = _.intersection(keysObj1, keysObj2);
  const diff21 = _.difference(keysObj2, keysObj1);

  const resArr = _.sortBy([...diff12, ...intersection, ...diff21]);

  const resObj = resArr.reduce((acc, item) => {
    if (diff12.includes(item)) {
      const newProperty = {
        [`- ${item}`]: _.isObject(obj1[item]) ? createDiffObject(obj1[item]) : obj1[item],
      };
      const newAcc = { ...acc, ...newProperty };
      return newAcc;
    }
    if (diff21.includes(item)) {
      const newProperty = {
        [`+ ${item}`]: _.isObject(obj2[item]) ? createDiffObject(obj2[item]) : obj2[item],
      };
      const newAcc = { ...acc, ...newProperty };
      return newAcc;
    }
    if (_.isObject(obj1[item]) && _.isObject(obj2[item])) {
      const newProperty = { [`  ${item}`]: createDiffObject(obj1[item], obj2[item]) };
      const newAcc = { ...acc, ...newProperty };
      return newAcc;
    }
    if (obj1[item] === obj2[item]) {
      const newProperty = { [`  ${item}`]: obj1[item] };
      const newAcc = { ...acc, ...newProperty };
      return newAcc;
    }
    const newProperty = {
      [`- ${item}`]: _.isObject(obj1[item]) ? createDiffObject(obj1[item]) : obj1[item],
      [`+ ${item}`]: _.isObject(obj2[item]) ? createDiffObject(obj2[item]) : obj2[item],
    };
    const newAcc = { ...acc, ...newProperty };
    return newAcc;
  }, {});
  return resObj;
};

export default createDiffObject;
