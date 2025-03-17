import { test, expect } from '@playwright/test';

test.describe('Nested Frames', () => {
  
  test.beforeEach(async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/nested_frames');
  });

  test('should verify text inside nested frames', async ({ page }) => {
    // Store frame locators
    const topFrame = page.frameLocator('frame[name="frame-top"]');
    const leftFrame = topFrame.frameLocator('frame[name="frame-left"]');
    const middleFrame = topFrame.frameLocator('frame[name="frame-middle"]');
    const rightFrame = topFrame.frameLocator('frame[name="frame-right"]');
    const bottomFrame = page.frameLocator('frame[name="frame-bottom"]');

    // Verify the text inside each frame
    await expect(leftFrame.getByText('LEFT')).toBeVisible();
    await expect(middleFrame.getByText('MIDDLE')).toBeVisible();
    await expect(rightFrame.getByText('RIGHT')).toBeVisible();
    await expect(bottomFrame.getByText('BOTTOM')).toBeVisible();
  });
});
