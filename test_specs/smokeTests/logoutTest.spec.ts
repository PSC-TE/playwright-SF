import test from '@lib/BaseTest';
import { testConfig } from 'testConfig';

let baseUrl = testConfig.qa;

test(`Verify logout page title`, async ({ homePage, webActions, loginPage }) => {
    await webActions.navigateTo(baseUrl, 500);
    await loginPage.loginToApplication();
    await webActions.delay(2000);
    await loginPage.verifyPageTitle('Home | Salesforce');
    console.log("login successful");

    await homePage.clickOnLogoutLink();
    await webActions.delay(2000);
    await loginPage.verifyPageTitle('Login | Salesforce');
    console.log('logout successful');
});

