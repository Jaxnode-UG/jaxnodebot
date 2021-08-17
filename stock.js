const twit = require('twit');

const config = {  
  consumer_key: process.env.twitter_ck,  
  consumer_secret: process.env.twitter_cs,
  access_token: process.env.twitter_atk,  
  access_token_secret: process.env.twitter_ats
}

const Twitter = new twit(config);

const stream = Twitter.stream('statuses/filter', { track: ['$GME', 'GME'] }); 

stream.on('tweet', function (tweet) {
    console.log(tweet.text);
});
