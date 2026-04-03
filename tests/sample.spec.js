const {test,expect}=require('@playwright/test');

test('sample test',async({page})=>{
  //  const page=await browser.newPage();
  //   await page.goto('https://rahulshettyacademy.com/client');
  //   let title=await page.title();
  //   await expect(page).toHaveTitle(title);
  //   await page.locator("input[id='userEmail']").fill("harinishanthig1999@gmail.com");
  //   await page.locator("//input[contains(@id,'Password')]").fill("Believe@13*");
  //   await page.locator("#login").click();
  //   await page.waitForLoadState('networkidle');
  //   let products=page.locator(".card-body b");
  //  // await page.locator('select[class*='custom-select'] option')

  //   console.log(await products.allTextContents());
  //   await page.goto('https://rahulshettyacademy.com/client/#/auth/register');
  //   await page.waitForLoadState('networkidle');
    
  //   await page.locator("select[class*='custom-select']").selectOption({ label: 'Doctor' });
  
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    



        
    
});
test('child window',async({browser})=>{
  const context=await browser.newContext();
  const page=  await context.newPage();
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  // await page.locator("a.blinkingText:first-child").click();
  //await page.waitForEvent('networkidle');
  
  const [newpage]=await Promise.all([
     context.waitForEvent('page'),
     page.locator("a.blinkingText:first-child").click()
  ]);
  
await newpage.waitForLoadState();         // ensure it's loaded
  console.log(await newpage.title());  
  
  // await newpage.screenshot({path:'screenshot.png'});
  
})
test.only('calender',async({browser})=>{
  let year="2025";
  let month="08";
  let date="2";
  const context=await browser.newContext();
  const page=  await context.newPage();
  await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/offers");
  let list2=await page.locator("input[class*='react-date-picker']");
  let date1=await page.locator("input[type='date']").getAttribute('value');
  console.log(date1);
  let date2=date1.split("-");
  console.log(date2);
  await page.locator(".react-date-picker__clear-button__icon").click();
  await list2.nth(0).fill(date);
  await list2.nth(1).fill(month);
  await list2.nth(2).fill(year);
  await page.waitForTimeout(2000);
//   await page.getByLabel("Delivery Date").hover();

  
//  // await page.getByLabel("Delivery Date").click();
//   await page.keyboard.press('Enter');
//   await page.waitForTimeout(5000);
  await page.mouse.click(100, 200); 
  await page.waitForTimeout(5000);
  





  
  


});
