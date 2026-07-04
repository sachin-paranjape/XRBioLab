const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

const logPath = path.join(__dirname, 'tunnel_url.txt');

console.log('Spawning npx.cmd tmole 8000...');
const child = spawn('npx.cmd', ['tmole', '8000'], { shell: true });

let urlFound = false;

child.stdout.on('data', (data) => {
  const output = data.toString();
  console.log('STDOUT:', output);
  
  // Only capture the first tunnelmole URL, ignore all subsequent https:// matches
  // (e.g. Slack's unfurler bot User-Agent contains https://api.slack.com/robots)
  if (!urlFound) {
    const match = output.match(/https:\/\/[^\s]+/);
    if (match) {
      const url = match[0];
      console.log('Found tunnel URL:', url);
      fs.writeFileSync(logPath, url, 'utf8');
      urlFound = true;
    }
  }
});

child.stderr.on('data', (data) => {
  console.error('STDERR:', data.toString());
});

child.on('close', (code) => {
  console.log(`Tunnel child process exited with code ${code}`);
});
