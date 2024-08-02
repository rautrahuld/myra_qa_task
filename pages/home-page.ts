import { expect, Locator, Page } from "@playwright/test";

export class HomePage {
    readonly page: Page;
    readonly logoutButton: Locator;
    readonly errorElement: Locator;

    constructor(page: Page) {
        this.page = page;
        this.logoutButton = page.getByRole('link', { name: 'Logout' });
        this.errorElement = page.locator('.alert-danger');
    }

    // Clicks the logout button on the home page.
    async logout() {
        await this.logoutButton.click();
    }

    async verifyErrorMessage(message: string) {
        /**
         * Verifies that an error message with the provided text is displayed on the home page.
         * @param {string} message The expected error message
         */
        expect(this.errorElement.isVisible()).toBeTruthy();
        await expect(this.errorElement).toContainText(message);
    }
}