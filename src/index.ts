#! /usr/bin/env node

import { Command } from 'commander';
import figlet from 'figlet';
import { screenshot } from './playwright';

const program = new Command();

console.log(figlet.textSync('SCREENIE', { horizontalLayout: 'full' }));

program
  .version('1.0.0')
  .description('A CLI to take screenshots of websites')
  .option('-u, --url  [value]', 'Url to take screenshot from')
  .parse(process.argv);

const options = program.opts();

if (options.url) {
  screenshot(options.url).then(console.log).catch(console.error);
}

if (!process.argv.slice(2).length) {
  program.outputHelp();
}
