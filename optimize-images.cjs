const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const srcDir = path.join(__dirname, 'photo');
const destDir = path.join(__dirname, 'client', 'src', 'assets', 'photo');

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

// Function to clean filename
function slugify(name) {
  return name
    .toLowerCase()
    .replace(/\.png$/i, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

async function run() {
  const files = fs.readdirSync(srcDir).filter(f => f.toLowerCase().endsWith('.png'));
  console.log(`Found ${files.length} images to optimize.`);

  const manifest = {};

  for (const file of files) {
    const slug = slugify(file);
    const inputPath = path.join(srcDir, file);
    const webpPath = path.join(destDir, `${slug}.webp`);
    const thumbPath = path.join(destDir, `${slug}-thumb.webp`);

    console.log(`Processing: ${file} -> ${slug}.webp`);

    try {
      const img = sharp(inputPath);
      const metadata = await img.metadata();

      // Main image: max 1920 width or height, 82% quality webp
      await sharp(inputPath)
        .resize({ width: 1920, height: 1920, fit: 'inside', withoutEnlargement: true })
        .webp({ quality: 82, effort: 4 })
        .toFile(webpPath);

      // Thumbnail: max 600px
      await sharp(inputPath)
        .resize({ width: 600, height: 600, fit: 'inside', withoutEnlargement: true })
        .webp({ quality: 80, effort: 4 })
        .toFile(thumbPath);

      manifest[file] = {
        original: file,
        slug,
        webp: `/photo/${slug}.webp`,
        thumb: `/photo/${slug}-thumb.webp`,
        width: metadata.width,
        height: metadata.height
      };
    } catch (err) {
      console.error(`Error processing ${file}:`, err.message);
    }
  }

  // Section assignments
  const assignments = {
    hero: manifest['avenue real estate (13).png'] || Object.values(manifest)[0],
    servicesBanner: manifest['hotel journee 4.png'] || Object.values(manifest)[1],
    integratedSolutions: manifest['COPACABANA post.png'] || Object.values(manifest)[2],
    strategySection: manifest['house of hogwarts 1.png'] || Object.values(manifest)[3],
    ctaParallax: manifest['hotel nest creative ad.png'] || Object.values(manifest)[4],
    aboutHero: manifest['hotel journee location post.png'] || Object.values(manifest)[5],
    servicesHero: manifest['avenue real estate (4).png'] || Object.values(manifest)[6],
    workHero: manifest['BOLLY PUNJABI NIGHT 15 AUG.png'] || Object.values(manifest)[7],
    contactHero: manifest['hotel nest MOUNTAIN VIEW TEXT.png'] || Object.values(manifest)[8],
    workWithUsHero: manifest['avenue real estate (10).png'] || Object.values(manifest)[9],
    footerBg: manifest['avenue real estate (19).png'] || Object.values(manifest)[10],
  };

  const outputData = {
    images: manifest,
    assignments
  };

  fs.writeFileSync(
    path.join(destDir, 'manifest.json'),
    JSON.stringify(outputData, null, 2)
  );

  console.log('Image optimization complete! manifest.json created.');
}

run();
