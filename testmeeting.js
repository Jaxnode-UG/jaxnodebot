
const meeting = require('./meeting');

meeting.when(r => console.log(r)); // 
meeting.where(m => console.log(m));
meeting.what(n => console.log(n));

function whenIsMeeting(time) {
    const date = new Date(time);
    const formattedDate = date.toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric", hour:"2-digit", minute:"2-digit"}) 

    console.log(formattedDate);
}
