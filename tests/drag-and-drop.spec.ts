import { test, expect } from '@playwright/test';

test.describe('Drag and Drop', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/drag_and_drop');
  });

  test('should allow to drag column A to column B and verify the positions', async ({ page }) => {
    // Verify that the Drag and Drop heading is visible
    const heading = page.getByRole('heading', { name: 'Drag and Drop' });
    await expect(heading).toBeVisible();

    // Locate the draggable elements
    const dragA = page.locator('#column-a');
    const dragB = page.locator('#column-b');

    // Locate the headers inside each column
    const headerA = dragA.locator('header');
    const headerB = dragB.locator('header');

    // Perform the drag and drop operation
    await dragA.dragTo(dragB);

    // Verify the text in each column after the drag-and-drop operation
    await expect(headerA).toHaveText('B');
    await expect(headerB).toHaveText('A');
  });
});