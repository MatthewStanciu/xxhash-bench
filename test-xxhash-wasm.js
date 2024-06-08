const xxhashwasm = require('xxhash-wasm');
const { performance, PerformanceObserver } = require('perf_hooks');
const fs = require('fs');
const path = require('path');

const filePath = path.resolve(__dirname, 'logo.png');
const iterations = 1000;

const data = fs.readFileSync(filePath);
const dataStr = data.toString()

xxhashwasm().then((xxh) => {
  const obs = new PerformanceObserver((items) => {
    console.log(items.getEntries()[0].duration + ' ms');
    performance.clearMarks();
  });
  obs.observe({ entryTypes: ['measure'] });

  performance.mark('A');
  for (let i = 0; i < iterations; i++) {
    xxh.h64(dataStr);
  }
  performance.mark('B');
  performance.measure('A to B', 'A', 'B');
});