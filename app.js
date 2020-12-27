const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const https = require("https");

const app = express();

//to use external css
app.use(express.static("public"));
app.use(bodyParser.urlencoded({
    extended: true
}));

//To load signup page (homepage)
app.get("/", function (req, res) {
    res.sendFile(__dirname + "/Signup.html");
});

//to Send back homepage through button
app.post("/Failure" ,function(req,res) {
    res.redirect("/");
} );

app.post("/", function(req, res) {
    const firstName = req.body.fName;
    const lastName = req.body.lName;
    const email = req.body.email;

    const data = {
        members: [{
            email_address: email,
            status: "subscribed",
            merge_fields: {
                FNAME: firstName,
                LNAME: lastName
            }

        }]
    };

    const jsonData = JSON.stringify(data);
    const url = "https://us7.api.mailchimp.com/3.0/lists/2a77804405";

    const options = {
        method: "POST",
        auth: "abhishek:e5f11696b32ecc87efdef8d033cac31d-us7"
    }

    const request = https.request(url, options, function(response) {

        if(response.statusCode == 200) {
            res.sendFile(__dirname + "/Success.html");

        } else{
            res.sendFile(__dirname + "/Failure.html");
        }

        response.on("data", function(data) {
            console.log(JSON.parse(data));
        })
    })

    request.write(jsonData);
    request.end();

});

app.listen(process.env.PORT || 3000, function () {
    console.log("Server is running on port 3000");
});


//Mailchimp Api key
//e5f11696b32ecc87efdef8d033cac31d-us7

//Unique id
//2a77804405