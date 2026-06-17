const fs = require('fs');
const { execSync } = require('child_process');

const cert = fs.readFileSync('C:\\Users\\robso\\Desktop\\cora-api\\certificate.pem', 'utf8');
const key = fs.readFileSync('C:\\Users\\robso\\Desktop\\cora-api\\private-key.key', 'utf8');

const certClean = cert.trim().replace(/\r\n/g, '\\n').replace(/\n/g, '\\n');
const keyClean = key.trim().replace(/\r\n/g, '\\n').replace(/\n/g, '\\n');

const envContent = `CORA_CLIENT_ID="int-1PWb4Qfw9jsGL2Q4PPnEwO"\nCORA_CERT_PEM="${certClean}"\nCORA_KEY_PEM="${keyClean}"\n`;

fs.writeFileSync('cora_secrets.env', envContent);

try {
  console.log('Uploading secrets to Supabase...');
  execSync('npx supabase secrets set --env-file cora_secrets.env', { stdio: 'inherit' });
  
  console.log('Deploying function cora-pix...');
  execSync('npx supabase functions deploy cora-pix --no-verify-jwt', { stdio: 'inherit' });
  
  console.log('Success!');
} catch (e) {
  console.error('Error during execution:', e.message);
} finally {
  if (fs.existsSync('cora_secrets.env')) {
    fs.unlinkSync('cora_secrets.env');
  }
  console.log('Temporary env file deleted for security.');
}
