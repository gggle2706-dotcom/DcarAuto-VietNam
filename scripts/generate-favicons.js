import sharp from 'sharp';
import fs from 'node:fs';

async function generate() {
  const inputPath = 'C:/Users/gggle/.gemini/antigravity/brain/5757e2bb-4915-4d22-8ee3-21b19394d39c/.user_uploaded/media_1789147427562.png';
  const size = 128;
  const radius = 24;

  // 1. Transparent full logo
  const { data, info } = await sharp(inputPath).raw().toBuffer({ resolveWithObject: true });
  const outData = Buffer.alloc(info.width * info.height * 4);
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i+1];
    const b = data[i+2];
    const minVal = Math.min(r, g, b);
    if (minVal > 240) {
      const diff = 255 - minVal;
      const alpha = Math.round((diff / 15) * 255);
      outData[i] = r;
      outData[i+1] = g;
      outData[i+2] = b;
      outData[i+3] = Math.min(alpha, 255);
    } else {
      outData[i] = r;
      outData[i+1] = g;
      outData[i+2] = b;
      outData[i+3] = 255;
    }
  }

  // Save public/logo.png and public/images/logo.png (Transparent full logo)
  await sharp(outData, { raw: { width: info.width, height: info.height, channels: 4 } })
    .trim({ threshold: 5 })
    .toFile('public/logo.png');

  fs.mkdirSync('public/images', { recursive: true });
  fs.copyFileSync('public/logo.png', 'public/images/logo.png');

  // Extract clean car silhouette without any text pixels (y: 0 to 100)
  const carSilhouetteBuffer = await sharp('public/logo.png')
    .extract({ left: 0, top: 0, width: 836, height: 100 })
    .trim({ threshold: 5 })
    .png()
    .toBuffer();

  await sharp(carSilhouetteBuffer).toFile('public/car-silhouette.png');

  // 2. Focused Favicon Badge (128x128):
  // Clean white rounded container with subtle border.
  // Vibrant blue car silhouette prominent at top, bold "DCAR" text in brand font at bottom.
  // Highly legible at 16x16, 32x32, 48x48, 64x64, 180x180.
  const carResized = await sharp(carSilhouetteBuffer)
    .resize(112, 46, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .toBuffer();

  const svgText = `
    <svg width="${size}" height="${size}">
      <rect x="2" y="2" width="${size - 4}" height="${size - 4}" rx="${radius}" ry="${radius}" fill="#ffffff" stroke="#cbd5e1" stroke-width="2.5" />
      <text x="64" y="102" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif" font-weight="900" font-size="30" text-anchor="middle" fill="#0f172a" letter-spacing="2">DCAR</text>
    </svg>
  `;

  const faviconBadge = await sharp(Buffer.from(svgText))
    .composite([{ input: carResized, top: 22, left: 8 }])
    .png()
    .toBuffer();

  // Save PNG favicons
  await sharp(faviconBadge).resize(32, 32).toFile('public/favicon.ico');
  await sharp(faviconBadge).resize(32, 32).toFile('public/favicon-32x32.png');
  await sharp(faviconBadge).resize(16, 16).toFile('public/favicon-16x16.png');
  await sharp(faviconBadge).resize(192, 192).toFile('public/favicon.png');
  await sharp(faviconBadge).resize(180, 180).toFile('public/apple-touch-icon.png');

  // Create SVG favicon with the embedded crisp base64
  const base64Favicon = faviconBadge.toString('base64');
  const faviconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" width="128" height="128">
  <image width="128" height="128" href="data:image/png;base64,${base64Favicon}" />
</svg>`;
  fs.writeFileSync('public/favicon.svg', faviconSvg, 'utf-8');

  console.log('[generate-favicons] Finished generating all favicons cleanly!');
}

generate().catch(console.error);
