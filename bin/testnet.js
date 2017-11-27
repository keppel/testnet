#!/usr/bin/env node

let commandExists = require('command-exists').sync
let fs = require('fs-extra')
let pkgPath = require('package-json-path')()
let cwd = process.cwd()
let exec = require('execa')
let axios = require('axios')
let stringify = require('json-stable-stringify')

function cleanup() {
  fs.removeSync(cwd + '/Dockerfile')
}

function fetchGenesis(rpcUrl) {
  return new Promise(async (resolve, reject) => {
    let genesisJson = await axios
      .get(rpcUrl + '/genesis')
      .then(res => {
        return res.data.result.genesis
      })
      .then(gen => {
        delete gen.consensus_params
        return gen
      })
      .then(gen => {
        return stringify(gen)
      })

    resolve(genesisJson)
  })
}

async function main() {
  // `now` should be installed:
  if (!commandExists('now')) {
    throw new Error('You must have `now` installed: `npm i -g now`')
  }

  // package.json should have a "start" script:
  let pkg = require(pkgPath)
  if (!pkg.scripts.start) {
    throw new Error('Your package.json must include a "start" script')
  }

  // make sure no dockerfile already exists
  if (fs.existsSync(cwd + '/Dockerfile')) {
    throw new Error(
      'A Dockerfile is already present in this project, please remove it'
    )
  }

  // temporarily copy in dockerfile for `now` to use
  fs.copySync(__dirname + '/Dockerfile', cwd + '/Dockerfile')
  // and make sure we clean this up if the user kills the process early or when we're done:
  process.on('SIGINT', () => {
    cleanup()
    process.exit()
  })
  process.on('exit', cleanup)

  // deploy with `now`!
  // omfg, `now` knows to only write the url to stdout in this context
  // zeit, y'all unreal.
  let url = exec.sync('now', ['--docker']).stdout

  // go get the genesis.json via rpc:
  let genesisJson = await fetchGenesis(url)

  console.log('tendermint rpc now exposed at: ' + url)
  console.log('testnet genesis json:')
  console.log(JSON.stringify(JSON.parse(genesisJson), null, 2))
}

main().catch(e => {
  console.log('Error: ' + e.message)
})
