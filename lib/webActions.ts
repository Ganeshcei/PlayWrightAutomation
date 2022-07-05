import type { Page } from 'playwright';
import { testConfig } from '../testConfig';
const waitForElement = testConfig.waitForElement;

export class WebActions {
    private page: Page;
    constructor(page: Page) {
        this.page = page;
    }

    async navigateToURL(url: string) {
       await this.page.goto(url);
    }

    async waitForElementAttached(locator: string): Promise<void> {
        await this.page.waitForSelector(locator);
    }

    async waitForPageNavigation(event: string): Promise<void> {
        switch (event.toLowerCase()) {
            case `networkidle`:
                await this.page.waitForNavigation({ waitUntil: `networkidle`, timeout: waitForElement });
                break;
            case `load`:
                await this.page.waitForNavigation({ waitUntil: `load`, timeout: waitForElement });
                break;
            case `domcontentloaded`:
                await this.page.waitForNavigation({ waitUntil: `domcontentloaded`, timeout: waitForElement });
        }
    }

    async delay(time: number): Promise<void> {
        return new Promise(function (resolve) {
            setTimeout(resolve, time);
        });
    }

    async clickElement(locator: string): Promise<void> {
        await this.waitForElementAttached(locator);
        await this.page.click(locator);
    }

    async clickElementJS(locator: string): Promise<void> {
        await this.waitForElementAttached(locator);
        await this.page.$eval(locator, (element: HTMLElement) => element.click());
    }



    async enterElementText(locator: string, text: string): Promise<void> {
       // await this.waitForElementAttached(locator);
        await this.page.fill(locator, text);
    }

    async dragAndDrop(dragElementLocator: string, dropElementLocator: string): Promise<void> {
        await this.waitForElementAttached(dragElementLocator);
        await this.waitForElementAttached(dropElementLocator);
        await this.page.dragAndDrop(dragElementLocator, dropElementLocator);
    }

    async keyPress(locator: string, key: string): Promise<void> {
        this.page.press(locator, key);
    }
 

    async verifyJSElementValue(locator: string, text: string): Promise<void> {
        await this.waitForElementAttached(locator);
        const textValue = await this.page.$eval(locator, (element: HTMLInputElement) => element.value);
        expect(textValue.trim()).toBe(text);
    }

  

    async verifyElementIsDisplayed(locator: string, errorMessage: string): Promise<void> {
        await this.page.waitForSelector(locator, { state: `visible`, timeout: waitForElement })
            .catch(() => { throw new Error(`${errorMessage}`); });
      
    }
}


