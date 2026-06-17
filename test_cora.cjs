const https = require('https');
const fs = require('fs');

const cert = fs.readFileSync('C:\\\\Users\\\\robso\\\\Desktop\\\\cora-api\\\\certificate.pem', 'utf8');
const key = fs.readFileSync('C:\\\\Users\\\\robso\\\\Desktop\\\\cora-api\\\\private-key.key', 'utf8');
const clientId = 'int-1PWb4Qfw9jsGL2Q4PPnEwO';

const postData = new URLSearchParams({
  grant_type: 'client_credentials',
  client_id: clientId
}).toString();

const options = {
  hostname: 'matls-clients.api.cora.com.br',
  port: 443,
  path: '/token',
  method: 'POST',
  cert: cert,
  key: key,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Content-Length': Buffer.byteLength(postData)
  }
};

const req = https.request(options, (res) => {
  console.log(`STATUS: ${res.statusCode}`);
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  res.on('end', () => {
    console.log(`BODY: ${data}`);
  });
});

req.on('error', (e) => {
  console.error(`ERROR: ${e.message}`);
});

req.write(postData);
req.end();
