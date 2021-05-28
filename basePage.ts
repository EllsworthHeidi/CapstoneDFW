import { By, until, WebDriver} from "selenium-webdriver"
const chromedriver = require("chromedriver");

export class basePage {
    driver: WebDriver;
    url: string = "https://www.dfwairport.com/";

cookieBtn: By = By.xpath('//span[text()="Accept and Continue"]')
searchBar: By= By.xpath('//input[contains(@id,"downshift")]')
deltaLogo: By = By.xpath('(//img[contains(@src, "deltalogo.png")])[1]');
clearBtn: By = By.css('[aria-label="Clear search input"]');
results: By= By.css(".css-kqc6xo.eu154ya1")
passFooter: By= By.css('[class="css-155za0w epfylhp1"]')


constructor(driver: WebDriver) {
    this.driver = driver;
  };


async navigate() {
    console.log("where am i?")
    await this.driver.get(this.url)
    await this.driver.manage().window().maximize()
    await this.driver.findElement(this.cookieBtn).click();
    await this.driver.sleep(5000);
    
    //await this.driver.findElement(this.flightHeader).click();
}

async sendKey(elementBy: By, keys) {
    await this.driver.wait(until.elementLocated(elementBy));
    await (await this.driver.findElement(elementBy)).clear();
    return this.driver.findElement(elementBy).sendKeys(keys);
}
 async getHeader() {
     await this.driver.wait(until.elementLocated(this.passFooter));
     await (await this.driver.findElement(this.passFooter)).click();

 }   
async getText(elementBy: By) {
    await this.driver.wait(until.elementLocated(elementBy));
    return(await this.driver.findElement(elementBy)).getText();
}

async doSearch(text: string) {
    console.log("Search it");
    await this.driver.findElement(this.searchBar)
    return this.sendKey(this.searchBar, `${text}\n`);
}
async clear() {
    await (await this.driver.findElement(this.clearBtn)).click();
}

async getResults() {
    console.log("Results Baby");
    await this.driver.sleep(3000)
    return this.getText(this.results);
    
}
// async getFooter(num, expected) {
//     let text=await this.getFooterText();
//     expect(text[num]).toBe(expected);

//   }

  async getFooterText() {
    let text = [];
    await this.driver.wait(until.elementsLocated(this.passFooter));
 
    let elements = await this.driver.findElements(this.passFooter);
    for (let i = 0; i < elements.length; i++) {
      text.push(await elements[i].getText());
    }
    return text;
  }
}

