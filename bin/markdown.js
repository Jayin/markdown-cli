#!/usr/bin/env node

'use strict'
const program = require('commander')
const pkg = require('../package.json')
const marked = require('kramed')
const fs = require('fs')
const path = require('path')

program
  .version(pkg.version)
  .option('-s, --string <string>', 'the string')
  .arguments('[file...]')
  .description('cli to markdown')
  .parse(process.argv)


let files = program.args
let _string = program.string

marked.setOptions({
  renderer: new marked.Renderer(),
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: true,
  smartLists: true,
  smartypants: false
})

if (_string) {
  console.log(marked(_string))
  process.exit(0)
}

if (files) {
  let file = files[0]
  let message = fs.readFileSync(path.join(file), {encoding: 'utf-8'})
  console.log(marked(message))
}
