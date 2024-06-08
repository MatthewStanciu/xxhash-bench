const { xxhash64 } = require('hash-wasm');
const { performance, PerformanceObserver } = require('perf_hooks');
const fs = require('fs');
const path = require('path');

const filePath = path.resolve(__dirname, 'logo.png');
const iterations = 1000;

const data = fs.readFileSync(filePath);

function createHashPromises(iterations, data) {
  const promises = [];
  for (let i = 0; i < iterations; i++) {
    promises.push(xxhash64(data));
  }
  return promises;
}

const promises = createHashPromises(iterations, data);

const obs = new PerformanceObserver((items) => {
  console.log(items.getEntries()[0].duration + ' ms');
  performance.clearMarks();
});
obs.observe({ entryTypes: ['measure'] });

(async () => {
  performance.mark('A');
  await Promise.all(promises);
  performance.mark('B');
  performance.measure('A to B', 'A', 'B');
})();