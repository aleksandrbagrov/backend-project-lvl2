import yaml from 'js-yaml';

const parsers = (doc, extension) => {
  switch (extension) {
    case '.json':
      return JSON.parse(doc);
    case '.yml':
      return yaml.load(doc);
    default:
      return yaml.load(doc);
  }
};

export default parsers;
