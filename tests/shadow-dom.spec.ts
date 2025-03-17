import { test, expect } from '@playwright/test';

test.describe('Shadow DOM Elements', () => {
  
  test.beforeEach(async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/shadowdom');
  });

  test('should verify text inside Shadow DOM', async ({ page }) => {
    // Target <span> inside Shadow DOM
    const firstText = page.locator('my-paragraph span');
    await expect(firstText).toBeVisible();

    // Target list items inside Shadow DOM
    const secondText = page.locator('my-paragraph li').getByText("Let's have some different");
    await expect(secondText).toBeVisible();

    const listText = page.locator('my-paragraph li').getByText('In a list!');
    await expect(listText).toBeVisible();
  });
});
