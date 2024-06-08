const { xxh64: xxhash64 } = require('@node-rs/xxhash');
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

performance.mark('A');
for (let i = 0; i < iterations; i++) {
  xxhash64(data);
}
performance.mark('B');
performance.measure('A to B', 'A', 'B');