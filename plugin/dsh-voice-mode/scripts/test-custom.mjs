/** Focused checks for the custom distribution; upstream's full suite remains available as npm test. */
import { spawnSync } from 'node:child_process'

const files = [
  'test/segmenter.test.mjs',
  'test/tts-runtime.test.mjs',
  'test/desktop-worker-path.test.mjs',
  'test/custom-package.test.mjs',
  'test/settings-load.test.mjs',
  'test/settings-store.test.mjs',
  'test/settings-effective.test.mjs',
  'test/settings-scope-timeout.test.mjs',
  'test/mic-gesture.test.mjs',
  'test/package-install.test.mjs',
  'test/verify-client.mjs',
  'scripts/check-root-manifest.mjs',
]
for (const file of files) {
  const result = spawnSync(process.execPath, [file], { stdio: 'inherit', windowsHide: true })
  if (result.error || result.status !== 0) {
    if (result.error) console.error(result.error.message)
    process.exit(result.status || 1)
  }
}
