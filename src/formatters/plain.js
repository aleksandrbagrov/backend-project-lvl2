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

    const linesArr = entries.reduce((acc, [key, value]) => {
      const currentKey = key;
      const { data, newData, type } = value;
      const newPathKey = `${pathKey}.${currentKey}`;

      switch (type) {
        case 'added':
          return [
            ...acc,
            `Property ${getFormattedValue(
              newPathKey.slice(1),
            )} was added with value: ${getFormattedValue(data)}`,
          ];
        case 'deleted':
          return [...acc, `Property ${getFormattedValue(newPathKey.slice(1))} was removed`];
        case 'changed':
          return [
            ...acc,
            `Property ${getFormattedValue(newPathKey.slice(1))} was updated. From ${getFormattedValue(
              data,
            )} to ${getFormattedValue(newData)}`,
          ];
        case 'nested':
          return [...acc, iter(data, newPathKey)];
        default:
          return acc;
      }
    }, []);

    return linesArr.join('\n');
  };

  return iter(object, '');
};

export default plain;
