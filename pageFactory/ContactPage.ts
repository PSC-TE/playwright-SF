import { Page, BrowserContext, Locator, expect } from '@playwright/test';
import { WebActions } from "@lib/WebActions";

export class ContactPage extends WebActions {
    readonly page: Page;
    readonly context: BrowserContext;

    readonly NEW_CONTACT: Locator;
    readonly FIRST_NAME_FIELD: Locator;
    readonly LAST_NAME_FIELD: Locator;
    readonly SAVE_BUTTON: Locator;
    readonly CONTACT_NAME_LABEL: Locator;
    readonly JOIN_BUTTON: Locator;

    constructor(page: Page, context: BrowserContext) {
        super(page, context)
        this.page = page;
        this.context = context;
        this.NEW_CONTACT = this.page.getByRole('button', { name: 'New' });
        this.FIRST_NAME_FIELD = this.page.getByPlaceholder('First Name');
        this.LAST_NAME_FIELD = this.page.getByPlaceholder('Last Name');
        this.SAVE_BUTTON = this.page.getByRole('button', { name: 'Save', exact: true });
        this.CONTACT_NAME_LABEL = this.page.locator('records-highlights2');
        this.JOIN_BUTTON = this.page.getByRole('button', { name: 'Join', exact: true });
    }

    async clickOnNewContactButton(){
        await this.clickElement(this.NEW_CONTACT, 0)
    }

    async createNewContact(firstName: string, lastName: string){
        await this.fillTextBox(this.FIRST_NAME_FIELD, firstName);
        await this.fillTextBox(this.LAST_NAME_FIELD, lastName);
        await this.clickElement(this.SAVE_BUTTON, 200);
    }

    async verifyContactNameIsDisplayed(fullName:string){
        await expect(this.CONTACT_NAME_LABEL).toContainText(fullName)
    }

    async clickOnJoinButton(){
        await this.clickElement(this.JOIN_BUTTON,200);
    }

}