import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const uploadedDir = 'C:\\Users\\menta\\.gemini\\antigravity-ide\\brain\\9b3aad4a-dc1e-46b4-a577-04f63e6685d0\\.user_uploaded';
const targetDir = './src/assets/branding';
const heroDir = './src/assets/hero';

if (!fs.existsSync(targetDir)) fs.mkdirSync(targetDir, { recursive: true });
if (!fs.existsSync(heroDir)) fs.mkdirSync(heroDir, { recursive: true });

async function processNewAssets() {
  const logoInput = path.join(uploadedDir, 'media_1787833265974.png');
  const tripleInput = path.join(uploadedDir, 'media_1787833297565.jpg');

  // 1. Process Logo
  const logoOutput = path.join(targetDir, 'msp_logo.png');
  const faviconOutput = './public/favicon.png';

  await sharp(logoInput)
    .png()
    .toFile(logoOutput);
  
  await sharp(logoInput)
    .resize(64, 64)
    .png()
    .toFile(faviconOutput);

  console.log('Saved logo to', logoOutput, 'and favicon to', faviconOutput);

  // 2. Process Hero Triple Portrait
  const heroOutput = path.join(heroDir, 'sravan_triple_portrait.jpg');
  await sharp(tripleInput)
    .jpeg({ quality: 95 })
    .toFile(heroOutput);

  console.log('Saved hero triple portrait to', heroOutput);
}

processNewAssets().catch(console.error);
