
const token = process.env.SLACKBOT_TOKEN;

const SlackBot = require('slackbots');
const meeting = require('./meeting.js');
const channel = 'general';

const bot = new SlackBot({
    token: token,
    name: 'Jaxnodebot'
});

// bot.on("start", function() {
//     bot.postMessageToChannel(channel, "Hello world!");
//     console.log("Hello world!");
// });

bot.on('message', function(data) {
    if (data.type !== 'message') {
        return;
    }

    const message_words = data.text.split(' ');

    const hasWhat = message_words.filter(w => w.toUpperCase() === 'WHAT');
    if (hasWhat.length > 0) {
        meeting.what(r => {
            const nextMeetingTopic = `<@${data.user}> The next meeting is on '${r}'`;
            try {
                sendReply(nextMeetingTopic);
            } catch (err) {
                console.error(err); 
            }
        });
    }

    const hasWhen = message_words.filter(w => w.toUpperCase() === 'WHEN');
    if (hasWhen.length > 0) {
        meeting.when(w => {
            const neetMeetingTime = `<@${data.user}> Our next meeting will be on ${w}`;
            try {
                sendReply(neetMeetingTime); 
            } catch (err) {
                console.error(err);
            }
        });
    }
    const hasWhere = message_words.filter(w => w.toUpperCase() === 'WHERE');
    if (hasWhere.length > 0) {
        meeting.where(r => {
            try {
                sendReply(`<@${data.user}> ${r}`);  
            } catch (err) {
                console.error(err);
            }
        });
    }
});

function sendReply(message) {
    bot.postMessageToChannel(channel, message);
}
