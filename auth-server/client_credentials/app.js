/**
 * This is an example of a basic node.js script that performs
 * the Client Credentials oAuth2 flow to authenticate against
 * the Spotify Accounts.
 *
 * For more information, read
 * https://developer.spotify.com/web-api/authorization-guide/#client_credentials_flow
 */

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
var request = require("request"); // "Request" library

var client_id = process.env.SPOTIFY_API_CLIENT;
var client_secret = process.env.SPOTIFY_API_SECRET;

// your application requests authorization
var authOptions = {
  url: "https://accounts.spotify.com/api/token",
  headers: {
    Authorization:
      "Basic " + new Buffer(client_id + ":" + client_secret).toString("base64"),
  },
  form: {
    grant_type: "client_credentials",
  },
  json: true,
};

request.post(authOptions, function (error, response, body) {
  if (!error && response.statusCode === 200) {
    // use the access token to access the Spotify Web API
    var token = body.access_token;
    var options = {
      url: `https://api.spotify.com/v1/users/${process.env.SPOTIFY_API_ID}`,
      headers: {
        Authorization: "Bearer " + token,
      },
      json: true,
    };
  }
});
