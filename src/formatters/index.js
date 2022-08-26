import stylish from './stylish.js';
import plain from './plain.js';

const getFormatter = (str, formatterName) => {
  switch (formatterName) {
    case 'plain':
      return plain(str);
    default:
      return stylish(str, ' ', 2);
  }
};

export default getFormatter;
