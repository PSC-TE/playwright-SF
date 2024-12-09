import test from '@lib/BaseTest';
import commonSetup from 'test_specs/commonSetup';

commonSetup();

test('login-logout test with hooks', async({ webActions, loginPage }) => {

    await webActions.delay(2000);
    await loginPage.verifyPageTitle("Home | Salesforce"); 

});