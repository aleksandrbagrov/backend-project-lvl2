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
      const value = _.isObject(obj1[item]) ? createDiffObject(obj1[item]) : obj1[item];
      const newProperty = { [`${item}`]: { data: value, type: 'deleted' } };
      const newAcc = { ...acc, ...newProperty };
      return newAcc;
    }
    if (diff21.includes(item)) {
      const value = _.isObject(obj2[item]) ? createDiffObject(obj2[item]) : obj2[item];
      const newProperty = { [`${item}`]: { data: value, type: 'added' } };
      const newAcc = { ...acc, ...newProperty };
      return newAcc;
    }
    if (_.isObject(obj1[item]) && _.isObject(obj2[item])) {
      const value = createDiffObject(obj1[item], obj2[item]);
      const newProperty = { [`${item}`]: { data: value, type: 'nested' } };
      const newAcc = { ...acc, ...newProperty };
      return newAcc;
    }
    if (obj1[item] === obj2[item]) {
      const value = obj1[item];
      const newProperty = { [`${item}`]: { data: value, type: 'unchanged' } };
      const newAcc = { ...acc, ...newProperty };
      return newAcc;
    }
    const value = _.isObject(obj1[item]) ? createDiffObject(obj1[item]) : obj1[item];
    const newValue = _.isObject(obj2[item]) ? createDiffObject(obj2[item]) : obj2[item];
    const newProperty = { [`${item}`]: { data: value, newData: newValue, type: 'changed' } };
    const newAcc = { ...acc, ...newProperty };
    return newAcc;
  }, {});
  return resObj;
};

export default createDiffObject;
