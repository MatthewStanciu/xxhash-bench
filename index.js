// const Benchmark = require('benchmark');
// const { Xxh64 } = require('@node-rs/xxhash');
// const xxhashwasm = require('xxhash-wasm');

// const suite = new Benchmark.Suite();

// const data = Buffer.from('Some data to hash');

// suite.add('@node-rs/xxhash', () => {
//   Xxh64(data);
// });

// // xxhash64 from xxhash-wasm
// xxhashwasm().then(xxhash64WasmInstance => {
//   suite.add('xxhash-wasm', () => {
//     xxhash64WasmInstance.h64(data, 0n);
//   });

//   // Run the benchmark
//   suite
//     .on('cycle', event => {
//       console.log(String(event.target));
//     })
//     .on('complete', () => {
//       console.log('Fastest is ' + suite.filter('fastest').map('name'));
//     })
//     .run({ async: true });
// });