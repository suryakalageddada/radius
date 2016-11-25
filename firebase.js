var express=require('express');
var app=express();
var cors=require('cors');
var bodyParser=require('body-parser');
var proj;
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors({origin:'*'}));
 
    var Connection = require('tedious').Connection;  
    var config = {  
        userName: 'laks@laurel-dbserver',  
        password: 'MyDogBaluBarks@Me',  
        server: 'laurel-dbserver.database.windows.net',  
        // When you connect to Azure SQL Database, you need these next options.  
        options: {encrypt: true, database: 'voicegatedb'}  
    };  
    
    config.options.rowCollectionOnRequestCompletion=true;
    
    var connection = new Connection(config);  
    connection.on('connect', function(err) {  
        // If no error, then good to proceed.  
        console.log("Connected");  
         
    });  
  var firebase = require('firebase');
  var config = {
  apiKey: "AIzaSyAqlo3qJ-if4BeffG6_DwDJrWr0IaJrbiI",
  authDomain: "radius-cdc32.firebaseapp.com",
  databaseURL: "https://radius-cdc32.firebaseio.com/"
};
    firebase.initializeApp(config);
var ref = firebase.app().database().ref();

   // ref.on("child_changed", function(snapshot) { 
      // console.log(snapshot.val());
//});
var email;
var password2;
var uname2;
ref.on("value", function(snapshot) {    
     console.log(snapshot.val());
   email = snapshot.val().email1;
   password2 = snapshot.val().password1;
    uname2 = snapshot.val().uname1;
    console.log(password2);
    executeStatement(); 
   
ref.on("child_added", function(newPost,pre) { 
       
   // newchild=newPost.val();
    // console.log(newchild); 
   // var json = JSON.parse(newchild);
   // console.log(json);     
});
});  

  
    var Request = require('tedious').Request;  
    var TYPES = require('tedious').TYPES;  

    function executeStatement() {  
        console.log(uname2);
        request = new Request("insert into firebasedata(email,pasword,uname) values('" + email + "','" + password2+ "','" + uname2 + "')", function(err) {  
        
            
            if (err) {  
                console.log(err);
            }
            else {
                
                console.log('data is inserted');
                };
                   
            });
         connection.execSql(request); 
    };
     

app.listen(5000, function () {
      console.log('Nodejs App listening on port 5000!');
});