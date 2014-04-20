var vm = require('vm')
var co = require('co')
var fs = require('fs')
var React = require('react')
var path = require('path')
var mkdirp = require('mkdirp')
var assert = require('assert')
var resolve = require('component-resolver')
var builder = require('component-builder')
var join = require('path').join


function fixture(name) {
  return join(__dirname, 'fixtures', name)
}

function build(nodes) {
  return builder.scripts(nodes)
    .use('scripts', builder.plugins.js())
    .use('react', require('..')())
    .end()
}

describe('blah', function () {
  var js = builder.scripts.require,
      tree;

  it('should install', co(function* () {
    tree = yield* resolve(fixture('blah'), {})
  }))

  it('should build', co(function* () {
    js += yield build(tree)
  }))

  it('should execute', function () {
    var ctx = vm.createContext({ React: React })
    vm.runInContext(js, ctx)
    vm.runInContext('if (require("blah") !== "<div>Hello</div>") throw new Error()', ctx)
  })
})

describe('sauce', function () {
  var js = builder.scripts.require,
      tree;

  it('should install', co(function* () {
    tree = yield* resolve(fixture('blah'), {})
  }))

  it('should build', co(function* () {
    js += yield build(tree)
    mkdirp(path.join(__dirname, '..', 'build'))
    fs.writeFileSync(path.join(__dirname, '..', 'build', 'build.js'), js)
  }))

  it('should execute', function () {
    var ctx = vm.createContext({ React: React })
    vm.runInContext(js, ctx)
    vm.runInContext('if (require("blah") !== "<div>Hello</div>") throw new Error()', ctx)
  })
})