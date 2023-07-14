/*****************************************Task 5**************************************/

const fs = require('fs');
const path = require('path');

const task5 = () => {
  // File processing function
  const fileDir = path.join(__dirname, 'test files');

  function processFile(filename) {
    fs.readFile(`${fileDir}/${filename}`, 'utf8', (err, data) => {
      if (err) {
        console.error(`Error reading file ${filename}:`, err);
        return;
      }

      console.log('Task 5');

      // Processing file data
      console.log(`Processing file ${filename}:`);
      console.log(data);

      // Simulating delay in processing
      setTimeout(() => {
        console.log(`Finished processing file ${filename}`);
      }, 5000);
    });
  }

  // File paths
  const files = ['file1.txt', 'file2.txt', 'file3.txt'];

  // Process each file in the event loop
  function processFilesInEventLoop() {
    if (files.length === 0) {
      console.log('All files processed.');
      return;
    }

    const filename = files.shift();
    processFile(filename);

    setImmediate(processFilesInEventLoop);
  }

  // Start processing files
  processFilesInEventLoop();
};

module.exports = task5;
