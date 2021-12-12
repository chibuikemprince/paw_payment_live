const Mongoose = require("mongoose");
const Misc = require("../helpers/misc")
const Schema = Mongoose.Schema;
const Model = Mongoose.model;

/* 
 
Request Form

Name  Phone Email Type of Property Location of Property Price range Visitor’s Country (determined by IP address) 



 */



var orders = new Schema({
	
	 
	
	status:{
		 
		type:String,
		 default:"pending"
	},
	 
	 
	 email:{
		type:String ,
		set: function(v){return v.toLowerCase().trim()}, 
		get: function(v){return v.toLowerCase().trim()} ,
		required:true
		 
	},
	products: {
		type:Array
	}
	,txn_id:{
		type:String,
		 required:true
		
		 
	},
	createdAt:{
		type:String,
		default:Date.now()
	} 
	
	
}
	,{timestamps: true}
	);



module.exports = Model("Orders",orders);