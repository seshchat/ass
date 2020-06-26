const fs = require('fs')
const ora = require('ora')
const express = require('express')
const inquirer = require('inquirer')

const parseAssfile = require('../helpers/parse.helper')

const { logSplitter } = require('../utils')

module.exports = async function(program) {
  logSplitter('ass', { newline: false })

  if(program.args.length === 0)
    return console.log('no assfile provided')

  const _assfile = fs.readFileSync(program.args[0], 'utf8')
  const assfile = JSON.parse(_assfile)

  const { valid, reason } = parseAssfile(assfile)

  if(!valid)
    return ora(`assfile not valid: ${reason}`).fail()

  ora(`name: ${assfile.name}`).info()
  ora(`port: :${assfile.port}`).info()
  ora(`options: ${assfile.options.length}`).info()

  logSplitter('options')

  const { options } = assfile

  let app
  let server

  for(let i = 0; i < Infinity; i++) {
    const { newOption } = await inquirer.prompt([{
      type: 'list',
      name: 'newOption',
      message: 'Switch to a different option',
      choices: options.map(({ name }) => name)
    }])

    if(server)
      server.close()

    app = express()

    app.use((req, res, next) => {
      res.header('X-ASS', '1')
      res.header('X-ASS-Option', newOption)

      if(assfile.name)
        res.header('X-ASS-Name', assfile.name)

      next()
    })

    const option = options.find(option => option.name === newOption)
    const { endpoints } = option

    endpoints.forEach(endpoint => {
      app[endpoint.method.toLowerCase()](endpoint.endpoint, (req, res) => {
        res.status(endpoint.statusCode || 200)

        if(endpoint.body)
          res.send(endpoint.body)
        else
          res.end()
      })
    })

    server = app.listen(assfile.port)
  }
}
