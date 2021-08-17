
const token = `xoxb-2394464722785-2387116863138-TU5sqX7nTYtJTY1pKO7TJaJU`;

const SlackBot = require("slackbots");
const channel = "general";

const bot = new SlackBot({
    token: token,
    name: "Jaxnodebot"
});

// bot.on("start", function() {
//     bot.postMessageToChannel(channel, "Hello world!");
//     console.log("Hello world!");
// });

bot.on("message", function(data) {
    if (data.type !== "message") {
        return;
    }

    handleMessage(data.text);
});

function handleMessage(message) {
    switch(message) {
        case "hi":
        case "hello":
            sendGreeting();
            break;
        default:
            return;
    }
}

function sendGreeting() {
    const greeting = getGreeting();
    bot.postMessageToChannel(channel, greeting);
}

function getGreeting() {
    const greetings = [
        "hello!",
        "hi there!",
        "cheerio!",
        "how do you do!",
        "¡hola!"
    ];
    return greetings[Math.floor(Math.random() * greetings.length)];
}
