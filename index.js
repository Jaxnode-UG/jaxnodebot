
const twit = require('twit');

const config = {  
  consumer_key: process.env.twitter_ck,  
  consumer_secret: process.env.twitter_cs,
  access_token: process.env.twitter_atk,  
  access_token_secret: process.env.twitter_ats
}

const Twitter = new twit(config);

const stream = Twitter.stream('user');

stream.on('follow', followed); 

function followed(event) {  
    console.log('Follow Event is running');
    //let name = event.source.name;
    let screenName = event.source.screen_name;
    console.log(`@${screenName} is following @jaxnode.`);
    tweetNow('@' + screenName + ' Thank you for the following @jaxnode.');
}

function tweetNow(tweetTxt) {  
    const tweet = {
        status: tweetTxt
    }
    Twitter.post('statuses/update', tweet, function(err, data, response) {
      if(err){
        console.log('Error in Replying');
        console.error(err);
      }
      else{
        console.log('Gratitude shown successfully');
      }
    });
}