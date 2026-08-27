import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const uploadedDir = 'C:\\Users\\menta\\.gemini\\antigravity-ide\\brain\\9b3aad4a-dc1e-46b4-a577-04f63e6685d0\\.user_uploaded';
const outputDir = './src/assets/sravan_photos';

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const filesMap = [
  { file: 'media_1787814748355.jpg', name: 'sravan_card.webp', title: 'Mentalist Sravan with Joker Card' },
  { file: 'media_1787814748877.jpg', name: 'sravan_suit.webp', title: 'Mentalist Sravan Black Suit Portrait' },
  { file: 'media_1787814749030.jpg', name: 'sravan_cube.webp', title: 'Mentalist Sravan with Rubiks Cube' },
  { file: 'media_1787814749052.jpg', name: 'sravan_chess.webp', title: 'Mentalist Sravan with Chess Piece' },
  { file: 'media_1787814749181.jpg', name: 'sravan_hoodie.webp', title: 'Mentalist Sravan Studio Portrait' }
];

async function processImage(item) {
  const inputPath = path.join(uploadedDir, item.file);
  const outputPath = path.join(outputDir, item.name);

  const image = sharp(inputPath);
  const metadata = await image.metadata();
  const width = metadata.width;
  const height = metadata.height;

  // Extract raw pixel buffer for background thresholding & dark grading
  const { data, info } = await image
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const pixelCount = info.width * info.height;
  
  // Create processed buffer with dark background tone & thresholded alpha
  const processedData = Buffer.alloc(pixelCount * 4);

  for (let i = 0; i < pixelCount; i++) {
    const idx = i * 4;
    let r = data[idx];
    let g = data[idx + 1];
    let b = data[idx + 2];
    let a = data[idx + 3];

    // Detect light studio backdrop wall (high brightness / low saturation background pixels)
    const brightness = (r + g + b) / 3;
    const isLightBg = brightness > 125 && Math.abs(r - g) < 40 && Math.abs(g - b) < 40;
    
    // Smooth opacity fade out for light background
    let bgAlpha = 1.0;
    if (brightness > 110) {
      bgAlpha = Math.max(0, 1.0 - (brightness - 110) / 45);
    }

    // Apply dark cinematic color grading to subject (enhance contrast, moody dark tones, subtle crimson shadow undertones)
    // Darken overall image for theatrical mood
    let nr = Math.min(255, Math.pow(r / 255, 1.25) * 230);
    let ng = Math.min(255, Math.pow(g / 255, 1.3) * 210);
    let nb = Math.min(255, Math.pow(b / 255, 1.25) * 220);

    // Add subtle crimson shadow accent (#8E1018) in dark areas
    if (brightness < 60) {
      nr = Math.min(255, nr + 12);
      nb = Math.max(0, nb - 5);
    }

    // Blend subject onto deep dark charcoal background (#080808)
    const bgR = 8;
    const bgG = 8;
    const bgB = 8;

    const finalR = Math.round(nr * bgAlpha + bgR * (1 - bgAlpha));
    const finalG = Math.round(ng * bgAlpha + bgG * (1 - bgAlpha));
    const finalB = Math.round(nb * bgAlpha + bgB * (1 - bgAlpha));

    processedData[idx] = finalR;
    processedData[idx + 1] = finalG;
    processedData[idx + 2] = finalB;
    processedData[idx + 3] = 255;
  }

  // Create SVG Vignette overlay
  const vignetteSvg = Buffer.from(`
    <svg width="${width}" height="${height}">
      <defs>
        <radialGradient id="vignette" cx="50%" cy="40%" r="60%">
          <stop offset="20%" stop-color="#000000" stop-opacity="0" />
          <stop offset="85%" stop-color="#050505" stop-opacity="0.85" />
          <stop offset="100%" stop-color="#050505" stop-opacity="0.98" />
        </radialGradient>
        <linearGradient id="spotlight" x1="50%" y1="0%" x2="50%" y2="100%">
          <stop offset="0%" stop-color="#8E1018" stop-opacity="0.15" />
          <stop offset="100%" stop-color="#050505" stop-opacity="0.7" />
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#spotlight)" />
      <rect width="100%" height="100%" fill="url(#vignette)" />
    </svg>
  `);

  await sharp(processedData, {
    raw: { width: info.width, height: info.height, channels: 4 }
  })
    .composite([{ input: vignetteSvg, blend: 'over' }])
    .webp({ quality: 90 })
    .toFile(outputPath);

  console.log(`Processed and saved: ${outputPath}`);
}

async function run() {
  for (const item of filesMap) {
    await processImage(item);
  }
  console.log('All 5 photos successfully processed with dark tone background removal!');
}

run().catch(console.error);
