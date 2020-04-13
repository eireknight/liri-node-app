require("dotenv").config();

var Spotify = require("node-spotify-api");

var keys = require("./keys.js");

var spotify = new Spotify(keys.spotify);

var request = require("request");

var moment = require("moment");

var axios = require("axios");

var fs = require("fs");

var command = process.argv[2];

if (command === "concert-this") {

    var artist = process.argv[3];

    request("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp", function (error, response, body) {

            console.log("-------------------------------------");
            console.log("Venue: " + JSON.parse(body)[0].venue.name);
            console.log("Location: " + JSON.parse(body)[0].venue.city + " " + JSON.parse(body)[0].venue.region);
            console.log("Date: " + moment(JSON.parse(body)[0].datetime).format("MM/DD/YYYY"));
            console.log("-------------------------------------");
    });


} else if (command === "spotify-this-song") {
    var song = process.argv[3];

    if (song === undefined) {
        song = "The Sign";
    }

    spotify.search({
        type: "track",
        query: song
    }, function (err, data) {
        if (err) {
            return console.log("Error occured: " + err);
        }
        console.log("-------------------------------------");
        console.log("Artist: " + data.tracks.items[0].artists[0].name);
        console.log("Song Name: " + data.tracks.items[0].name);
        console.log("Preview Link: " + data.tracks.items[0].preview_url);
        console.log("Album: " + data.tracks.items[0].album.name);
        console.log("-------------------------------------");
    });

} else if (command === "movie-this") {

    var movie = process.argv[3];

    if (movie === undefined) {
        movie = "Mr. Nobody";
    }

    request("http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy", function (error, response, body) {


            console.log("-------------------------------------");
            console.log("Title: " + JSON.parse(body).Title);
            console.log("Year Released: " + JSON.parse(body).Year);
            console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
            console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
            console.log("Country Produced: " + JSON.parse(body).Country);
            console.log("Language: " + JSON.parse(body).Language);
            console.log("Plot: " + JSON.parse(body).Plot);
            console.log("Actors: " + JSON.parse(body).Actors);
            console.log("-------------------------------------");
    });

} 