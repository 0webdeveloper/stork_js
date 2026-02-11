import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const dataPath = path.join(__dirname, '../assets/data/news.json');
const templatePath = path.join(__dirname, '../templates/news-detail.html');
const outputDir = path.join(__dirname, '../events');

// Load Data
const newsData = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
const template = fs.readFileSync(templatePath, 'utf-8');

// Ensure output dir exists
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

// Generate Pages
newsData.forEach(item => {
    let content = template
        .replace(/{{title}}/g, item.title)
        .replace(/{{date}}/g, item.date)
        .replace(/{{description}}/g, item.description)
        .replace(/{{content}}/g, item.content || '');

    // Fix relative paths for generated pages (which are 1 level deep in events/)
    // Template assumes ../../assets, but now events/ is in root, so it should be ../assets
    content = content.replace(/\.\.\/\.\.\/assets/g, '../assets');

    const filePath = path.join(outputDir, `${item.id}.html`);
    fs.writeFileSync(filePath, content);
    console.log(`Generated: ${filePath}`);
});

console.log('News generation complete.');
