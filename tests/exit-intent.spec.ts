import { test, expect } from '@playwright/test';

test.describe('Exit Intent', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/exit_intent');
  });

  test('should display and close the exit intent modal', async ({ page }) => {
    // Verify that the Exit Intent heading is visible
    const heading = page.getByRole('heading', { name: 'Exit Intent' });
    await expect(heading).toBeVisible();

    // Choose the method for triggering exit intent
    const useMouseMovement = true; // Set to false to use dispatchEvent

    if (useMouseMovement) {
        await page.mouse.move(200, 200);
        await page.waitForTimeout(100);
        await page.mouse.move(200, 10);
        await page.waitForTimeout(100);
        await page.mouse.move(10, 10);
        await page.waitForTimeout(50);
        await page.mouse.move(-10, 10);
    } else {
        await page.locator('html').dispatchEvent('mouseleave');
    }

    // Verify the Exit Intent modal content
    const modalHeading = page.getByRole('heading', { name: 'This is a modal window' });
    await expect(modalHeading).toBeVisible();

    const modalText = page.getByText("It's commonly used to");
    await expect(modalText).toBeVisible();

    // Verify that the Close button works and the modal is closed
    const closeButton = page.getByText('Close');
    await closeButton.click();
    await expect(modalHeading).toBeHidden();
  });
});
