import { chromium } from 'playwright';
import path from 'path';
import fs from 'fs';

const targetDir = path.resolve('./public/projects/m4padeltour');
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

async function run() {
  console.log('Launching browser for M4 Padel Tour...');
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
    { url: 'https://m4padeltour.com/', name: '01_inicio_hero.png', title: 'Inicio - M4 Padel Tour' },
    { url: 'https://m4padeltour.com/torneos', name: '02_torneos.png', title: 'Torneos y Circuitos' },
    { url: 'https://m4padeltour.com/ranking', name: '03_ranking.png', title: 'Ranking de Jugadores' },
    { url: 'https://m4padeltour.com/jugadores', name: '04_jugadores.png', title: 'Comunidad de Jugadores' },
    { url: 'https://m4padeltour.com/clubes', name: '05_clubes.png', title: 'Sedes y Clubes Afiliados' }
  ];

  for (const item of pages) {
    console.log(`Navigating to ${item.url}...`);
    try {
      await page.goto(item.url, { waitUntil: 'networkidle', timeout: 30000 });
      await page.waitForTimeout(2000); // allow animations and data load
      const outPath = path.join(targetDir, item.name);
      await page.screenshot({ path: outPath, fullPage: false });
      console.log(`Saved screenshot: ${outPath}`);
    } catch (err) {
      console.error(`Failed to capture ${item.url}:`, err.message);
    }
  }

  await browser.close();
  console.log('Finished capturing M4 Padel Tour screenshots!');
}

run().catch(console.error);
