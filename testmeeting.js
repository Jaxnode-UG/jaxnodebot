
const meeting = require('./meeting');

meeting.when(r => console.log(r));
meeting.where(m => console.log(m));
meeting.what(n => console.log(n));
