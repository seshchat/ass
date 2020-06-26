#!/usr/bin/env node
const program = require('commander')

const options = [{
  command: '-f, --file',
  description: 'Location of your Assfile.json'
}]

options.forEach(option => program.option(option.command, option.description))

program.parse(process.argv)

require('./commands/serve.command')(program)
