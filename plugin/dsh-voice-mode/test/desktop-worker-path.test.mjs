import assert from 'node:assert/strict'
import { execFile } from 'node:child_process'
import { mkdtemp, mkdir, writeFile, rm } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { pathToFileURL } from 'node:url'
import { promisify } from 'node:util'
import { resolveLocalWorkerPath } from '../src/tts-runtime.ts'

const root = await mkdtemp(join(tmpdir(), 'voice-worker-path-'))
try {
  for (const layout of ['plugins/voice', 'app.asar.unpacked/plugins/voice', 'folder.asar-backup/plugins/voice']) {
    const dir = join(root, layout)
    await mkdir(dir, { recursive: true })
    const file = join(dir, 'tts-vits-worker.cjs')
    await writeFile(file, 'process.stdout.write("worker ready")\n')
    const request = pathToFileURL(file.replace('app.asar.unpacked', 'app.asar'))
    const resolved = resolveLocalWorkerPath(request)
    assert.equal(resolved, file)
    const result = await promisify(execFile)(process.execPath, [resolved], { timeout: 5000, windowsHide: true })
    assert.equal(result.stdout, 'worker ready')
  }
  console.log('✓ Plain Node executes workers in ordinary, unpacked ASAR, and similarly named directories')
} finally {
  await rm(root, { recursive: true, force: true })
}
