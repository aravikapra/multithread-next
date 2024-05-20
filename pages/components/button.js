// File: pages/components/buttons.js

import { useEffect } from 'react';
import { myHeavyTaskInWorkerThread, myHeavyTaskInMainThread, myLightTaskInMainThread } from "../api/worker.js";

const Buttons = () => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Mengeksekusi tugas berat di dalam worker thread
        const worker = new Worker('/workers/worker.js'); // Path ke berkas worker.js
        worker.postMessage({ targetValue: 10000000000 });

        worker.onmessage = function(event) {
          console.log('Result from worker:', event.data);
        };
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex gap-3">
      <button
        className="bg-gray-700 m-3 p-3 rounded-lg hover:bg-black hover:border-white border"
        onClick={() => myHeavyTaskInWorkerThread()}
      >
        Call Worker
      </button>

      <button
        className="bg-gray-700 p-3 rounded-lg hover:bg-black hover:border-white border"
        onClick={() => myHeavyTaskInMainThread()}
      >
        Call Main Thread
      </button>

      <button
        className="bg-gray-700 p-3 rounded-lg hover:bg-black hover:border-white border"
        onClick={() => myLightTaskInMainThread()}
      >
        Call Light Task 
      </button>
    </div>
  );
};

export default Buttons;
