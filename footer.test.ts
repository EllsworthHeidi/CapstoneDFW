import { basePage } from "./basePage";
const chromedriver = require("chromedriver");
import { WebDriver, Builder, Capabilities } from "selenium-webdriver";
const driver: WebDriver = new Builder()
  .withCapabilities(Capabilities.chrome())
  .build();
const page = new basePage(driver);
//this is written to go through all 18 footers if needs be. Just would need to write a forEach and an array in a seperate file. 
  let check;
test("check footer 1", async () => {
  await page.navigate();
  check = await page.getFooterText();
  expect(check[0]).toBe("Flights"); 
});

test("check footer 2", async () => {
   expect(check[1]).toBe("Airlines"); 
});

test("check footer 3", async () => {
  expect(check[2]).toBe("Park Now"); 
});

test("check footer 4", async () => {
  expect(check[3]).toBe("Security Wait Times"); 
});

test("check footer 5", async () => {
  expect(check[4]).toBe("Map"); 
});

test("check footer 6", async () => {
  expect(check[5]).toBe("Shop/Dine/Relax"); 
});

afterAll(async () => {
  await driver.quit();
});

//write an action to have the page go to the top after going throught the footers
