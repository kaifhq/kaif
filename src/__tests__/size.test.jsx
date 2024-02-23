import { readFileSync } from 'node:fs'
import path from 'node:path'

const THRESHOLD = 1024
test(`Size <=${THRESHOLD}b`, () => {
  const p = path.resolve(__dirname, '../../dist/index.mjs')
  const contents = readFileSync(p, 'utf8')
  expect(contents.length)
    .toBeLessThanOrEqual(THRESHOLD)
})
