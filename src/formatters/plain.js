import _ from 'lodash';

const getFormattedValue = (value) => {
  const formattedValue = _.isObject(value) ? '[complex value]' : value;
  if (typeof formattedValue === 'string' && formattedValue !== '[complex value]') {
    return `'${formattedValue}'`;
  }
  return formattedValue;
};

const plain = (object) => {
  const iter = (currObj, keyPath) => {
    const pathKey = keyPath;

    const entries = Object.entries(currObj);

    const resEntries = entries.reduce((acc, item, i) => {
      if (i + 1 < entries.length && item[0].slice(2) === entries[i + 1][0].slice(2)) {
        acc.push(entries.slice(i, i + 2));
        entries.splice(i + 1, 1);
        return acc;
      } else {
        acc.push(entries[i]);
        return acc;
      }
    }, []);

    const linesArr = resEntries.reduce((acc, [key, value]) => {
      const currentKey = Array.isArray(key) ? key[0].slice(2) : key.slice(2);
      pathKey.push(currentKey);
      const path = pathKey.join('.');
      if (!Array.isArray(key)) {
        if (key.startsWith(' ')) {
          if (_.isObject(value)) {
            acc.push(iter(value, pathKey));
          }
          pathKey.pop();
          return acc;
        }
        if (key.startsWith('-')) {
          acc.push(`Property ${getFormattedValue(path)} was removed`);
          pathKey.pop();
          return acc;
        }
        if (key.startsWith('+')) {
          acc.push(
            `Property ${getFormattedValue(path)} was added with value: ${getFormattedValue(value)}`
          );
          pathKey.pop();
          return acc;
        }
      }
      if (Array.isArray(key)) {
        acc.push(
          `Property ${getFormattedValue(path)} was updated. From ${getFormattedValue(
            key[1]
          )} to ${getFormattedValue(value[1])}`
        );
        pathKey.pop();
        return acc;
      }
    }, []);

    return linesArr.join('\n');
  };

  return iter(object, []);
};

export default plain;
