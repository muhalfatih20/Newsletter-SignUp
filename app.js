//jshint esversion:6

const express = require ("express");
const bodyParser = require ("body-parser");
const request = require ("request");
const https = require ("https");

const app = express();
//to get data from the post form
app.use(bodyParser.urlencoded({extended:true}));
//Static file to route to the local links (folder public)
app.use(express.static("public"));

app.get("/", function(req, res){

res.sendFile(__dirname + "/signup.html");

});

app.post("/", function(req, res)

{

const firstName = req.body.fName;
const lastName = req.body.lName;
const email = req.body.email;


const data = {

            members:[
                {
            email_address: email,
            status: "subscribed",
            merged_field: {
              FNAME: firstName,
              LNAME: lastName
                  }
                }
              ]
            };

//pass the data with JSON format to send to mailchimp
const jsonData = JSON.stringify(data);
const url = "https://us17.api.mailchimp.com/3.0/lists/4f66884be2" ;
const options = {
    method: "POST",
    auth: "zoeldjian09:z518a069827c78b4cee9ce806bb7d7a3-us17"
};

const request = https.request(url, options, function(response){

  if (response.statusCode === 200) {
     res.sendFile(__dirname + "/success.html");
  }

  else {
    res.sendFile(__dirname + "/failure.html");
  }

   response.on("data", function(data){
     console.log(JSON.parse(data));
   });
 });

request.write(jsonData);
request.end();

});

//If the signup is failed! and will going to be called by the server and will redirect to the home route then send to the Signup.html page
app.post("/failure", function(req, res){

    res.redirect("/");

});


app.listen(process.env.PORT || 3000, function(){

  console.log("Server is running on port 3000.");

});

//List Id - 4f66884be2
//API key c518a069827c78b4cee9ce806bb7d7a3-us17
