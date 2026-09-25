import { chromium } from 'playwright';
import path from 'path';
import fs from 'fs';

const targetDir = path.resolve('./public/projects/m4managers');
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

async function run() {
  console.log('Launching browser for M4 Managers...');
  const browser = await chromium.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
  });
  const page = await context.newPage();

  // 1. Landing Hero
  console.log('Navigating to https://m4managers.com/...');
  await page.goto('https://m4managers.com/', { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(2000);
  await page.screenshot({ path: path.join(targetDir, '01_inicio_hero.png'), fullPage: false });
  console.log('Saved 01_inicio_hero.png');

  // 2. Click Agendar Reunión
  console.log('Looking for Agendar Reunión button...');
  const agendarBtn = page.locator('text=/Agendar/i').first();
  if (await agendarBtn.isVisible()) {
    console.log('Clicking Agendar button...');
    await agendarBtn.click();
    await page.waitForTimeout(1500);
    await page.screenshot({ path: path.join(targetDir, '02_agendar_modal_flujo.png'), fullPage: false });
    console.log('Saved 02_agendar_modal_flujo.png');

    // Check if there are options or buttons inside the modal to click for step 2
    const modalButtons = page.locator('div[role="dialog"] button, .modal button, [class*="modal"] button, [class*="drawer"] button');
    const count = await modalButtons.count();
    console.log(`Found ${count} buttons in modal`);
    
    // Try to click an option or next button in modal
    const nextOrOptionBtn = page.locator('[role="dialog"] button:visible, [class*="modal"] button:visible, [class*="dialog"] button:visible').nth(1);
    if (await nextOrOptionBtn.isVisible().catch(() => false)) {
      try {
        await nextOrOptionBtn.click({ timeout: 3000 });
        await page.waitForTimeout(1500);
        await page.screenshot({ path: path.join(targetDir, '03_agendar_calendario_horarios.png'), fullPage: false });
        console.log('Saved 03_agendar_calendario_horarios.png');
      } catch (e) {
        console.log('Could not click second button, capturing alternative view');
      }
    }
  } else {
    console.log('Agendar button not directly found by text');
  }

  // If 03 not created yet, capture another interesting view
  if (!fs.existsSync(path.join(targetDir, '03_agendar_calendario_horarios.png'))) {
    // Close modal if open or reload and take a scrolled view of landing
    await page.goto('https://m4managers.com/', { waitUntil: 'networkidle' });
    await page.evaluate(() => window.scrollBy(0, 800));
    await page.waitForTimeout(1000);
    await page.screenshot({ path: path.join(targetDir, '03_ecosistema_servicios.png') });
  }

  // 4. Servicios / Automatización IA
  console.log('Navigating to https://m4managers.com/servicios/automatizacion-ia...');
  try {
    await page.goto('https://m4managers.com/servicios/automatizacion-ia', { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForTimeout(2000);
    await page.screenshot({ path: path.join(targetDir, '04_automatizacion_ia.png'), fullPage: false });
    console.log('Saved 04_automatizacion_ia.png');
  } catch (e) {
    console.log('Error loading automatizacion-ia:', e.message);
  }

  // 5. Portfolio
  console.log('Navigating to https://m4managers.com/portfolio...');
  try {
    await page.goto('https://m4managers.com/portfolio', { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForTimeout(2000);
    await page.screenshot({ path: path.join(targetDir, '05_portfolio_marcas.png'), fullPage: false });
    console.log('Saved 05_portfolio_marcas.png');
  } catch (e) {
    console.log('Error loading portfolio:', e.message);
  }

  await browser.close();
  console.log('Finished capturing M4 Managers screenshots!');
}

run().catch(console.error);
