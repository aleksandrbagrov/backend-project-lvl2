import _ from 'lodash';

const getFormattedValue = (value) => {
  if (typeof value === 'string' && value !== '[complex value]') {
    return `\x1b[0;31m'${value}'\x1b[0m`;
  } else if (typeof value === 'boolean') {
    return `\x1b[34m${value}\x1b[0m`;
  } else {
    return value;
  }
};

const plain = (object) => {
  const iter = (currObj, keyPath) => {
    //if (typeof currObj !== 'object' || currObj === null) {
    //  return `${currObj}`;
    //}
    let pathKey = keyPath;
    let prevPathKey = pathKey;
    const entries = Object.entries(currObj);
    const resEntries = [];
    let i = 0;
    do {
      if (i + 1 < entries.length && entries[i][0].slice(2) === entries[i + 1][0].slice(2)) {
        resEntries.push(entries.slice(i, i + 2));
        i += 2;
      } else {
        resEntries.push(entries[i]);
        i += 1;
      }
    } while (i < entries.length);

    const line = resEntries.reduce((acc, [key, value]) => {
      const currentKey = Array.isArray(key) ? key[0].slice(2) : key.slice(2);
      pathKey += pathKey !== '' ? '.' + currentKey : currentKey;
      if (!Array.isArray(key) && key.startsWith(' ')) {
        _.isObject(value) ? acc.push(iter(value, pathKey)) : '';
        pathKey = prevPathKey;
        return acc;
      }
      if (!Array.isArray(key) && key.startsWith('-')) {
        acc.push(`Property \x1b[0;31m'${pathKey}'\x1b[0m was removed`);
        pathKey = prevPathKey;
        return acc;
      }
      if (!Array.isArray(key) && key.startsWith('+')) {
        const valueAdd = _.isObject(value) ? '[complex value]' : value;
        acc.push(
          `Property \x1b[0;31m'${pathKey}'\x1b[0m was added with value: ${getFormattedValue(
            valueAdd
          )}`
        );
        pathKey = prevPathKey;
        return acc;
      }
      if (Array.isArray(key)) {
        const valueFrom = _.isObject(key[1]) ? '[complex value]' : key[1];
        const valueTo = _.isObject(value[1]) ? '[complex value]' : value[1];
        acc.push(
          `Property \x1b[0;31m'${pathKey}'\x1b[0m was updated. From ${getFormattedValue(
            valueFrom
          )} to ${getFormattedValue(valueTo)}`
        );
        pathKey = prevPathKey;
        return acc;
      }
    }, []);

    return line.join('\n');
  };

  return iter(object, '');
};

export default plain;
