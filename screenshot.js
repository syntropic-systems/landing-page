import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function takeScreenshot(url) {
  const browser = await puppeteer.launch({ 
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  try {
    const page = await browser.newPage();
    
    // Set viewport to desktop size
    await page.setViewport({ 
      width: 1920, 
      height: 1080,
      deviceScaleFactor: 1
    });
    
    console.log(`Navigating to ${url}...`);
    await page.goto(url, { 
      waitUntil: 'networkidle0',
      timeout: 30000 
    });
    
    // Wait for React to load and animations to settle
    console.log('Waiting for content to load...');
    await page.waitForSelector('main', { timeout: 15000 });
    await new Promise(resolve => setTimeout(resolve, 10000));
    
    // Check if content is loaded
    const sections = await page.$$eval('section', sections => sections.length);
    console.log(`Found ${sections} sections on the page`);
    
    // Scroll through the entire page slowly to trigger all animations and lazy loading
    console.log('Scrolling through page to trigger content loading...');
    const scrollHeight = await page.evaluate(() => document.body.scrollHeight);
    const steps = 10;
    const stepSize = scrollHeight / steps;
    
    for (let i = 0; i <= steps; i++) {
      await page.evaluate((y) => {
        window.scrollTo(0, y);
      }, i * stepSize);
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
    
    // Wait for all images to load
    await page.evaluate(() => {
      return Promise.all(Array.from(document.images).map(img => {
        if (img.complete) return Promise.resolve();
        return new Promise(resolve => {
          img.addEventListener('load', resolve);
          img.addEventListener('error', resolve);
        });
      }));
    });
    
    // Final scroll back to top
    await page.evaluate(() => {
      window.scrollTo(0, 0);
    });
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Create screenshots directory if it doesn't exist
    const screenshotsDir = path.join(__dirname, 'screenshots');
    if (!fs.existsSync(screenshotsDir)) {
      fs.mkdirSync(screenshotsDir);
    }
    
    // Generate filename with timestamp
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = `cloud-glance-${timestamp}.png`;
    const filepath = path.join(screenshotsDir, filename);
    
    console.log('Taking full page screenshot...');
    await page.screenshot({ 
      path: filepath,
      fullPage: true,
      type: 'png'
    });
    
    console.log(`Screenshot saved to: ${filepath}`);
    
    // Also take a viewport screenshot
    const viewportFilename = `cloud-glance-viewport-${timestamp}.png`;
    const viewportFilepath = path.join(screenshotsDir, viewportFilename);
    
    await page.screenshot({ 
      path: viewportFilepath,
      fullPage: false,
      type: 'png'
    });
    
    console.log(`Viewport screenshot saved to: ${viewportFilepath}`);
    
  } catch (error) {
    console.error('Error taking screenshot:', error);
  } finally {
    await browser.close();
  }
}

// Get URL from command line arguments
const url = process.argv[2];

if (!url) {
  console.error('Please provide a URL as an argument');
  console.error('Usage: node screenshot.js <url>');
  process.exit(1);
}

takeScreenshot(url);