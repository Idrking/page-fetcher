const request = require('request');
const fs = require('fs');

const url = process.argv[2];
const destinationFile = process.argv[3];


request(url, (error, response, body)=> {
  if (error || response.statusCode !== 200) {
    throw new Error(`ERROR: invalid URL or returned with abnormal status`);
  }
  fs.writeFile(destinationFile, body, (err) => {
    if (err) throw err;
    fs.stat(destinationFile, (err, stats) => {
      if (err) throw err;
      console.log(`Downloaded and saved ${stats.size} bytes to ${destinationFile}`);
    });
  
  });
});
