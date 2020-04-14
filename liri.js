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

    var artist = process.argv.slice(3).join("+");

    request("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp", function (error, response, body) {
        if (error) {
            throw error
        }

            console.log("-------------------------------------");
            console.log("Venue: " + JSON.parse(body)[0].venue.name);
            console.log("Location: " + JSON.parse(body)[0].venue.city + " " + JSON.parse(body)[0].venue.region);
            console.log("Date: " + moment(JSON.parse(body)[0].datetime).format("MM/DD/YYYY"));
            console.log("-------------------------------------");
    });


} else if (command === "spotify-this-song") {
    var song = process.argv.slice(3).join(" + ");

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

    var movie = process.argv.slice(3).join(" + ");

    if (movie === null) {
        movie = "Mr. Nobody";
    }

        axios.get("http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy").then(function(response) {
            console.log("-------------------------------------");
            console.log("Title: " + response.data.Title);
            console.log("Year Released: " + response.data.Year);
            console.log("IMDB Rating: " + response.data.imdbRating);
            if (response.data.Ratings[1]){console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value);}
            console.log("Country Produced: " + response.data.Country);
            console.log("Language: " + response.data.Language);
            console.log("Plot: " + response.data.Plot);
            console.log("Actors: " + response.data.Actors);
            console.log("-------------------------------------");
    });

} else if (command === "do-what-it-says") {

    fs.readFile("random.txt", "utf8", function (error, data) {

        if (error) {
            return console.log(error);
        }

        var dataArr = data.split(",");

        command = dataArr[0];
        whatToDo = dataArr[1];

        if (command === "concert-this") {

            var artist = whatToDo;

            request("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp", function (error, response, body) {
                if (error) {
                    throw error
                }
                    console.log("-------------------------------------");
                    console.log("Venue: " + JSON.parse(body)[0].venue.name);
                    console.log("Location: " + JSON.parse(body)[0].venue.city + " " + JSON.parse(body)[0].venue.region);
                    console.log("Date: " + moment(JSON.parse(body)[0].datetime).format("MM/DD/YYYY"));
                    console.log("-------------------------------------");
            });


        } else if (command === "spotify-this-song") {
            var song = whatToDo;

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

            var movie = whatToDo;

            if (movie === undefined) {
                movie = "Mr. Nobody";
            }

            axios.get("http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy").then(function(response) {

                console.log("-------------------------------------");
                console.log("Title: " + response.data.Title);
                console.log("Year Released: " + response.data.Year);
                console.log("IMDB Rating: " + response.data.imdbRating);
                console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value);
                console.log("Country Produced: " + response.data.Country);
                console.log("Language: " + response.data.Language);
                console.log("Plot: " + response.data.Plot);
                console.log("Actors: " + response.data.Actors);
                console.log("-------------------------------------");
            });

        } else {
            console.log("Command Error");
        }
    });

} else {
    console.log("Command Error");
}