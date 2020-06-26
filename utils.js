const chalk = require('chalk')

module.exports.logSplitter = function(title, options) {
  if(!options)
    options = {
      newline: true
    }

  if(typeof options.newline === 'undefined')
    options.newline = true

  const line = chalk.gray('---')
  const number = options.number ? ` ${chalk.dim(`${options.number}.`)}` : ''
  const newline = options.newline ? '\n' : ''

  console.log(title ? `${newline}${line}${number} ${chalk.bold(title)} ${line}` : `${line}${line}`)
}

module.exports.getRootPath = () => __dirname.split('/').splice(0, __dirname.split('/').length).join('/')
