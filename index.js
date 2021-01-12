const request = require('request');
const http = require('http');

request('https://opendata.cwb.gov.tw/api/v1/rest/datastore/E-A0015-001?Authorization=CWB-6D381C37-6985-43CE-920B-D3138F278E5B&areaName=%E9%AB%98%E9%9B%84%E5%B8%82', function (error, response, body) {
  console.error('error:', error); 
  console.log('statusCode:', response && response.statusCode);
  
  const obj = JSON.parse(body)


  http.createServer(function (req, res) {
    var content = `
    <html>
    <title>最新地震情報</title>
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
      <text>${obj.records.earthquake[0].reportContent}</text>
      <ul>
        <li>Earthquake Number#${obj.records.earthquake[0].earthquakeNo}</li>
        <li>時間: ${obj.records.earthquake[0].earthquakeInfo.originTime}</li>
        <li>深度: ${obj.records.earthquake[0].earthquakeInfo.depth.value} km</li>
        <li>震央: ${obj.records.earthquake[0].earthquakeInfo.epiCenter.location}</li>
        <li>經緯: [${obj.records.earthquake[0].earthquakeInfo.epiCenter.epiCenterLat.value}, ${obj.records.earthquake[0].earthquakeInfo.epiCenter.epiCenterLon.value}]</li>
        <li>芮氏規模: ${obj.records.earthquake[0].earthquakeInfo.magnitude.magnitudeValue}</li>
      </ul>
        <img src="${obj.records.earthquake[0].shakemapImageURI}" alt= "rpoertImage1" width="450px" height="600px">
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