const localtunnel = require('localtunnel');
const fs = require('fs');
const path = require('path');

const logPath = path.join(__dirname, 'tunnel_url.txt');

(async () => {
  try {
    console.log('Starting localtunnel on port 8000...');
    const tunnel = await localtunnel({ port: 8000 });
    console.log('Tunnel URL:', tunnel.url);
    fs.writeFileSync(logPath, tunnel.url, 'utf8');
    
    tunnel.on('close', () => {
      console.log('Tunnel closed');
    });
  } catch (err) {
    console.error('Localtunnel error:', err);
    fs.writeFileSync(logPath, 'Error: ' + err.message, 'utf8');
  }
})();
