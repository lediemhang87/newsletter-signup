const mailchimp = require("@mailchimp/mailchimp_marketing");
const express = require("express");
const bodyParser = require("body-parser");
// const request = require("request");
// const https = require("https");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.listen(process.env.PORT || 3000, function(){
  console.log("Server is running on port 3000.");
});

app.get("/", function(req, res){
  res.sendFile(__dirname + "/signup.html");
});

mailchimp.setConfig({
  apiKey: "3926997f8ef26b96e72ab7a572e7f69f-us7",
  server: "us7",
});

app.post("/", function(req, res){
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;
  const phone = req.body.phone;

  const listId = "951bba8603";
  const data = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      phone: phone
  };


async function run() {
  const response = await mailchimp.lists.addListMember(listId, {
    email_address: data.email,
    status: "subscribed",
    merge_fields: {
      FNAME: data.firstName,
      LNAME: data.lastName,
      PHONE: data.phone
    }
  })
  res.sendFile(__dirname + "/success.html");
  console.log("Run Sucessfully");
};

   run().catch(e => res.sendFile(__dirname + "/failure.html"));
});

app.post("/failure", function(req, res){
  res.redirect("/");
});

app.post("/sucess", function(req, res){
  res.redirect("/");
});

// 3926997f8ef26b96e72ab7a572e7f69f-us7
// 951bba8603
