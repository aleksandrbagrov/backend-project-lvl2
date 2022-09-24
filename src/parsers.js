import yaml from 'js-yaml';

const parse = (doc, dataFormat) => {
  switch (dataFormat) {
    case 'json':
      return JSON.parse(doc);
    case 'yml':
      return yaml.load(doc);
    case 'yaml':
      return yaml.load(doc);
    default:
      throw new SyntaxError(`Data format "${dataFormat}" is not supported`);
  }
};

export default parse;
