const express = require("express");
const bodyParser = require("body-parser");
const request = require('request');



const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static('public'));

app.get ('/', function (req, res) {
        res.sendFile(__dirname + '/signup.html');
});

app.post ('/', function (req, res) {
     
    let firstName = req.body.fName;
    let lastName = req.body.lName;
    let email = req.body.email;
    
    let data = {
       members: [ 
           {
            email_address: email,
            status: 'subscribed',
            merge_fields: {
                FNAME: firstName,
                LNAME: lastName
            }      
        }
       ]
    };

    let jsonData = JSON.stringify(data);


    let options = {
            url: 'https://us4.api.mailchimp.com/3.0/lists/c8716c711d',
            method: 'POST',
            headers: {
                'Authorization': 'tosan 0e216427cdd025af00f31e851fbd3694-us4'
            },
            body:jsonData
    };

    request(options, function(error, response, body){
            if(response.statusCode === 200){
                res.sendFile(__dirname + '/success.html');
            }
            else res.sendFile(__dirname + '/failure.html');

});


    //0e216427cdd025af00f31e851fbd3694-us4 
    //c8716c711d

});

app.post ( '/failure', function(req, res){
    res.redirect('/');
}
)

app.listen(process.env.PORT || 3000, function () {
    console.log('server is running on port 3000');
})


//a news letter sign up page that posts data to mailchimp servers using mailchimp API and http basic authentication.
//A newsletter signup page that signs people up to a mailing list on mailchimp.   