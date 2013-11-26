
var port    = (process.env.VCAP_APP_PORT || 3000);
var express = require("express");
var sentiment = require("sentiment");
var twitter = require("ntwitter");

var app = express();

var tweeterapi = new twitter({
	consumer_key : 'HpKdmzSR1FtlZ1VERltZmQ',
	consumer_secret: 'vK15m4Fncq73qzkyMdtpYTWMerP5ukmKOHSzvnZuKMI',
	access_token_key: 'd#C$@Ty^&cp0$',
	access_token_secret: '&cp@T#C$y^0$d'
});


app.get('/twitterCheck', function(req, res){
	tweeterapi.verifyCredentials(access_token_key, access_token_secret, function (error, data) {
		console.log ( "data = " + data);
        //res.send("Hello, " + data.name + ".  I am in your twitters.");
    });
});


app.get('/hello', function(req, res){
	res.send("Hello, World.");
});

app.get('/thomas', function(req, res){
	res.send("Hi thomas, How are u?");
});

app.get('/testSentiment',
    function (req, res) {
        var response = "<HEAD>" +
          "<title>Twitter Sentiment Analysis</title>\n" +
          "</HEAD>\n" +
          "<BODY>\n" +
          "<P>\n" +
          "Welcome to the Twitter Sentiment Analysis app.  " +   
          "What phrase would you like to analzye?\n" +                
          "</P>\n" +
          "<FORM action=\"/testSentiment\" method=\"get\">\n" +
          "<P>\n" +
          "Enter a phrase to evaluate: <INPUT type=\"text\" name=\"phrase\"><BR>\n" +
          "<INPUT type=\"submit\" value=\"Send\">\n" +
          "</P>\n" +
          "</FORM>\n" +
          "</BODY>";
        var phrase = req.query.phrase;
        if (!phrase) {
            res.send(response);
        } else {
            sentiment(phrase, function (err, result) {
                response = 'sentiment(' + phrase + ') === ' + result.score;
                res.send(response);
            });
        }
    });

app.listen(port);
console.log("Server listening on port" + port);{

}