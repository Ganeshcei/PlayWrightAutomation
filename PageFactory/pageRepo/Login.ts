import { LoginPageObjects } from "../objectRepo/LoginPageObjects";
import { WebActions } from "../../lib/webActions";
import type { Page } from "playwright";
import {testConfig } from '../../testConfig';

let webActions: WebActions;

export class LoginPage{

    private page: Page;
 
    constructor(page: Page)
    {
        this.page = page;
        webActions = new WebActions(this.page);
    }

    loginPageObjects = new LoginPageObjects();
   
//Web Actions
    async navigateToURL()
    {
        await webActions.navigateToURL(testConfig.dev);
    }

    async loginToApplication(): Promise<void> {
        await webActions.enterElementText(this.loginPageObjects.EMAIL_EDITBOX_ID, testConfig.username);
        await webActions.enterElementText(this.loginPageObjects.PASSWORD_EDITBOX_ID, testConfig.password);
        await webActions.clickElement(this.loginPageObjects.SUBMIT_BUTTON_ID);
    }
    
}