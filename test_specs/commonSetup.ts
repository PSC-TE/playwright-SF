/**
 * This is commonSetup.ts file to perform such common browser actions like navigating to url and do login logout action.
 * Here we are using beforeEach() and afterEach() hooks
 * */

import test from "@lib/BaseTest";
import { testConfig } from "testConfig";
let baseUrl = testConfig.qa;

const commonSetup = () => {
  test.beforeEach(async ({ loginPage, webActions }) => {
    await webActions.navigateTo(baseUrl, 500);
    await loginPage.loginToApplication();
    console.log("login successful")
  });

  test.afterEach(async ({ homePage, webActions }) => {
    await webActions.delay(3000);
    await homePage.clickOnLogoutLink();
    console.log('logout successful');
  });
};

export default commonSetup;
