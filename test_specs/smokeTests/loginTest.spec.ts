// import { test, expect } from '@playwright/test';
import test from '@lib/BaseTest';
import { testConfig } from 'testConfig';
let baseUrl = testConfig.qa;

test(`Login Test to application & verifying page title`, async ({ loginPage, webActions }) => {
    await webActions.navigateTo(baseUrl, 500)
    await loginPage.loginToApplication();
    await loginPage.verifyPageTitle('Home | Salesforce')
});

