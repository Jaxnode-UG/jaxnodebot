
const twit = require('twit');
const meeting = require('./meeting');

const config = {  
  consumer_key: process.env.twitter_ck,  
  consumer_secret: process.env.twitter_cs,
  access_token: process.env.twitter_atk,  
  access_token_secret: process.env.twitter_ats
}

const Twitter = new twit(config);

var stream = Twitter.stream('statuses/filter', { track: ['jaxnode'] });

stream.on('tweet', function (tweet) {
  console.log(tweet.text);
  const tweetwords = tweet.text.split(' ');
  const hasWhat = tweetwords.filter(w => w === 'when');
  if (hasWhat.length > 0) {
      meeting.what(r => console.log(r));
  }
  // meeting
});