//@ts-check
const { performance } = require('perf_hooks');

let baseKey = "5QmaHpcFCqBYmrTpHL7nqeYFzQjXXStfWtYkAeFpmwHsH3g/dpl_BL2W9QkrX96G6moXhqCM1XUx3xJg/basepath/images/projects/cancel-workflow-action.jpg"
const iterations = 1000;
const keys = Array.from({length: iterations}).map((_, i) => `${baseKey}-${i}`)

module.exports.benchmark = async function benchmark(xxhash, name) {  
  const startTime = performance.now()
  for (let i = 0; i < iterations; i++) {
    await xxhash(keys[i])
  }
  const endTime = performance.now()
  console.log(name, endTime - startTime)
}