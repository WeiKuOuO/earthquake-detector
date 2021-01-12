const request = require('request');
const http = require('http');

request('https://opendata.cwb.gov.tw/api/v1/rest/datastore/E-A0015-001?Authorization=CWB-6D381C37-6985-43CE-920B-D3138F278E5B&areaName=%E9%AB%98%E9%9B%84%E5%B8%82', function (error, response, body) {
  console.error('error:', error); 
  console.log('statusCode:', response && response.statusCode);
  
  const obj = JSON.parse(body)


  http.createServer(function (req, res) {
    var content = `
    <html>
      <body>
      <style>
      ul {
        background: #3399ff;
        padding: 20px;
      }
      ul li {
        background: #cce5ff;
        padding: 5px;
      }
      </style>
      <ul>
        <li>Earthquake Number#${obj.records.earthquake[0].earthquakeNo}</li>
        <li>Time: ${obj.records.earthquake[0].earthquakeInfo.originTime}</li>
        <li>Depth: ${obj.records.earthquake[0].earthquakeInfo.depth.value} km</li>
      </ul>
        <img src="${obj.records.earthquake[0].shakemapImageURI}" alt= "rpoertImage1" width="600px" height="800px">
      </body>
    </html>
    `
    console.log('request arrived')
    res.writeHead(200, {
        'Content-Encoding': 'utf-8',
        'Content_Length': content.length,
        'Content-Type': 'text/html;charset=utf-8'});
    res.end(content);
  }).listen(7777);
  console.log("Success!")
});