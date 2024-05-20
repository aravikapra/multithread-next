// File: api/worker.js

export async function myHeavyTaskInMainThread() {
    console.log("Called myHeavyTaskInMainThread");
    let sum = 0;
    for (let i = 1; i <= 10000000000; i++) {
      sum += i;
    }
    console.log("Result from myHeavyTaskInMainThread:", sum, "\n");
    return sum;
  }
  
  export async function myLightTaskInMainThread() {
    console.log("Called myLightTaskInMainThread");
    let sum = 0;
    for (let i = 1; i <= 10; i++) {
      sum += i;
    }
    console.info("Result from myLightTaskInMainThread:", sum, "\n");
    return sum;
  } 
  
  export async function myHeavyTaskInWorkerThread() {
    console.log("Called myHeavyTaskInWorkerThread");
    const worker = new Worker("/workers/worker.js", {
      workerData: {
        task: "performSum",
        targetValue: 10000000000,
      },
    });
  
    worker.onmessage = (event) => {
      console.log("Result from myHeavyTaskInWorkerThread:", event.data, "\n");
    };
  }
  