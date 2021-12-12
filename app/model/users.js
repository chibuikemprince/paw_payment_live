const Mongoose = require("mongoose");
const Misc = require("../helpers/misc")
const Schema = Mongoose.Schema;
const Model = Mongoose.model;

/* 
 
Request Form

Name  Phone Email Type of Property Location of Property Price range Visitor’s Country (determined by IP address) 



 */



var users = new Schema({
	
	 
	
	name:{
		required:true,
		type:String,
		unique:true,
		set: function(v){return v.toLowerCase().trim()}, 
		get: function(v){return v.toLowerCase().trim()} 
	},
	 
	emailVerified:{
		type:String ,
		set: function(v){return v.toLowerCase().trim()}, 
		get: function(v){return v.toLowerCase().trim()} 
		 
	},email:{
		type:String ,
		set: function(v){return v.toLowerCase().trim()}, 
		get: function(v){return v.toLowerCase().trim()} ,
		required:true
		 
	},
	password:{
		type:String,
		 set: function(v){
			return Misc.hashPassword(v)
			 // v.toLowerCase().trim()
			 
			 } 
		
		 
	},
	createdAt:{
		type:String,
		default:Date.now()
	} 
	
	
}
	,{timestamps: true}
	);



module.exports = Model("users",users);