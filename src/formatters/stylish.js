const stylish = (object, replacer = ' ', spaceCount = 1) => {
  const iter = (currObj, depth) => {
    if (typeof currObj !== 'object' || currObj === null) {
      return `${currObj}`;
    }
    const indentSize = spaceCount * (2 * depth - 1);
    const indent = replacer.repeat(indentSize);
    const bracketIndent = replacer.repeat(2 * spaceCount * (depth - 1));
    const entries = Object.entries(currObj);
    const line = entries.reduce((acc, [key, value]) => {
      const { data, newData, type } = value;
      if (type === 'added') {
        return [...acc,`${indent}+ ${key}: ${iter(data, depth + 1)}`];
      }
      if (type === 'deleted') {
        return [...acc, `${indent}- ${key}: ${iter(data, depth + 1)}`];
      }
      if (type === 'nested') {
        return [...acc, `${indent}  ${key}: ${iter(data, depth + 1)}`];
      }
      if (type === 'changed') {
        const val1 = `${indent}- ${key}: ${iter(data, depth + 1)}`;
        const val2 = `${indent}+ ${key}: ${iter(newData, depth + 1)}`;
        return [...acc, val1, val2];
      }
      if (type === 'unchanged') {
        return [...acc, `${indent}  ${key}: ${iter(data, depth + 1)}`];
      }
      return acc;
    }, []);
    return ['{', ...line, bracketIndent, '}'].join('\n');
  };
  return iter(object, 1);
};

export default stylish;
