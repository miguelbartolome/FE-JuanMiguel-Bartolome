import { Locator, Page, expect } from '@playwright/test';;

export class DynamicControlsPage {
  private readonly page: Page;
  
  readonly dynamicControlsHeader: Locator;
  readonly dynamicControlsText: Locator;

  readonly removeAddHeader: Locator;
  readonly checkboxText: Locator;
  readonly checkbox: Locator;
  readonly removeButton: Locator;
  readonly addButton: Locator;
  readonly waitForItText: Locator;
  readonly itsGoneText: Locator;
  readonly itsBackText: Locator;

  readonly separator: Locator;

  readonly enableDisableHeader: Locator;
  readonly enableButton: Locator;
  readonly disableButton: Locator;
  readonly textbox: Locator;
  readonly itsEnabledText: Locator;
  readonly itsDisabledText: Locator;

  constructor(page: Page) {
    this.page = page;
    
    this.dynamicControlsHeader = page.getByRole(
        'heading', { name: 'Dynamic Controls' });
    this.dynamicControlsText = page.getByText('This example demonstrates');

    this.removeAddHeader = page.getByRole('heading', { name: 'Remove/add' });
    this.checkboxText = page.getByText('A checkbox');
    this.checkbox = page.getByRole('checkbox');
    this.removeButton = page.getByRole('button', { name: 'Remove' });
    this.addButton = page.getByRole('button', { name: 'Add' });
    this.waitForItText = page.getByText('Wait for it...');
    this.itsGoneText = page.getByText("It's gone!");
    this.itsBackText = page.getByText("It's back!");

    this.enableDisableHeader = page.getByRole(
        'heading', { name: 'Enable/disable' });
    this.enableButton = page.getByRole('button', { name: 'Enable' });
    this.disableButton = page.getByRole('button', { name: 'Disable' });
    this.textbox = page.getByRole('textbox');
    this.itsEnabledText = page.getByText("It's enabled!");
    this.itsDisabledText = page.getByText("It's disabled!");
  }

  async goto(): Promise<void> {
    await this.page.goto('https://the-internet.herokuapp.com/dynamic_controls');
  }

  async verifyHeader(header: Locator): Promise<void> {
    await expect(header).toBeVisible();
  }

  async verifyCheckboxTextVisible(): Promise<void> {
    await expect(this.checkboxText).toBeVisible();
  }

  async checkCheckbox(): Promise<void> {
    await this.checkbox.check();
    await expect(this.checkbox).toBeChecked();
  }

  async clickRemoveButton(): Promise<void> {
    await this.removeButton.click();
    await expect(this.waitForItText).toBeVisible();
    await expect(this.itsGoneText).toBeVisible();
  }

  async verifyCheckboxNotVisible(): Promise<void> {
    await expect(this.checkboxText).not.toBeVisible();
    await expect(this.checkbox).not.toBeVisible();
  }

  async clickAddButton(): Promise<void> {
    await this.addButton.click();
    await expect(this.waitForItText.first()).toBeVisible();
    await expect(this.itsBackText).toBeVisible();
  }

  async clickEnableButton(): Promise<void> {
    await this.enableButton.click();
    await expect(this.waitForItText).toBeVisible();
    await expect(this.itsEnabledText).toBeVisible();
  }

  async clickDisableButton(): Promise<void> {
    await this.disableButton.click();
    await expect(this.waitForItText.first()).toBeVisible();
    await expect(this.itsDisabledText).toBeVisible();
  }

  async verifyTextboxState(expectedState: 'enabled' | 'disabled'): Promise<void> {
    if (expectedState === 'enabled') {
      await expect(this.textbox).toBeEnabled();
    } else {
      await expect(this.textbox).toBeDisabled();
    }
  }

  async fillTextbox(text: string): Promise<void> {
    await this.textbox.fill(text);
    await expect(this.textbox).toHaveValue(text);
  }
}
