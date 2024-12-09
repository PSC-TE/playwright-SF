import { Page, BrowserContext, Locator, expect } from '@playwright/test';
import { WebActions } from "@lib/WebActions";
import { testConfig } from 'testConfig';


export class LoginPage extends WebActions {
    readonly page: Page;
    readonly context: BrowserContext;
    readonly USERNAME_EDITBOX: Locator;
    readonly PASSWORD_EDITBOX: Locator;
    readonly LOGIN_BUTTON: Locator;
    readonly PRODUCT_REGISTRATION_LINK: Locator;

    constructor(page: Page, context: BrowserContext) {
        super(page, context)
        this.page = page;
        this.context = context;
        this.USERNAME_EDITBOX = this.page.getByLabel('Username');
        this.PASSWORD_EDITBOX = this.page.getByLabel('Password');
        this.LOGIN_BUTTON = this.page.getByRole('button', { name: 'Log In to Sandbox' });
    }

    async loginToApplication(): Promise<void> { 
        await this.fillTextBox(this.USERNAME_EDITBOX, testConfig.userID);
        await this.fillTextBox(this.PASSWORD_EDITBOX, testConfig.password);
        await this.clickElement(this.LOGIN_BUTTON, 200)

    }

    async verifyPageTitle(title: string): Promise<void> {
        await expect(this.page).toHaveTitle(title);
    }

}