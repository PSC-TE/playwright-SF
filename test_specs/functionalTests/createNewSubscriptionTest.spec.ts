import test from '@lib/BaseTest';
import commonSetup from 'test_specs/commonSetup';
import { testConfig } from 'testConfig';
import { CommonUtils } from 'utils/commonUtils';

commonSetup();

const firstName: string = CommonUtils.generateRandomString(5)
const lastName: string = CommonUtils.generateRandomString(5);
const fullName: string = `${firstName} ${lastName}`

// test.describe('new contact e2e tests', async() => {
    test('create new contact and add subscription test', async({ homePage, webActions, contactPage, joinSubPage, salesOrderPage, receiptPage, newContactPage }) => {
        await homePage.clickOnContactPageLink();
        await contactPage.clickOnNewContactButton();
        await contactPage.createNewContact(firstName , lastName);
        await contactPage.verifyContactNameIsDisplayed(fullName);

        await contactPage.clickOnJoinButton();
        await joinSubPage.fillInJoinSubscriptionDetails(testConfig.membershipType, testConfig.country, testConfig.zipNumber);
        await joinSubPage.fillInJoinSubscriptionAdvancedDetails(testConfig.licenseNumber, testConfig.country, testConfig.state, testConfig.startDate, testConfig.endDate);
        await joinSubPage.submitCreateSalesOrder(testConfig.subscriptionPlan);

        await salesOrderPage.clickOnReadyForPayment();
        await salesOrderPage.clickOnApplyPayment();
        await salesOrderPage.fillInPaymentDetails();
        await salesOrderPage.fillCreditCardDetails(testConfig.creditCardNumber, testConfig.mmyy, testConfig.cvc);
        await salesOrderPage.clickOnProcessPaymentButton();

        await receiptPage.verifyPageTitle(/^\d+\s\|\sReceipt\s\|\sSalesforce$/);
        await receiptPage.verifyCustomerName(fullName);
        await receiptPage.verifyAmountValue('$630.00');
        await receiptPage.clickOnContactPageLink(fullName);

        await newContactPage.clickOnShowAllLink();

        await newContactPage.clickOnSalesOrderLink();
        await newContactPage.verifySalesOrderStatus('Closed', 'Membership Join', '$630.00');

        await webActions.navigateToPreviousPage();

        // await newContactPage.clickOnShowAllLink();

        await newContactPage.clickOnMembershipLink();
        // await newContactPage.verifyMembershipStatus('Active');


    });
// });
