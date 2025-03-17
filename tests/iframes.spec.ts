import { test, expect } from '@playwright/test';

test.describe('IFrames Page', () => {
  
  test.beforeEach(async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/iframe');
  });

  test('should have the embedded TinyMCE Editor iframe', async ({ page }) => {
    // TinyMCE is in read-only mode because there are no more editor loads available this month
    // Locate the TinyMCE editor iframe
    const editorFrame = page.frameLocator('iframe[title="Rich Text Area"]');
    // Locate the text area inside the TinyMCE editor iframe
    const editorTextArea = editorFrame.locator('#tinymce');

    // Verify that essential menu items are visible in the editor
    await expect(page.getByRole('menuitem', { name: 'File' })).toBeVisible();
    await expect(page.getByRole('menuitem', { name: 'Edit' })).toBeVisible();
    await expect(page.getByRole('menuitem', { name: 'View' })).toBeVisible();
    await expect(page.getByRole('menuitem', { name: 'Format' })).toBeVisible();

    // Ensure the TinyMCE text area is visible inside the iframe
    await expect(editorTextArea).toBeVisible();

    // Verify that the default text inside the editor is correct
    await expect(editorTextArea).toHaveText('Your content goes here.');
  });
});
