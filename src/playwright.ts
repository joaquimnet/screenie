import { join } from 'path';
import { chromium } from 'playwright';

export async function screenshot(url: string) {
  let filePath: string;
  const browser = await chromium.launch(); // Or 'firefox' or 'webkit'.
  const page = await browser.newPage();
  try {
    await page.goto(url);
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    await page.waitForLoadState('networkidle', { timeout: 5000 }).catch(() => {});
    filePath = join(process.cwd(), 'screens', `${Date.now().toString()}.png`);
    await page.screenshot({
      fullPage: true,
      type: 'png',
      path: filePath,
    });
    return filePath;
  } catch (err) {
    console.error(err);
  } finally {
    await page.close();
    await browser.close();
  }
}
