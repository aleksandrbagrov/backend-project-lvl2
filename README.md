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
  -f, --format <type>  output format (choice: "stylish", "plain", "json") (default: "stylish")
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
[![asciicast](https://asciinema.org/a/UkA9UaCjqlAxF5dU4Coo8UN0Y.svg)](https://asciinema.org/a/UkA9UaCjqlAxF5dU4Coo8UN0Y)
### The result of the program on the example of two flat (only key-value) yml(yaml) files: https://asciinema.org/a/0czjwAnoj4GY2Ae5vJLKQqo1C
[![asciicast](https://asciinema.org/a/0czjwAnoj4GY2Ae5vJLKQqo1C.svg)](https://asciinema.org/a/0czjwAnoj4GY2Ae5vJLKQqo1C)
### Example of generation of differences for files with nested structures in stylish format: https://asciinema.org/a/ivZcfFDEpMaZliVg2OL4RPB6q
[![asciicast](https://asciinema.org/a/ivZcfFDEpMaZliVg2OL4RPB6q.svg)](https://asciinema.org/a/ivZcfFDEpMaZliVg2OL4RPB6q)
### Example of generation of differences for files with nested structures in plain format: https://asciinema.org/a/Qz3g9eof2GYwwJaqCLvQJVOyC
[![asciicast](https://asciinema.org/a/Qz3g9eof2GYwwJaqCLvQJVOyC.svg)](https://asciinema.org/a/Qz3g9eof2GYwwJaqCLvQJVOyC)
### Example of generation of differences for files with nested structures in json format: https://asciinema.org/a/g6mXSLpfjqNvqVIgnmEnhbiOX
[![asciicast](https://asciinema.org/a/g6mXSLpfjqNvqVIgnmEnhbiOX.svg)](https://asciinema.org/a/g6mXSLpfjqNvqVIgnmEnhbiOX)
