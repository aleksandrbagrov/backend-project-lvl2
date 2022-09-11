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
      // console.log(`acc      = ${acc}`);
      // console.log(`Entry  i = ${item}`);
      // console.log(`Enty i+1 = ${entries[i + 1]}`);
      if (i + 1 < entries.length && item[0].slice(2) === entries[i + 1][0].slice(2)) {
        // const newAcc = acc.concat(entries[i], entries[i + 1]);
        // console.log(`newAcc = ${newAcc}`);
        // const newAcc = acc.concat(entries.slice(i, i + 2));
        acc.push(entries.slice(i, i + 2));
        entries.splice(i + 1, 1);
        return acc;
        // return newAcc;
      }
      // const newAcc1 = acc.concat(item);
      // console.log(`newAcc = ${newAcc1}`);
      acc.push(item);
      return acc;
      // return newAcc1;
    }, []);

    // console.log(`ResEntries = ${JSON.stringify(resEntries)}`);
    // console.log(typeof resEntries);

    const linesArr = resEntries.reduce((acc, [key, value]) => {
      const currentKey = Array.isArray(key) ? key[0].slice(2) : key.slice(2);
      pathKey.push(currentKey);
      const path = pathKey.join('.');
      if (!Array.isArray(key)) {
        if (key.startsWith(' ')) {
          if (_.isObject(value)) {
            acc.push(iter(value, pathKey));
          }
        }
        if (key.startsWith('-')) {
          acc.push(`Property ${getFormattedValue(path)} was removed`);
        }
        if (key.startsWith('+')) {
          acc.push(
            `Property ${getFormattedValue(path)} was added with value: ${getFormattedValue(value)}`
          );
        }
      }
      if (Array.isArray(key)) {
        acc.push(
          `Property ${getFormattedValue(path)} was updated. From ${getFormattedValue(
            key[1]
          )} to ${getFormattedValue(value[1])}`
        );
      }
      pathKey.pop();
      return acc;
    }, []);

    return linesArr.join('\n');
  };

  return iter(object, []);
};

export default plain;
