 
const  mongoose = require('mongoose'); 
 
class Connection {
    static connect(connection_config, app=null){
        return mongoose.connect( connection_config.database_url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex:true
        }).then( connection => {
            //console.log(connection)
            if(app){
				
                  app.listen(connection_config.port, () => {
                    console.log('<<<<<=======Server running at ' + connection_config.port+'======>>>>>>');
					console.log('<<<<<<<<<=======Database Connection Initiated =======================>>>>>>>>>>>>>>>>');
           
                });
            


console.log('<<<<<<<<<=======Database Connected Successfully=======================>>>>>>>>>>>>>>>>');
		   }
			else{
                console.log('<<<<<<<<<======= Server start failed=======================>>>>>>>>>>>>>>>>')
            }
        }).catch( err => {
          console.log(err); 
		  throw new Error("connection failed");
        })
    }

    static disconnect(){
        return mongoose.disconnect()
    }

}


module.exports = Connection