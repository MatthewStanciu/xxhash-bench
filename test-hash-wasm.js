const { xxhash64 } = require('hash-wasm');
const { performance, PerformanceObserver } = require('perf_hooks');
const fs = require('fs');
const path = require('path');

const filePath = path.resolve(__dirname, 'logo.png');
const iterations = 1000;

const data = fs.readFileSync(filePath);

const obs = new PerformanceObserver((items) => {
  console.log(items.getEntries()[0].duration + ' ms');
  performance.clearMarks();
});
obs.observe({ entryTypes: ['measure'] });

(async () => {
  performance.mark('A');
  for (let i = 0; i < iterations; i++) {
    await xxhash64(data);
  }
  performance.mark('B');
  performance.measure('A to B', 'A', 'B');
})();