#!/usr/bin/env node
'use strict'

const path = require('path')
const { program } = require('commander')
const install = require('./src/install')

program
  .command('install <input_strings...>')
  .alias('i')
  .option('-d, --clean', 'Remove node_modules first.')
  .option('--npm', 'Use npm to install.')
  .option('-a, --all', 'Prune dependencies as well as devDependencies.')
  .description('Install a given subset or multiple subsets defined in package.json.')
  .action(install)

program.command('config').action(() => {
  const config = require('./src/config')
  const subsets = require(process.cwd() + '/package.json').subsets || config() || {}
  console.log(subsets)
})

program.command('*').action(() => program.help())

program.version(require('./package.json').version).parse(process.argv)

if (program.args.length === 0) program.help()

process.on('uncaughtException', (err) => {
  console.error('ERROR: ' + err)
  process.exit(1)
})
