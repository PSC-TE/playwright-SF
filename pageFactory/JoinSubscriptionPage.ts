import { Page, BrowserContext, Locator, expect } from '@playwright/test';
import { WebActions } from "@lib/WebActions";

export class JoinSubscriptionPage extends WebActions {
    readonly page: Page;
    readonly context: BrowserContext;
    readonly MEMBERSHIP_TYPE: Locator;
    readonly ASSIGNMENT_COUNTRY: Locator;
    readonly ASSIGNMENT_ZIP: Locator;
    readonly NEXT_BUTTON: Locator;
    readonly LICENSE_NUMBER: Locator;
    readonly LICENSE_COUNTRY: Locator;
    readonly LICENSE_STATE: Locator;
    readonly LICENSE_START_DATE: Locator;
    readonly LICENSE_END_DATE: Locator;
    readonly NEXT_BUTTON_2: Locator;
    readonly SUBSCRIPTION_PLAN: Locator;
    readonly CREATE_SALES_ORDER: Locator;


    constructor(page: Page, context: BrowserContext) {
        super(page, context)
        this.page = page;
        this.context = context;
        this.MEMBERSHIP_TYPE = this.page.getByRole('combobox', { name: 'Membership Type' });
        this.ASSIGNMENT_COUNTRY = this.page.getByRole('combobox', { name: 'Membership Country Assignment' });
        this.ASSIGNMENT_ZIP = this.page.getByLabel('Membership Zip Code Assignment');
        this.NEXT_BUTTON = this.page.getByRole('button', { name: 'Next' });
        this.LICENSE_NUMBER = this.page.getByLabel('Join License Number');
        this.LICENSE_COUNTRY = this.page.getByRole('combobox', { name: 'Join License Country' });
        this.LICENSE_STATE = this.page.getByRole('combobox', { name: 'Join License State' });
        this.LICENSE_START_DATE = this.page.getByLabel('Join License Date');
        this.LICENSE_END_DATE = this.page.getByLabel('Join License Expire Date');
        this.NEXT_BUTTON_2 = this.page.getByRole('button', { name: 'Next' });
        this.SUBSCRIPTION_PLAN = this.page.getByRole('combobox', { name: 'Subscription Plans' });
        this.CREATE_SALES_ORDER = this.page.getByRole('button', { name: 'Create sales order' });
    }

    async fillInJoinSubscriptionDetails(membershipType: string, country: string, zipNumber: string){
        await this.clickElement(this.MEMBERSHIP_TYPE, 200);
        await this.selectFromDropdown(membershipType);
        await this.clickElement(this.ASSIGNMENT_COUNTRY, 200);
        await this.selectFromDropdown(country);
        await this.fillTextBox(this.ASSIGNMENT_ZIP, zipNumber);
        await expect(this.NEXT_BUTTON).toBeEnabled();
        await this.clickElement(this.NEXT_BUTTON, 200);
    }

    async fillInJoinSubscriptionAdvancedDetails(licenseNumber: string, country: string, state: string, startDate: string, endDate: string){
        await this.fillTextBox(this.LICENSE_NUMBER, licenseNumber);
        await this.clickElement(this.LICENSE_COUNTRY, 200);
        await this.selectFromDropdown(country);
        await this.clickElement(this.LICENSE_STATE, 200);
        await this.selectFromDropdown(state);
        await this.fillTextBox(this.LICENSE_START_DATE, startDate);
        await this.fillTextBox(this.LICENSE_END_DATE, endDate);
        await this.LICENSE_END_DATE.press('Enter');
        await this.clickElement(this.NEXT_BUTTON_2, 200);
    }

    async submitCreateSalesOrder(subscriptionPlan: string){
        await this.clickElement(this.SUBSCRIPTION_PLAN, 200);
        await this.selectFromDropdown(subscriptionPlan);
        await this.clickElement(this.CREATE_SALES_ORDER, 200)
        await this.delay(3000);
    }
}