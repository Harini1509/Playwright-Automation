const {test,expect}=require('@playwright/test');
const { readExcelFile } =require('./ReadExcel.js');

test('endtoend automation',async({browser})=>{
    const context=await browser.newContext();
    const page=await context.newPage();
    const filePath = "C:/Users/User/Desktop/Playwright scripts/PlaywrightExcelFile.xlsx";

const exceldata=await readExcelFile(filePath);
let username=exceldata[0].UserName;
    let password=exceldata[0].Password;
console.log(exceldata);
    
    
    await page.goto('https://rahulshettyacademy.com/client');
    
    await page.locator("input[id='userEmail']").fill("harinishanthig1999@gmail.com");
    await page.locator("#userPassword").fill("Believe@13*");
    await page.waitForTimeout(500);
    await page.waitForSelector("#login", { state: "visible" });
    await page.locator("#login").scrollIntoViewIfNeeded();
await page.locator("#login").click({ force: true });
    let productName='ADIDAS ORIGINAL';
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(500);
    let products=await page.locator(".card-body");
    for(let i=0;i<await products.count();i++){
        if(await products.nth(i).locator("b").textContent()==productName){
            console.log("element found");
            await products.nth(i).locator("text= Add To Cart").click();
            break;
        }




    }
  //  await page.pause();
    await page.locator("button[routerlink*='/dashboard/cart']").click();
   // await page.locator(".cartSection h3").textContent();
    await expect(page.locator(".cartSection h3")).toHaveText(productName);
    await page.locator("//button[contains(text(),'Checkout')]").click();
    await page.locator("input[placeholder*='Select Country']").pressSequentially('India',{delay:100});
  //  await page.locator("input[placeholder*='Select Country']").type('India',{delay:100});
    await page.waitForSelector("//section[contains(@class,'ta-results')]");
    let listitem=await page.locator("button[class*='ta-item list']");
    const count= await listitem.count();
   console.log( await listitem.nth(0).textContent());
    for(let i=0;i<count;i++){
        //await listitem.first().click();
           console.log( await listitem.nth(i).textContent());
           if(await listitem.nth(i).textContent() ===" India")
           {
                  await listitem.nth(i).click();
           }
    }
   
    

    await page.locator("//a[normalize-space()='Place Order']").click();
    
    expect( page.locator("h1")).toHaveText("Thankyou for the order.");
    
    


    
    

    





})