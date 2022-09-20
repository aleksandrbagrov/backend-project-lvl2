import stylish from './stylish.js';
import plain from './plain.js';

const getFormatter = (diffObject, formatName) => {
  switch (formatName) {
    case 'plain':
      return plain(diffObject);
    case 'json':
      return JSON.stringify(diffObject);
    case 'stylish':
      return stylish(diffObject, ' ', 2);
    default:
      throw new SyntaxError(`"${formatName}" format is not supported`);
  }
};

export default getFormatter;
