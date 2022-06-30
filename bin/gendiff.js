#!/usr/bin/env node

import { Command } from 'commander';
import fs from 'node:fs';
import path from 'node:path';
import genDiff from '../src/index.js';

const program = new Command();

program
  .version('0.0.1')
  .description('Compares two configuration files and shows a difference.')
  .arguments('<filepath1> <filepath2>')
  .action((filepath1, filepath2) => {
    const pathToFile1 = path.resolve(process.cwd(), filepath1);
    const jsonTextFile1 = fs.readFileSync(pathToFile1, 'utf8');
    const obj1 = JSON.parse(jsonTextFile1);
    const pathToFile2 = path.resolve(process.cwd(), filepath2);
    const jsonTextFile2 = fs.readFileSync(pathToFile2, 'utf8');
    const obj2 = JSON.parse(jsonTextFile2);

    console.log(genDiff(obj1, obj2));
  })
  .helpOption('-h, --help', 'output usage information')
  .option('-f, --format <type>', 'output format')
  .parse(process.argv);
