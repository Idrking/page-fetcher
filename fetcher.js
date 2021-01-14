const request = require('request');
const fs = require('fs');
const url = process.argv[2];
const destinationFile = process.argv[3];

const readline = require('readline');

request(url, (error, response, body)=> {
  if (error || response.statusCode !== 200) {
    //if url is invalid, or returns with any status other than 200, terminates program
    throw new Error(`ERROR: invalid URL or returned with abnormal status`);
  }
  
  fs.stat(destinationFile, (err, stats) => {
    if (stats !== undefined) {
      const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
      });

      rl.question('This file already exists, do you want to overwrite it? (Y/N) \n', (answer) => {
        if (answer !== 'Y') {
          rl.close();
        } else {
          writeIt(body);
          rl.close();
        }
      });
    } else {
      writeIt(body);
    }
  });
});


const writeIt = (body) => {
  fs.writeFile(destinationFile, body, (err) => {
    // if destinationFile isn't a valid file path, throws error
    if (err) throw err;
    fs.stat(destinationFile, (err, stats) => {
      // if destinationFile wasn't properly created, throws error
      if (err) throw err;
      console.log(`Downloaded and saved ${stats.size} bytes to ${destinationFile}`);
    });
  });
};