import yaml from 'js-yaml';

const parsers = (doc, extension) => {
  try {
    switch (extension) {
      case 'json':
        return JSON.parse(doc);
      case 'yml':
        return yaml.load(doc);
      case 'yaml':
        return yaml.load(doc);
      default:
        throw new SyntaxError(`"${extension}" format is not supported`);
    }
  } catch (err) {
    return console.log(err.message);
  }
};

export default parsers;
