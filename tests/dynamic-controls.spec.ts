import { expect, test } from '@playwright/test';
import { DynamicControlsPage } from '../pages/DynamicControlsPage';

let dynamicControlsPage: DynamicControlsPage;

test.describe('Dynamic Controls Page', () => {
    
    test.beforeEach(async ({ page }) => {
        dynamicControlsPage = new DynamicControlsPage(page);
        await dynamicControlsPage.goto();

        // Ensure key elements are visible before starting tests
        await expect(dynamicControlsPage.dynamicControlsHeader).toBeVisible();
        await expect(dynamicControlsPage.dynamicControlsText).toBeVisible();
    });

    test('should allow to remove/add the checkbox', async () => {  
        // Verify add/remove header
        await dynamicControlsPage.verifyHeader(dynamicControlsPage.removeAddHeader);
    
        // Verify checkbox text is visible
        await dynamicControlsPage.verifyCheckboxTextVisible();
    
        // Check checkbox
        await dynamicControlsPage.checkCheckbox();
    
        // Click remove button
        await dynamicControlsPage.clickRemoveButton();
    
        // Verify checkbox is not visible
        await dynamicControlsPage.verifyCheckboxNotVisible();
    
        // Click add button
        await dynamicControlsPage.clickAddButton();
    
        // Verify checkbox text is visible again
        await dynamicControlsPage.verifyCheckboxTextVisible();
    
        // Check checkbox again
        await dynamicControlsPage.checkCheckbox();
    });

    test('should allow to enable/disable the input text field', async () => {  
        // Verify enable/disable header
        await dynamicControlsPage.verifyHeader(dynamicControlsPage.enableDisableHeader);

        // Verify textbox is disabled
        await dynamicControlsPage.verifyTextboxState('disabled');

        // Click enable button
        await dynamicControlsPage.clickEnableButton();

        // Verify textbox is enabled
        await dynamicControlsPage.verifyTextboxState('enabled');

        // Fill text box and verify text
        const inputText = 'bsport';
        await dynamicControlsPage.fillTextbox(inputText);

        // Click disable button
        await dynamicControlsPage.clickDisableButton();

        // Verify textbox is disabled
        await dynamicControlsPage.verifyTextboxState('disabled');
    });
});
