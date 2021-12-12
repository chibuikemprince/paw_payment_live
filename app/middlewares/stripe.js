var storeItems = require("../items");
var Misc = require("../helpers/misc")
var Orders = require("../model/orders")

const stripe = require("stripe")("sk_test_51K4mR1KZUXT1vXYdNJyK4T0LDN1qO87sDRHV43rg4CK4LbRf07WOzjzPXXCLHHHOpkroXOKDT1Gd6Oro6qEupWvc004m7bOOWY")


module.exports =  async (req, res, next) => {
  try {
	  
var {email,name,items}=req.body;
var error = "";

/* 

if(name==undefined || name.length<2 ){
	  
 error = new Error("Enter your name") ;
	 throw error;
	 return;
 }

 */
var myhash= Misc.hashPassword(email+Date.now())

 if(email==undefined || email.length==0 ){
error = new Error("Enter your email") ;
	 throw error;
	 return;
 }

else{
	if(! /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)){
		 
	error = new Error("Enter a valid email") ;
	 throw error;
	 return;
	}
}



	  if(!parseInt(items[0].id)) {
		  //throw new Error("").status="AUTH_ERROR"
error = new Error("invalid item") ;
	 throw error;
		  
return;
	  }		  
	 // console.log(parseInt(items.quantity))
	  if(!parseInt(items[0].quantity)){
		   error = new Error("quantity must be greater than 0") ;
	 throw error;
		  
return;
	  }		  
	  var products=[];
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: req.body.items.map(item => {
        const storeItem = storeItems.get(item.id)
		storeItem.quantity = item.quantity
		storeItem.currency = "USD"
		storeItem.total_in_cents = storeItem.priceInCents* item.quantity
		
		products.push(storeItem);
        return {
			
          price_data: {
			  
            currency: "usd",
            product_data: {
				 
              name: storeItem.name,
			  images:[`https://pawproject-334723.web.app/images/laptop.js`]
            },
            unit_amount: storeItem.priceInCents,
          },
          quantity: item.quantity,
        }
      }),
      success_url: `https://pawproject-334723.web.app/success.html?k=${myhash}`,
      cancel_url: `https://pawproject-334723.web.app/cancel.html`,
	  customer_email:email
    })
	
//	console.log({products,email,txn_id:myhash})
	
	new Orders({products,email,txn_id:myhash})
	.save((err,done)=>{
		if(err){ 
		console.log(err)
		throw new Error("Request failed , please try again.");
		return;
		}
		else{ res.json({ url: session.url })}
	})
	 
   
  } catch (e) {
	  
	  var message = "";
	  //console.log(e.status)
	  if(error!=""){
		  message = error.message
	  }
	  else{
		   message = "error occured please try aagain"
	  }
    res.status(500).json({ error: e.message,message })
  }




}