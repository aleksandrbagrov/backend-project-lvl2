const stringify = (object, replacer = ' ', spaceCount = 1) => {
  let resStr = '';
  let inclusive = replacer.repeat(spaceCount);
  const objstringify = (object) => {
    const entries = Object.keys(object);
    resStr = entries.reduce((acc, key) => {
      acc += `${inclusive}${key}: `;
      if (typeof object[key] === 'object' && object[key] !== null && !Array.isArray(object[key])) {
        const prev = inclusive;
        inclusive += replacer.repeat(spaceCount);
        objstringify(object[key], inclusive, 1);
        const tempRes = `{\n${resStr}${prev}}\n`;
        acc += tempRes;
      } else {
        acc += `${object[key]}\n`;
      }
      return acc;
    }, '');
    return resStr;
  };
  if (typeof object === 'object' && object !== null && !Array.isArray(object)) {
    objstringify(object, replacer, spaceCount);
    const finStr = `{\n${resStr}}`;
    return finStr;
  }
  resStr = object.toString();
  return resStr;
};

export default stringify;
