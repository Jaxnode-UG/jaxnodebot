
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
  const tweetwords = tweet.text.split(' ');
  const hasWhat = tweetwords.filter(w => w.toUpperCase() === 'WHAT');
  if (hasWhat.length > 0) {
      meeting.what(r => {
	      const nextMeetingTopic = `@${tweet.user.screen_name} The next meeting is on '${r}'`;
	      try {
          tweetNow(nextMeetingTopic);  
        } catch (err) {
          console.error(err); 
        }
      });
  }
  const hasWhen = tweetwords.filter(w => w.toUpperCase() === 'WHEN');
  if (hasWhen.length > 0) {
      meeting.when(w => {
        const neetMeetingTime = `@${tweet.user.screen_name} Our next meeting will be on ${w}`;
	      try {
         tweetNow(neetMeetingTime); 
        } catch (err) {
          console.error(err);
        }
      });
  }
  const hasWhere = tweetwords.filter(w => w.toUpperCase() === 'WHERE');
  if (hasWhere.length > 0) {
      meeting.where(r => {
	      try {
          tweetNow(`@${tweet.user.screen_name} ${r}`);  
        } catch (err) {
          console.error(err);
        }
      })
  }
});

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
