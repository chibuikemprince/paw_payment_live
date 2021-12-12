const functions = require('firebase-functions');

const Dotenv = require('dotenv');


const app = require('./app/app');
const dbConnection = require('./app/helpers/db_connection');
 
 // The Firebase Admin SDK to access Firestore.

  
Dotenv.config();
 

const {connect, disconnect} = dbConnection;

 
// Connection object which contains the constant for the port and the database
let connection_config = {
    port: "7000",
    database_url:  "mongodb+srv://paw_project:QwcX6WhFHvY88@v@cluster0.am1hb.mongodb.net/interview?retryWrites=true&w=majority"
}
 

  //connect(connection_config, app)

 
 
 
 
 
 
 
  //exports.app = functions.https.onRequest(app);

//app.use(globalErrorHandler);




// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });


/* 


app.listen(3000)
 */