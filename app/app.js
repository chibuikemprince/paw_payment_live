const Express  = require('express');
const bodyParser =  require('body-parser');
const  Cors =  require('cors');
const Misc = require("./helpers/misc");  
 const stripeMiddleware = require("./middlewares/stripe")
 const confirmMiddleware = require("./middlewares/confirm")
 

const GlobalErrorHandler =  require('./helpers/globalErrorHandler'); 
 
const app = Express()  

app.use(bodyParser.json())   
app.use(bodyParser.urlencoded({extended: true, useNewUrlParser: false}))

//allowing CORS
//app.use(Cors());

//COOKIES
//app.use(cookieParser());
 
 
//allowing CORS 

app.use(Cors(
{
  "origin":  "https://pawproject-334723.web.app",
  "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
  "preflightContinue": false,
  "optionsSuccessStatus": 200,
  "maxAge":1000,
  "credentials":true,
  "allowedHeaders":"Access-Control-Allow-Headers, Content-Type,Authorization,content-type, X-Requested-With,token"
}

));
 
  
 var baseMiddleWare =  function(req, res, next){
	 
	  
	  // if a request is not post, convert all query param to object
if(req.method.toLowerCase()!="post"){
req.body ={...req.body,...req.query}

}
 
if(req.hasOwnProperty("body")){ 
 
   // turn all email to lowercase
            if(req.body.hasOwnProperty("email")){
                
                req.body.email = req.body.email.toString().toLowerCase()
               
            }
    
        }
        else{
   
   // avoid initializing re.body to null or undefined. 
            req.body = {}
        }
         
         next()


 
}
  
 app.use( baseMiddleWare);
  

app.post("/create-checkout-session",stripeMiddleware)
app.post("/confirm",confirmMiddleware)
 
 
 
 

/* app.use("/api",Middleware); */ 

 
app.use("*",(req,res,next)=>{

var fullURL = req.protocol+"://"+req.get("host")+req.originalUrl;
var message =  {requestedurl:fullURL};

Misc.appResponse(res,"404",statusCode="PAGE_NOT_FOUND","The page you were looking for does not exist. ",data= [message]);

})


//Handling errors 
app.use(GlobalErrorHandler)


app.use((error, req, res, next) => {
    //console.log(error);
    var mystatus = error.statusCode || 500;
    var message = error.message;



Misc.appResponse(res,mystatus,statusCode="error",message,data=[]);

    /* 
	res.status(mystatus).json({
        message: message,
        status: mystatus,
		statusCode:"error",
		
		data:[]
    }); */
	
	
	
});




// process.on('uncaughtException', function (err) {
//     console.log('**************************');
//     console.log('* [process.on(uncaughtException)]: err:', err);
//     console.log('**************************');
//   });

 /*  app.use("*",(req,res,next)=>{
    res.status(200).json({message:"welcome"})
    
    }) */
    
module.exports =  app;
