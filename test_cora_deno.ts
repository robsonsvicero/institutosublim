const cert = Deno.readTextFileSync('C:\\\\Users\\\\robso\\\\Desktop\\\\cora-api\\\\certificate.pem');
const key = Deno.readTextFileSync('C:\\\\Users\\\\robso\\\\Desktop\\\\cora-api\\\\private-key.key');
const clientId = 'int-1PWb4Qfw9jsGL2Q4PPnEwO';

const client = Deno.createHttpClient({
  certChain: cert,
  privateKey: key,
});

const tokenOptions = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
  body: new URLSearchParams({
    grant_type: 'client_credentials',
    client_id: clientId
  }),
  client: client
};

const res = await fetch('https://matls-clients.api.cora.com.br/token', tokenOptions);
console.log("STATUS:", res.status);
console.log("BODY:", await res.text());
