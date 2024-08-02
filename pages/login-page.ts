import { expect, Locator, Page } from "@playwright/test";

export class LoginPage {
    readonly page: Page;
    readonly letMeHackButton: Locator;
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;
    readonly pageHeadingLocator: Locator;

    constructor(page: Page) {
        this.page = page;
        this.letMeHackButton = page.getByRole('button', { name: 'Let me hack!' });
        this.usernameInput = page.getByTestId('username');
        this.passwordInput = page.getByTestId('password');
        this.loginButton = page.getByTestId('submit');
        this.pageHeadingLocator = page.locator('h1');
    }

    /**
     * Navigates to the login page and verifies the presence of the expected heading.
     * @param {string} url The URL of the login page
     */
    async navigateTo(url: string) {
        await this.page.goto(url);
        await expect(this.pageHeadingLocator).toContainText('Welcome to Restful Booker Platform');
        await this.letMeHackButton.click();
    }

    /**
     * Fills the username and password fields and clicks the login button.
     * @param {string} username The username to enter
     * @param {string} password The password to enter
     */
    async login(username: string, password: string) {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }
}