const stylish = (object, replacer = ' ', spaceCount = 1) => {
  const iter = (currObj, depth) => {
    if (typeof currObj !== 'object' || currObj === null) {
      return `${currObj}`;
    }
    const indentSize = spaceCount * (2 * depth - 1);
    const indent = replacer.repeat(indentSize);
    const bracketIndent = replacer.repeat(2 * spaceCount * (depth - 1));
    const entries = Object.entries(currObj);
    const line = entries.map(([key, value]) => `${indent}${key}: ${iter(value, depth + 1)}`);
    return ['{', ...line, `${bracketIndent}}`].join('\n');
  };
  return iter(object, 1);
};

export default stylish;
