const express  = require('express');
const bodyParser = require('body-parser');
const request = require('request');

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req, res) => {
    res.sendFile(__dirname + '/signup.html');
});

app.post("/", (req, res) => {
    var firstName = req.body.fName;
    var lastName = req.body.lName;
    var email = req.body.email;

    var data = {
        members : [
            {
                email_address :  email,
                status : "subscribed",
                merge_fields : {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    };

    var jsonData = JSON.stringify(data);

    var option = {
        url : "https://us18.api.mailchimp.com/3.0/lists/{list_id}",
        method : "POST",
        headers: {
            "Authorization" : "riyanka1 ${APikey}"
        },
        body : jsonData
    }

    request(option, function(error, response, body){
        if(error){
            res.sendFile(__dirname + "/failure.html");
        }else{
            if(response.statusCode === 200){
                res.sendFile(__dirname + "/sucess.html");;
            }else{
                res.sendFile(__dirname + "/failure.html");
            }
            
        }
    })
});

app.post("/failure", (req, res) => {
    res.redirect("/");
});

app.listen(process.env.PORT || 3000, () => {
    console.log("Server is running on port 3000");
});