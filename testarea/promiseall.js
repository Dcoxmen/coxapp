const request = require('request');


/* Client side, works in Chrome 55 and Firefox 52 without transpilation */
//https://blogs.msdn.microsoft.com/typescript/2016/11/08/typescript-2-1-rc-better-inference-async-functions-and-more/
async function fetchURLs() {
    try {
      let datakey = 'http://api.coxauto-interview.com/api/datasetId';
      // Promise.all() lets us coalesce multiple promises into a single super-promise
      var data = await Promise.all([
        /* Alternatively store each in an array */
        // var [x, y, z] = await Promise.all([
        // parse results as json; fetch data response has several reader methods available:
        //.arrayBuffer()
        //.blob()
        //.formData()
        //.json()
        //.text()
        fetch('http://api.coxauto-interview.com/api/datasetId').then((response) => response.json()),// parse each response as json
        fetch('http://api.coxauto-interview.com/api/UdRoqGb22Ag/vehicles').then((response) => response.json()),
        fetch(`http://api.coxauto-interview.com/api/${datakey}/cheat`).then((response) => response.json())
      ]);

      for (var i of data) {
        console.log(`RESPONSE ITEM \n`);
        for (var obj of i) {
          console.log(obj);
          //logger utility method, logs output to screen
          console.log(obj);
        }
      }

    } catch (error) {
      console.log(error);
    }
  }



var requestAsync = function(url) {
    return new Promise((resolve, reject) => {
        var req = request(url, (err, response, body) => {
            if (err) return reject(err, response, body);
            resolve(JSON.parse(body));
        });
    });
};

const urls = [
    'http://api.coxauto-interview.com/api/datasetId',
    'http://api.coxauto-interview.com/api/UdRoqGb22Ag/vehicles',
    `http://api.coxauto-interview.com/api/${datakey}/cheat`
];

/* Works as of Node 7.6 */
var getParallel = async function() {
    //transform requests into Promises, await all
    try {
        var data = await Promise.all(urls.map(requestAsync));
       
    } catch (err) {
        console.error(err);
    }
    console.log(data);
}

getParallel();