const formatter = (object, replacer = ' ', spaceCount = 1) => {
  //let initialindent = replacer.repeat(spaceCount)
  let initialindent = '';
  const iter = (currObj, depth, dent) => {
    if (typeof currObj !== 'object' || currObj === null) {
      return `${currObj}`;
    }
    const indentSize = depth * spaceCount;
    const indent = dent + replacer.repeat(indentSize);
    const bracketIndent = dent + replacer.repeat(indentSize - 2);
    const line = entries.map(
      ([key, value]) => `${indent}${key}: ${iter(value, depth + 1, indent)}`
    );
    return [`{`, ...line, `${bracketIndent}}`].join('\n');
  };
  return iter(object, 1, initialindent);
};

export default formatter;
