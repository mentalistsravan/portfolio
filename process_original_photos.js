import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const uploadedDir = 'C:\\Users\\menta\\.gemini\\antigravity-ide\\brain\\9b3aad4a-dc1e-46b4-a577-04f63e6685d0\\.user_uploaded';
const outputDir = './src/assets/sravan_photos';

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const filesMap = [
  { file: 'media_1787814748355.jpg', name: 'sravan_card.webp' },
  { file: 'media_1787814748877.jpg', name: 'sravan_suit.webp' },
  { file: 'media_1787814749030.jpg', name: 'sravan_cube.webp' },
  { file: 'media_1787814749052.jpg', name: 'sravan_chess.webp' },
  { file: 'media_1787814749181.jpg', name: 'sravan_hoodie.webp' }
];

async function processImage(item) {
  const inputPath = path.join(uploadedDir, item.file);
  const outputPath = path.join(outputDir, item.name);

  const image = sharp(inputPath);
  const metadata = await image.metadata();

  const { data, info } = await image
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const pixelCount = info.width * info.height;
  const processedData = Buffer.alloc(pixelCount * 4);

  // Replaces studio background wall with black while preserving 100% original subject colors
  for (let i = 0; i < pixelCount; i++) {
    const idx = i * 4;
    const r = data[idx];
    const g = data[idx + 1];
    const b = data[idx + 2];

    const brightness = (r + g + b) / 3;
    
    // Smooth alpha threshold for light background wall
    let bgAlpha = 1.0;
    if (brightness > 115) {
      bgAlpha = Math.max(0, 1.0 - (brightness - 115) / 40);
    }

    // Black background (#050505)
    const bgR = 5;
    const bgG = 5;
    const bgB = 5;

    // Preserve original R, G, B colors of subject exactly as taken
    const finalR = Math.round(r * bgAlpha + bgR * (1 - bgAlpha));
    const finalG = Math.round(g * bgAlpha + bgG * (1 - bgAlpha));
    const finalB = Math.round(b * bgAlpha + bgB * (1 - bgAlpha));

    processedData[idx] = finalR;
    processedData[idx + 1] = finalG;
    processedData[idx + 2] = finalB;
    processedData[idx + 3] = 255;
  }

  await sharp(processedData, {
    raw: { width: info.width, height: info.height, channels: 4 }
  })
    .webp({ quality: 95 })
    .toFile(outputPath);

  console.log(`Processed original photo to black background: ${outputPath}`);
}

async function run() {
  for (const item of filesMap) {
    await processImage(item);
  }
  console.log('All original photos updated with pure black background!');
}

run().catch(console.error);
