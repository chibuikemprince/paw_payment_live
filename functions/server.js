
const Dotenv = require('dotenv');

Dotenv.config();

const app = require('./app/app');
const dbConnection = require('./app/helpers/db_connection');
 


 

const {connect, disconnect} = dbConnection;

Dotenv.config()


// Connection object which contains the constant for the port and the database
let connection_config = {
    port: process.env.PORT,
    database_url: process.env.MONGODB_ATLAS
}
 

  connect(connection_config, app)

 
 

//app.use(globalErrorHandler);
