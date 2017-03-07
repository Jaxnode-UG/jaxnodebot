
const fetch = require('node-fetch');

function when(cb) {
    return meetingPromise().then(json => {
        cb(json.meeting.time);
    });
}

function where(cb) {
    return meetingPromise().then(json => {
        const maplink = `We meet at ${json.meeting.venue.name} https://www.google.com/maps/place/${json.meeting.venue.name}/@${json.meeting.venue.lat},${json.meeting.venue.lon},15z`
        cb(maplink);
    });
}

function what(cb) {
    return meetingPromise().then(json => {
        cb(json.meeting.name);
    });
}

function meetingPromise() {
    return fetch('https://www.jaxnode.com/v1/api/meeting')
        .catch(err => console.error(err))
        .then(response => response.json());
}

exports.when = when;
exports.where = where;
exports.what = what;
