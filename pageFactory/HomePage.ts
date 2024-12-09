import { expect, Locator, Page, BrowserContext } from '@playwright/test';
import { WebActions } from "@lib/WebActions";

export class HomePage extends WebActions{
    readonly page: Page;
    readonly context: BrowserContext;
    readonly PROFILE_BUTTON: Locator;
    readonly LOGOUT_LINK: Locator;
    readonly CONTACT_PAGE_LINK: Locator;

    constructor(page: Page, context: BrowserContext) {
        super(page, context)
        this.page = page;
        this.context = context;
        this.PROFILE_BUTTON = page.getByRole('button', { name: 'View profile' });
        this.LOGOUT_LINK = page.getByRole('link', { name: 'Log Out', exact: true });
        this.CONTACT_PAGE_LINK = page.getByRole('link', { name: 'Contacts' });
    }

    async clickOnLogoutLink(): Promise<void> {
        await this.clickElement(this.PROFILE_BUTTON, 200);
        await this.clickElement(this.LOGOUT_LINK, 200);
    }

    async clickOnContactPageLink(): Promise<void> {
        await this.clickElement(this.CONTACT_PAGE_LINK, 200);
    }

}