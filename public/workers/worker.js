// File: public/workers/worker.js

function performSum(targetValue) {
  let sum = 0;
  for (let i = 1; i <= targetValue; i++) {
    sum += i;
  }
  return sum;
}

self.onmessage = function(event) {
  const result = performSum(event.data.targetValue);
  self.postMessage(result);
};
