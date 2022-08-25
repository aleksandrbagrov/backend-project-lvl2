import _ from 'lodash';

const getFormattedValue = (value) => {
  _.isObject(value) ? '[complex value]' : value;
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
    const pathKey = keyPath;
    const entries = Object.entries(currObj);
    const resEntries = entries.reduce((acc, item, i) => {
      if (i + 1 < entries.length && item[0].slice(2) === entries[i + 1][0].slice(2)) {
        acc.push(entries.slice(i, i + 2));
        return acc;
      } else {
        acc.push(entries[i]);
        return acc;
      }
    }, []);
    console.log(`Res Entries : `);
    console.log(resEntries);
    /*const resEntries = [];
    let i = 0;
    do {
      if (i + 1 < entries.length && entries[i][0].slice(2) === entries[i + 1][0].slice(2)) {
        resEntries.push(entries.slice(i, i + 2));
        i += 2;
      } else {
        resEntries.push(entries[i]);
        i += 1;
      }
    } while (i < entries.length);*/

    const line = resEntries.reduce((acc, [key, value]) => {
      const currentKey = Array.isArray(key) ? key[0].slice(2) : key.slice(2);
      pathKey.push(currentKey);
      if (!Array.isArray(key)) {
        if (key.startsWith(' ')) {
          _.isObject(value) ? acc.push(iter(value, pathKey)) : '';
          pathKey.pop();
          return acc;
        }
        if (key.startsWith('-')) {
          acc.push(`Property \x1b[0;31m'${pathKey.join('.')}'\x1b[0m was removed`);
          pathKey.pop();
          return acc;
        }
        if (key.startsWith('+')) {
          acc.push(
            `Property \x1b[0;31m'${pathKey.join(
              '.'
            )}'\x1b[0m was added with value: ${getFormattedValue(value)}`
          );
          pathKey.pop();
          return acc;
        }
      }
      if (Array.isArray(key)) {
        acc.push(
          `Property \x1b[0;31m'${pathKey.join('.')}'\x1b[0m was updated. From ${getFormattedValue(
            key[1]
          )} to ${getFormattedValue(value[1])}`
        );
        pathKey.pop();
        return acc;
      }
    }, []);

    return line.join('\n');
  };

  return iter(object, []);
};

export default plain;
