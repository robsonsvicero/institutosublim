const fs = require('fs');
const cert = fs.readFileSync('C:\\Users\\robso\\Desktop\\cora-api\\certificate.pem', 'utf8');
const key = fs.readFileSync('C:\\Users\\robso\\Desktop\\cora-api\\private-key.key', 'utf8');
const envContent = `CORA_CLIENT_ID="int-1PWb4Qfw9jsGL2Q4PPnEwO"\nCORA_CERT_PEM="${cert.replace(/\r?\n/g, '\\n')}"\nCORA_KEY_PEM="${key.replace(/\r?\n/g, '\\n')}"\n`;
fs.writeFileSync('cora-secrets.env', envContent);
