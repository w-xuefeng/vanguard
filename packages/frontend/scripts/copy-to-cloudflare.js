const fs = require('fs');
const fsp = require('fs/promises');
const path = require('path');

const from = path.join(__dirname, '../../backend/app/web/views/_');
const to = path.join(__dirname, '../../cloudflare/public/_');

if (fs.existsSync(to)) {
  fs.rmSync(to, { recursive: true });
}

(async () => {
  const copyDirectory = async (src, dest) => {
    await fsp.mkdir(dest, { recursive: true });
    const entries = await fsp.readdir(src, { withFileTypes: true });
    for (const entry of entries) {
      const srcPath = path.join(src, entry.name);
      const destPath = path.join(dest, entry.name);
      if (entry.isDirectory()) {
        await copyDirectory(srcPath, destPath);
      } else {
        await fsp.copyFile(srcPath, destPath);
      }
    }
  };
  await copyDirectory(from, to);
})();
