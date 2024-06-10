// Originally written by creationix for encantis: https://github.com/creationix/encantis/blob/main/samples/xxh64.js

const fs = require('fs/promises')
const path = require('path')

module.exports.encantisxxh64 = async function() {
  const wasm = await fs.readFile(path.join(__dirname, "./xxh64.wasm"))
  const module = await WebAssembly.compile(wasm)
  const instance = await WebAssembly.instantiate(module)

  /** @type {{mem:WebAssembly.Memory,xxh64:(ptr:number,len:number,seed:bigint)=>bigint}} */
  const { mem, xxh64: hash } = instance.exports

  /**
   * @param {string} input 
   * @param {bigint} [seed] 
   * @returns {bigint}
   */
  function xxh64(input, seed = 0n) {
    // Encode the strings as utf8
    const inputArray = new Uint8Array(new TextEncoder().encode(input))
    // And copy it into the buffer
    new Uint8Array(mem.buffer).set(inputArray, 0)
    // Call the function
    const res = hash(0, inputArray.length, seed)
    // Turn the result into an unsigned integer
    return res < 0n ? res + 0x10000000000000000n : res
  }

  return xxh64
}