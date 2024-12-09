import { Page, BrowserContext, Locator, expect } from '@playwright/test';
import { WebActions } from "@lib/WebActions";

export class NewContactPage extends WebActions {
    readonly page: Page;
    readonly context: BrowserContext;
    readonly SHOW_ALL_LINK: Locator;
    readonly MEMBERSHIP_LINK: Locator;
    readonly MEMBERSHIP_STATUS: Locator;
    readonly SALES_ORDER_LINK: Locator;
    readonly SALES_ORDER_STATUS: Locator;

    constructor(page: Page, context: BrowserContext) {
        super(page, context)
        this.page = page;
        this.context = context;
        this.SHOW_ALL_LINK = page.getByRole('link', { name: /Show All \(\d+\)/ });
        this.SALES_ORDER_LINK = page.getByRole('link', { name: /Sales Orders \(\d+\)/ })
        this.MEMBERSHIP_LINK = page.getByRole('link', { name: /Memberships \(\d+\)/ });
        this.MEMBERSHIP_STATUS = page.getByLabel('Status', { exact: true }).locator('a').nth(0);
        this.SALES_ORDER_STATUS = page.getByRole('grid');
    }


    async clickOnShowAllLink(){
        await this.clickElement(this.SHOW_ALL_LINK, 200);
        await this.delay(5000);
    };

    async clickOnMembershipLink(){
        await this.clickElement(this.MEMBERSHIP_LINK, 5000);
    };

    async clickOnSalesOrderLink(){
        await this.clickElement(this.SALES_ORDER_LINK, 5000);
    };

    async verifyMembershipStatus(status: string){
        await expect(this.MEMBERSHIP_STATUS).toContainText(status);
    }

    async verifySalesOrderStatus(status: string, membership:string, price: string){
        await expect(this.SALES_ORDER_STATUS).toContainText(status);
        await expect(this.SALES_ORDER_STATUS).toContainText(membership);
        await expect(this.SALES_ORDER_STATUS).toContainText(price);
    }
}