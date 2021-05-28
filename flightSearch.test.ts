import {basePage} from "./basePage";

import{WebDriver, Builder, Capabilities, By} from "selenium-webdriver";
const driver: WebDriver = new Builder()
    .withCapabilities(Capabilities.chrome())
    .build();
const page = new basePage(driver);

//import{airlineSrch} from "./airlineSrch";

 beforeAll(async ()=>{
    await page.navigate();
 });
 //If you search for a specific flight this will not work as flight # change daily. Search for any flights containing a #
  test("Flight Number Search", async() => {
    await page.doSearch("2");
    expect (await page.getResults()).toContain("2");
  });
 
  test("Destination Search", async() => {
    await page.doSearch("Salt Lake City");
    expect (await page.getResults()).toContain("Salt Lake City");
  });


  //Since delta is not searched by word but by the Logo, had to come up with a way for it verify through an image. 
  //The page was not clearing before searching for Delta. Had to add a clear to make it work
   test("Airline Search", async() =>{
    await page.clear()
    await page.doSearch("Delta");
    let firstImage = await (await driver).findElement(By.xpath('(//img[contains(@src, "deltalogo.png")])[1]'))
    let src = await firstImage.getAttribute('src')
    expect(src).toContain('deltalogo.png')
  });
afterAll(async () => {
    await driver.quit();
  });


  