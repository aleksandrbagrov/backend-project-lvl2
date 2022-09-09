import stylish from './stylish.js';
import plain from './plain.js';

const getFormatter = (obj, formatterName) => {
  switch (formatterName) {
    case 'plain':
      return plain(obj);
    case 'json':
      return JSON.stringify(obj);
    default:
      return stylish(obj, ' ', 2);
  }
};

export default getFormatter;
