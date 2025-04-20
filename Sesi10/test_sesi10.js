const { Builder, By, until, Options } = require("selenium-webdriver");
const assert = require('assert');
const chrome = require ('selenium-webdriver/chrome');
const firefox = require ('selenium-webdriver/firefox');

describe('Browser Test', function() {
    let driver;

    beforeEach(async function () {
        console.log("Test Case Dimulai")
    });

    afterEach(async function () {
        console.log("Test Case Selesai")
    });
    
    it('Visit SauceDemo with Google Chrome and check login', async function () {
        this.timeout(30000);

        options = new chrome.Options();
        options.addArguments("--headless");
        driver = await new Builder()
        .forBrowser('chrome')
        .setChromeOptions(options)
        .build();

        await driver.get('https://www.saucedemo.com/');
        const title = await driver.getTitle();
        console.log("Test Case Chrome")
        
        //Check Login Succes
        let inputUsername = await driver.findElement(By.xpath('//*[@id="user-name"]'));
        let inputPassword = await driver.findElement(By.xpath('//*[@id="password"]'));
        let buttonLogin = await driver.findElement(By.xpath('//*[@id="login-button"]'));
        await inputUsername.sendKeys('standard_user');
        await inputPassword.sendKeys('secret_sauce');
        await buttonLogin.click();

        let textAppLogo = await driver.findElement(By.xpath('//*[@id="header_container"]/div[1]/div[2]/div'));
        let logotext = await textAppLogo.getText();
        assert.strictEqual(title, 'Swag Labs');

        let buttonCart = await driver.wait(
            until.elementLocated(By.xpath('//*[@id="shopping_cart_container"]/a')),
            2000
        );

        await buttonCart.isDisplayed();

        // Dropdown "Sort By"
        let dropdown = await driver.wait(
            until.elementLocated(By.xpath('//*[@id="header_container"]/div[2]/div/span/select')), 
            2000);

        let sortDropdown = await driver.findElement(By.xpath('//*[@id="header_container"]/div[2]/div/span/select'));

        // Sort By "A to Z" 
        await sortDropdown.findElement(By.xpath('//*[@id="header_container"]/div[2]/div/span/select/option[1]')).click();
    
        await driver.sleep(2000);

        // Sort By "Z to A"
        await sortDropdown.findElement(By.xpath('//*[@id="header_container"]/div[2]/div/span/select/option[2]')).click();
    
        await driver.sleep(2000);
        
        await driver.quit();
    });

    it ('Visit SauceDemo with Firefox and Check login', async function () {
        this.timeout(30000);

        options = new firefox.Options();
        options.addArguments('--headless');
        driver = await new Builder()
        .forBrowser('firefox')
        .setFirefoxOptions(options)
        .build();

        await driver.get('https://www.saucedemo.com/');
        const title = await driver.getTitle();
        console.log("Test Case Firefox")
                
        //Check Login Succes
        let inputUsername = await driver.findElement(By.xpath('//*[@id="user-name"]'));
        let inputPassword = await driver.findElement(By.xpath('//*[@id="password"]'));
        let buttonLogin = await driver.findElement(By.xpath('//*[@id="login-button"]'));
        await inputUsername.sendKeys('standard_user');
        await inputPassword.sendKeys('secret_sauce');
        await buttonLogin.click();

        let textAppLogo = await driver.findElement(By.xpath('//*[@id="header_container"]/div[1]/div[2]/div'));
        let logotext = await textAppLogo.getText();
        assert.strictEqual(title, 'Swag Labs');

        let iconCart = await driver.wait(
            until.elementLocated(By.xpath('//*[@id="shopping_cart_container"]/a')),
            2000
        );

        await iconCart.isDisplayed();
        
        //Dropdown Sort By
        let dropdwonSort = '/html/body/div/div/div/div[1]/div[2]/div/span/select';
        let dropdown = await driver.wait(until.elementLocated(By.xpath(dropdwonSort)), 5000);
           
        // Sort By "Name (A to Z)"
        let optionAZ = await driver.findElement(By.xpath('/html/body/div/div/div/div[1]/div[2]/div/span/select/option[1]'));
        await optionAZ.click();
        await driver.sleep(2000);

        // Sort By "Name (Z to A)"
        let optionZA = await driver.findElement(By.xpath('/html/body/div/div/div/div[1]/div[2]/div/span/select/option[2]'));
        await optionZA.click();
        await driver.sleep(2000);
        
        await driver.quit();
    });
});