import stylish from './stylish.js';
import plain from './plain.js';

const getFormatter = (obj, formatterName) => {
  try {
    switch (formatterName) {
      case 'plain':
        return plain(obj);
      case 'json':
        return JSON.stringify(obj);
      case 'stylish':
        return stylish(obj, ' ', 2);
      default:
        throw new SyntaxError(`"${formatterName}" format is not supported`);
    }
  } catch(err) {
    return console.log(err.message);
  }
};

export default getFormatter;
