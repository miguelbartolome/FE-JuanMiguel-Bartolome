import { test, expect } from '@playwright/test';
import path from 'path';
import os from 'os';
import fs from 'fs';

test.describe('Secure File Download', () => {
  
  test.beforeEach(async ({ page }) => {
    await page.goto('https://admin:admin@the-internet.herokuapp.com/download_secure');
  });

  test('should download the first available file and verify its existence', async ({ page }) => {
    // Find the first file link dynamically
    const firstFileLink = page.locator('a[href^="download_secure/"]').first();
    await expect(firstFileLink).toBeVisible();

    // Wait for the download event
    const downloadPromise = page.waitForEvent('download');

    // Click the first file link
    await firstFileLink.click();

    // Wait for the download to complete
    const download = await downloadPromise;

    // Define the save path (Desktop)
    const desktopPath = path.join(os.homedir(), 'Desktop', download.suggestedFilename());

    // Save the downloaded file to the Desktop
    await download.saveAs(desktopPath);

    // Verify that the file exists
    expect(fs.existsSync(desktopPath)).toBeTruthy();

    // Delete the file after verification
    fs.unlinkSync(desktopPath);
    expect(fs.existsSync(desktopPath)).toBeFalsy();
  });
});
