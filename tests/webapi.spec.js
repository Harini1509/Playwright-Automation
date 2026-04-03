const {test,expect,request}=require('@playwright/test');
const {ApiUtils}=require('./utils/ApiUtils.js');
let token;
const payload={orders: [{country: "India", productOrderedId: "68a961459320a140fe1ca57a"}]}
const payload1={userEmail :"harinishanthig1999@gmail.com", userPassword: "Believe@13*"}
const fakePayLoadOrders = { data: [], message: "No Product in Cart" };
let orderid;
let browserContext;

test('web api test',async()=>{

     const requestContext=await request.newContext();
     console.log(ApiUtils);
     const api=new ApiUtils(requestContext);
     token= await api.getToken(payload1);
     orderid=await api.getOrderId(payload);
     
        

})
// test.beforeAll('browser token inject',async({browser})=>{
//    const context=await browser.newContext();
//     const page=await context.newPage();
//     await page.goto('https://rahulshettyacademy.com/client');
//     await page.locator("input[id='userEmail']").fill("harinishanthig1999@gmail.com");
//     await page.locator("#userPassword").fill("Believe@13*");
//     await page.locator("#login").click();
//     await page.waitForTimeout(2000);
//     await context.storageState({path:'state.json'});
//     browserContext=await browser.newContext({storageState:'state.json'});

// })

test('sample test',async({page})=>{
   let productName='ADIDAS ORIGINAL';
   let found=false;

   //const page=await browserContext.newPage();
   await page.addInitScript(value=>{
      window.localStorage.setItem('token',value);
   },token)
   // console.log(orderid);
     await page.goto('https://rahulshettyacademy.com/client');
    // await page.locator("button[routerlink*='/dashboard/myorders']").click();
      await page.route("https://rahulshettyacademy.com/api/ecom/user/get-cart-products/68d0f66cf669d6cb0adf9edf",
    async route => {
      const response = await page.request.fetch(route.request());
      let body = JSON.stringify(fakePayLoadOrders);
      route.fulfill(
        {
          response,
          body, 
 
        });
      
    });
   
   //   let list=await page.locator("tr th[scope$='row']");
      //   for(let i=0;i<await list.count();i++){
      //       if(await list.nth(i).textContent()===orderid){
      //            found=true;
      //           break;
      //   }
      //   expect(found).toBeTruthy();
    //}
    await page.locator("//button[@routerlink='/dashboard/cart']").click();
 
    // await page.locator("button[routerlink*='/dashboard/myorders']").click();
        await page.waitForResponse("https://rahulshettyacademy.com/api/ecom/user/get-cart-products/68d0f66cf669d6cb0adf9edf");
    // console.log(await page.locator(".mt-4").textContent());
    console.log(await page.locator("h1").last().textContent());

    
     
    
    
})
test.only('visual testing',async({page})=>{

  await page.goto('https://rahulshettyacademy.com/locatorspractice/');
  expect(await page.screenshot()).toMatchSnapshot('expectedscreen.png');


})