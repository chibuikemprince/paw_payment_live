const   bcrypt =  require('bcryptjs');
const hashSync  = bcrypt.hashSync;
const compareSync  = bcrypt.compareSync;
/* 
 const jwt = require ('jsonwebtoken')
 const sign = jwt.sign; */
 
/* 
const Randomatic =  require('randomatic');
 */
const crypt = require('crypto');

const randomBytes = crypt.randomBytes;

const LogError  =  require('./logError');

const path = require("path");
const resolve = path.resolve;

/* 
*/ 

class Misc {
	
    static  hashPassword(password){
        //const hashedPwd =  
        return hashSync(password, 10); 
    }

static roundNumber(value, precision) {
    var multiplier = Math.pow(10, precision || 0);
    return Math.round(value * multiplier) / multiplier;
}




    static decodePwd(reqPassword, dbPassword){
        
        const compare = compareSync(reqPassword, dbPassword);
        return compare;
    }




    static appResponse (res,res_status="200",statusCode="success",message="",data=[]){
		
		if(res.hasOwnProperty("resObj")){
			 
			 
res.status(res.resObj.status).json(res.resObj);
			 
			 
		}
else{
	
res.status(res_status).json({
	statusCode,data,message
	
});
}		
		
		
	}
	
	
	
    static appError (err, next){
       // console.log("error name: ",err.name)

        if(err.name==" MongooseServerSelectionError"){
            LogError(err.message);
            err.message = "Db Connection Failed. "
        } 



        if(err.name && err.name == "MongoError"){
            //duplicate errors
            if(err.code && err.code == 11000){
                err.message = `${Object.keys(err.keyPattern)[0]} already exists`
            }
        }
    
        if(err.response && err.response.data.code == 'BX0003'){
            err.message = err.response.data.errors
        }

        if (!err.statusCode) {
            err.statusCode = 400;
        }
        next(err);
    }
 


}


module.exports =  Misc;
