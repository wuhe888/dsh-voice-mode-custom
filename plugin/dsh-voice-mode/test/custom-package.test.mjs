import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { runInNewContext } from 'node:vm'

const pkg = JSON.parse(readFileSync(new URL('../package.json', import.meta.url)))
const root = JSON.parse(readFileSync(new URL('../../../package.json', import.meta.url)))
const patch = readFileSync(new URL('../cordis.patch.yml', import.meta.url), 'utf8')
assert.equal(patch.match(/^\s+name:\s*(\S+)$/m)?.[1], pkg.name)
let clientId
runInNewContext(readFileSync(new URL('../lib/client.js', import.meta.url), 'utf8'), {
  window: { __ModuleLoader__: { load: ({ id }) => { clientId = id } } },
})
assert.equal(clientId, pkg.name)
assert.deepEqual(root.dependencies, pkg.dependencies)
assert.deepEqual(root.peerDependencies, pkg.peerDependencies)
console.log('✓ GitHub and tarball packages resolve the declared plugin and client module names')
