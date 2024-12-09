import {test, expect} from '@playwright/test';

test('demo test', async({page}) => {
    await page.goto('https://www.google.com/');
    await page.getByLabel('Search', { exact: true }).fill("India");
    // let searchList = await page.locator("//ul[@role='listbox']//li");
    // for (let ele in searchList){
    //     if(ele.in)
    // }
    await page.getByLabel('india vs australia').click();

});