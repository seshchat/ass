#!/usr/bin/env node
const program = require('commander')
program.parse(process.argv)

require('./commands/serve.command')(program)
