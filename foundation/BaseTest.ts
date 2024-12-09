/**
 * These tests are executed in Playwright environment that launches the browser and provides a fresh page to each test.
 * BaseTest.ts is extended to all the page object classes.
 */

import { TestInfo, test as baseTest } from '@playwright/test';
import { LoginPage } from '@pages/LoginPage';
import { HomePage } from '@pages/HomePage';
import { WebActions } from '@lib/WebActions';
import { ContactPage } from '@pages/ContactPage';
import { JoinSubscriptionPage } from '@pages/JoinSubscriptionPage';
import { SalesOrderPage } from '@pages/SalesOrderPage';
import { ReceiptPage } from '@pages/ReceiptPage';
import { NewContactPage } from '@pages/NewContactPage';


const test = baseTest.extend<{
    webActions: WebActions;
    loginPage: LoginPage;
    homePage: HomePage;
    contactPage: ContactPage;
    joinSubPage: JoinSubscriptionPage;
    salesOrderPage: SalesOrderPage;
    receiptPage: ReceiptPage;
    newContactPage: NewContactPage;
}>({
    webActions: async ({ page, context }, use) => {
        await use(new WebActions(page, context));
    },
    loginPage: async ({ page, context }, use) => {
        await use(new LoginPage(page, context));
    },
    homePage: async ({page, context}, use)=>{
        await use(new HomePage(page, context))
    },
    contactPage: async ({page, context}, use)=>{
        await use(new ContactPage(page, context))
    },
    joinSubPage: async ({page, context}, use)=>{
        await use(new JoinSubscriptionPage(page, context))
    },
    salesOrderPage: async ({page, context}, user) => {
        await user(new SalesOrderPage(page, context))
    },
    receiptPage: async ({page, context}, user) => {
        await user(new ReceiptPage(page, context))
    },
    newContactPage: async ({page, context}, user) => {
        await user(new NewContactPage(page, context))
    }
});

export default test;