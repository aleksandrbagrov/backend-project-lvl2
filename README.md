# Hexlet tests and linter status:
[![Actions Status](https://github.com/aleksandrbagrov/backend-project-lvl2/workflows/hexlet-check/badge.svg)](https://github.com/aleksandrbagrov/backend-project-lvl2/actions)
[![Maintainability](https://api.codeclimate.com/v1/badges/d873ae4e5634990fb853/maintainability)](https://codeclimate.com/github/aleksandrbagrov/backend-project-lvl2/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/d873ae4e5634990fb853/test_coverage)](https://codeclimate.com/github/aleksandrbagrov/backend-project-lvl2/test_coverage)
![Node CI](https://github.com//aleksandrbagrov/backend-project-lvl2/actions/workflows/project_CI.yml/badge.svg)

# Description

CLI program to display differences between two configuration files in different formats (json, yml, yaml).

Stack: Node.js, Commander.js, Lodash, npm, JEST, ESLint, Git, GitHub.

# Installation

```sh
$$ git clone git@github.com:aleksandrbagrov/backend-project-lvl2.git

$ cd backend-project-lvl2

$ make install
```

# Run tests

```sh
$ make test
```

# Usage

This utility can be used as a script in the terminal or a library in a project.

```sh
$ gendiff -h
Usage: gendiff [options] <filepath1> <filepath2>

Compares two configuration files and shows a difference.

Options:
  -V, --version        output the version number
  -f, --format <type>  output format (choice: stylish, plain, json   default: stylish)
  -h, --help           output usage information
```

# Use in a project

```sh
import genDiff from '@hexlet/code';
const diff = genDiff(filepath1, filepath2, format);
console.log(diff);
```

# Demonstration of the work 

### The result of the program on the example of two flat (only key-value) json files: https://asciinema.org/a/UkA9UaCjqlAxF5dU4Coo8UN0Y
![Asciinema - genDiff on the example of two plain (only key-value) json files](https://user-images.githubusercontent.com/101454330/175929374-4dae58d0-3c3d-4af2-946e-7e66d7d6f066.png)
### The result of the program on the example of two flat (only key-value) yml(yaml) files: https://asciinema.org/a/0czjwAnoj4GY2Ae5vJLKQqo1C
![Asciinema - genDiff on the example of two plain (only key-value) yml(yaml) files](https://user-images.githubusercontent.com/101454330/180446379-e4e9ced6-274c-4497-ae89-392ba3570ac9.png)
### Example of generation of differences for files with nested structures in stylish format: https://asciinema.org/a/ivZcfFDEpMaZliVg2OL4RPB6q
![Asciinema - Example of generation of differences for files with nested structures](https://user-images.githubusercontent.com/101454330/184117179-ff504444-0db3-43f8-a2ee-60fa6fbb7247.png)
### Example of generation of differences for files with nested structures in plain format: https://asciinema.org/a/Qz3g9eof2GYwwJaqCLvQJVOyC
![Asciinema - genDiff of two recursive json files in plain formatt](https://user-images.githubusercontent.com/101454330/186977617-9c99f65a-e238-4c93-9806-f6df8ceb0568.png)
### Example of generation of differences for files with nested structures in json format: https://asciinema.org/a/g6mXSLpfjqNvqVIgnmEnhbiOX
![Asciinema - genDiff of two recursive json files in json format](https://user-images.githubusercontent.com/101454330/189376774-c5998f8b-97f9-48e7-b7d7-15d4b9337427.png)
