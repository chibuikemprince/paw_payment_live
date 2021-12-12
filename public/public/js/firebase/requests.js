$(document).ready(function() {
  
   //firebase.functions().useEmulator("localhost", 5001);
	 // firebase.auth().useEmulator('http://localhost:9099/');
	 
	
	 }
	 )
	 
	 
	 function reg(data){
		 document.getElementById("bt1").style.display = "none";
		 document.getElementById("bt2").style.display = "block";
		 //console.log(data);
		  axios({
  method: 'post',
  url: 'http://localhost:7000/create-checkout-session',
  responseType: 'application/json',
  data:data
})
	  // axios.get('')
   .then(response=>{
	     // console.log(response);
		//alert(response.data.message);  
		 
		 document.getElementById("bt1").style.display = "block";
		 document.getElementById("bt2").style.display = "none";
		window.location = response.data.url
   })
	 .catch(err=>{
		 
		 document.getElementById("bt1").style.display = "block";
		 document.getElementById("bt2").style.display = "none";
		// err.request
		 // console.log(err.response)
		 alert(err.response.data.message); 
	 })
	 
	 
	 }
	 
	 
	 
 