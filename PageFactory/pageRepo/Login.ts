import { LoginPageObjects } from "../objectRepo/LoginPageObjects";
import { WebActions } from "../../lib/webActions";
import { Page, selectors } from "playwright";
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

   
    
    async getAllElements(): Promise<void> {

        await this.page.waitForSelector("*", { timeout: 5000 })
        const repos = await this.page.$$("*");
       console.log(repos.length);
     
      const allUrls = await Promise.all(repos.map(async (repo, i) => {
            return await repo.innerHTML();
        }))
        
        console.log(allUrls);
        console.log(allUrls.length);
     
        var ele: string[]=[];
        let canCollect: boolean =false;
        for(var elem of allUrls)
        {
         if(elem.startsWith("<"+"input"))
         {
             canCollect=true;
         }
         if(canCollect)
         {
             if (elem.startsWith("<" + "input") || elem.startsWith("</" + "input"))
             ele.push(elem);
         }
         if (elem.startsWith("</" + "input")) {
             canCollect = false ;
         }
        }
        console.log(ele);
        console.log(ele.length);

    }

}