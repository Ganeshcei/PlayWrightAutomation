import { Browser, BrowserContext, chromium, Page } from "playwright";
import { testConfig } from "../../testConfig";
import { LoginPageObjects } from "../../PageFactory/objectRepo/LoginPageObjects";
import { LoginPage } from "../../PageFactory/pageRepo/Login";


describe('Launch Browser',()=> {

let browser: Browser;
let context: BrowserContext;
let page: Page;
let Login: LoginPage;

let loginPageObjects = new LoginPageObjects();

beforeAll(async () =>{
     browser = await chromium.launch({
        headless: false
     })
     context = await browser.newContext();
     page = await context.newPage();  
     Login= new LoginPage(page); 
     
})
test(`Login Function`, async () => {
   await Login.navigateToURL();
   await Login.loginToApplication();
});

afterAll(async () =>{
    context.close();
    browser.close();
}
)
}







)