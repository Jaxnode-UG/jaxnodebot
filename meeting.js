
//const fetch = require('node-fetch');
const axios = require('axios');

function when(cb) {
    return meetingPromise().then(json => {
        cb(formateDate(json.data[0].time));
    });
}

function where(cb) {
    return meetingPromise().then(json => {
        const maplink = `We meet at ${json.data[0].venue.name} https://www.google.com/maps/place/${json.data[0].venue.name}/@${json.data[0].venue.lat},${json.data[0].venue.lon},15z`
        cb(maplink);
    });
}

function what(cb) {
    return meetingPromise().then(json => {
        cb(json.data[0].name);
    });
}

function meetingPromise() {
    const promise = axios.get('https://api.meetup.com/Jax-Node-js-UG/events?page=2');
    return promise;
}

function formateDate(time) {
    const date = new Date(time);
    return date.toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric", hour:"2-digit", minute:"2-digit"});
}

exports.when = when;
exports.where = where;
exports.what = what;
