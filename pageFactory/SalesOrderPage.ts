import { expect, Locator, Page, BrowserContext, FrameLocator } from '@playwright/test';
import { WebActions } from "@lib/WebActions";


export class SalesOrderPage extends WebActions {
    readonly page: Page;
    readonly context: BrowserContext;
    readonly READY_FOR_PAYMENT: Locator;
    readonly APPLY_PAYMENT: Locator;
    readonly IFRAME: Locator;
    readonly IFRAME_APPLY_PAYMENT: Locator;
    readonly IFRAME_PAYMENT_METHOD: Locator;
    readonly PAYMENT_IFRAME: Locator;
    readonly CREDIT_CARD_NUMBER: Locator;
    readonly CREDIT_CARD_EXPIRY: Locator;
    readonly CREDIT_CARD_CVC: Locator;
    readonly CANCEL_BUTTON: Locator;
    readonly PROCESS_PAYMENT_BUTTON: Locator;
    readonly CONTENTFRAME;
    readonly PAYMENT_CONTENT;

    constructor(page: Page, context: BrowserContext) {
        super(page, context);
        this.page = page;
        this.context = context;
        this.READY_FOR_PAYMENT = page.getByRole('button', { name: 'Ready For Payment' })
        this.APPLY_PAYMENT = page.getByRole('button', { name: 'Apply Payment' });
        this.IFRAME = this.page.locator('iframe[name^="vfFrameId_"][height="100%"]');
        this.CONTENTFRAME = this.IFRAME.contentFrame();
        this.CANCEL_BUTTON = this.CONTENTFRAME.getByRole('button', { name: 'Cancel' })
        this.IFRAME_PAYMENT_METHOD = this.CONTENTFRAME.getByLabel('Payment Type');
        this.IFRAME_APPLY_PAYMENT = this.CONTENTFRAME.getByRole('button', { name: 'Apply Payment' });
        this.PAYMENT_IFRAME = this.CONTENTFRAME.locator('iframe[title="Payment Custom Form"]').contentFrame().locator('#paymentElementIframe-0').contentFrame().locator('iframe[name^="__privateStripeFrame"][title="Secure payment input frame"]');
        this.PAYMENT_CONTENT = this.PAYMENT_IFRAME.contentFrame();
        this.CREDIT_CARD_NUMBER = this.PAYMENT_CONTENT.getByPlaceholder('1234 1234 1234');
        this.CREDIT_CARD_EXPIRY = this.PAYMENT_CONTENT.getByPlaceholder('MM / YY');
        this.CREDIT_CARD_CVC = this.PAYMENT_CONTENT.getByPlaceholder('CVC');
        this.PROCESS_PAYMENT_BUTTON = this.CONTENTFRAME.getByRole('button', { name: 'Process Payment' });

    }

    async clickOnReadyForPayment(){
        await this.clickElement(this.READY_FOR_PAYMENT, 2000);
    }

    async clickOnApplyPayment(){
        await this.delay(2000)
        await this.clickElement(this.APPLY_PAYMENT, 2000);
    }

    async fillInPaymentDetails(){
        await this.IFRAME_PAYMENT_METHOD.selectOption({label: 'Online Payment'});
        await this.clickElement(this.IFRAME_APPLY_PAYMENT, 200);
        await this.delay(3000);
    }

    async fillCreditCardDetails(cardNumber: string, mmyy: string, cvc: string){
        await this.fillTextBox(this.CREDIT_CARD_NUMBER, cardNumber)
        await this.fillTextBox(this.CREDIT_CARD_EXPIRY, mmyy);
        await this.fillTextBox(this.CREDIT_CARD_CVC, cvc);
    }

    async clickOnProcessPaymentButton(){
        await this.clickElement(this.PROCESS_PAYMENT_BUTTON, 200);
    }


}
