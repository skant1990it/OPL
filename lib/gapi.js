/**
 * 
 */

var googleapis = require('googleapis'),
    OAuth2Client = googleapis.auth.OAuth2,
    client = '329323580880-tdiv931bfgfaqtfuncf6i1lobi9q4fam.apps.googleusercontent.com',
    secret = 'j_5ZKCyTz6hhFsMuzc7kdgYB',
    redirect = 'http://localhost:3000/list',
    calendar_auth_url = '',
    oauth2Client = new OAuth2Client(client, secret, redirect);


exports.ping = function() {
    console.log('pong');
};


var url = oauth2Client.generateAuthUrl({
	  access_type: 'offline',
	  scope: 'https://www.googleapis.com/auth/plus.me'
	});

calendar_auth_url = oauth2Client.generateAuthUrl({
	  access_type: 'offline',
	  scope: 'https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/calendar'
	});

exports.url = calendar_auth_url;