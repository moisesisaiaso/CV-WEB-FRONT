import { chromium } from 'playwright';
import path from 'path';
import fs from 'fs';

const targetDir = path.resolve('./public/projects/m4construccion');
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

async function run() {
  console.log('Launching browser...');
  const browser = await chromium.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
  });
  const page = await context.newPage();

  const pages = [
    { url: 'https://m4construccion.com/', name: '01_inicio_hero.png', title: 'Inicio - Portal M4 Construcción' },
    { url: 'https://m4construccion.com/construccion', name: '02_construccion_proyectos.png', title: 'Construcción y Proyectos de Obra' },
    { url: 'https://m4construccion.com/bienes-raices', name: '03_bienes_raices.png', title: 'Catálogo de Bienes Raíces' },
    { url: 'https://m4construccion.com/club-de-inversion', name: '04_club_inversion.png', title: 'Club de Inversión Inmobiliaria' },
    { url: 'https://m4construccion.com/sobre-nosotros', name: '05_sobre_nosotros.png', title: 'Sobre Nosotros y Filosofía' }
  ];

  for (const item of pages) {
    console.log(`Navigating to ${item.url}...`);
    try {
      await page.goto(item.url, { waitUntil: 'networkidle', timeout: 30000 });
      await page.waitForTimeout(2000); // allow animations / font load
      const outPath = path.join(targetDir, item.name);
      await page.screenshot({ path: outPath, fullPage: false });
      console.log(`Saved screenshot: ${outPath}`);
    } catch (err) {
      console.error(`Failed to capture ${item.url}:`, err.message);
    }
  }

  await browser.close();
  console.log('Finished capturing screenshots!');
}

run().catch(console.error);
