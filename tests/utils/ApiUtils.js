class ApiUtils{
    constructor(requestContext){
        this.requestContext=requestContext;
        this.token="";

    }

    async getToken(payload1){
        const response=await this.requestContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",{
        data:payload1,

     }
            
         )
       // expect(response.status()).toBe(200);
        const responseJson=await response.json();
        console.log(responseJson);
        this.token=await responseJson.token;
        console.log(this.token);
        return this.token;

    }
    async getOrderId(payload){
       // let tokenid=await this.getToken();
      //  console.log(tokenid);
        const createresponse=await this.requestContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",{
                    data:payload,
                    headers:{
                        "Authorization": this.token,
                        "Content-Type":'application/json',
                    }
                })
                const response2=await createresponse.json();
                console.log(response2);
                let orderid= response2.orders;
                console.log(orderid);
                return orderid;
        

    }

}
module.exports={ApiUtils};
