import { Page, BrowserContext, Locator, expect } from '@playwright/test';
import { WebActions } from "@lib/WebActions";

export class ReceiptPage extends WebActions {
    readonly page: Page;
    readonly context: BrowserContext;
    readonly CUSTOMER_NAME_FIELD: Locator;
    readonly AMOUNT_FIELD: Locator;
    readonly CONTACT_PAGE_LINK: Locator;

    constructor(page: Page, context: BrowserContext) {
        super(page, context)
        this.page = page;
        this.context = context;
        this.CUSTOMER_NAME_FIELD = page.locator('records-highlights2');
        this.AMOUNT_FIELD = page.locator('records-highlights2');
        // this.CONTACT_PAGE_LINK = page.getByRole('link', { name: customerName, exact: true });

    }

    getContactPageLink(customerName: string): Locator {
        return this.page.getByRole('link', { name: customerName, exact: true });
    }

    async verifyPageTitle(title: RegExp): Promise<void> {
        await expect(this.page).toHaveTitle(title);
    }

    async verifyCustomerName(customerName: string){
        await expect(this.CUSTOMER_NAME_FIELD).toContainText(customerName);
    }

    async verifyAmountValue(amount: string){
        await expect(this.AMOUNT_FIELD).toContainText(amount);
    }

    async clickOnContactPageLink(customerName: string){
        await this.clickElement(this.getContactPageLink(customerName), 200);
    }
}