var storeItems = require("../items");
var Misc = require("../helpers/misc")
var Orders = require("../model/orders")

const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY)


module.exports =  async (req, res, next) => {
  try {
	  
var {txn_id}=req.body;
var error = ""; 
   Orders.updateOne({txn_id,status:"pending"},{status:"success"},(err,done)=>{
	   if(err){
		   console.log("Error occured, Payment made but order status update failed with error: ",err)
		   return;
	   }
	   else{
		   res.status(200).json({ message:"Confirmed."})
	   }
   })
   
   
   
  }

  catch (e) {
	  
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