const { benchmark } = require('./benchmark')
const { XXHash64 } = require('xxhash-addon');
const { xxh64: xxhash64 } = require('@node-rs/xxhash');
const { xxhash64: hashwasmxxhash64 } = require('hash-wasm');
const xxhashwasm = require('xxhash-wasm');
const { encantisxxh64 } = require('./encantis/encantis')

function xxHashAddon(key) {
  const seed = Buffer.alloc(8)
  const xxh64 = new XXHash64(seed)
  xxh64.update(Buffer.from(key))
  return xxh64.digest()
}

async function xxHashWasm() {
  const { h64 } = await xxhashwasm()
  return h64
}

(async() => {
  await benchmark(xxHashAddon, 'xxhash-addon')
  await benchmark(xxhash64, 'noders-xxhash')
  await benchmark(hashwasmxxhash64, 'hash-wasm')
  const h64 = await xxHashWasm()
  await benchmark(h64, 'xxhash-wasm')
  const encantisxxh = await encantisxxh64()
  await benchmark(encantisxxh, 'encantis')
})()
