//@ts-check
const { benchmark } = require('./benchmark')
const { XXHash64 } = require('xxhash-addon');

function wrapHash(key) {
  return XXHash64.hash(Buffer.from(key))
}

benchmark(wrapHash, 'xxhash-addon')