var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

mongoose.connect("mongodb://localhost/yelp-camp");

app.use(bodyParser.urlencoded({extended: true}));

app.set("view engine", "ejs");

// SCHEMA 

var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
});

var Campground = mongoose.model("Campground", campgroundSchema);

// Campground.create(
//     {name: "Granite Hill", image: "https://farm4.staticflickr.com/3273/2602356334_20fbb23543.jpg", description: "This is a huge granite hill, no bathroom, no water. Beautiful granite!"},
//     function(err, campground){
//         if(err){
//             console.log(err);
//         } else {
//             console.log(campground);   
//         }
//     }
// );

app.get("/", function(req, res) {
    res.render("landing");
});

app.get("/campgrounds", function(req, res) {
    Campground.find({}, function(err, allCampgrounds) {
        if(err) {
            console.log(err);
        } else {
            res.render("campgrounds", {campgrounds: allCampgrounds});
        }
    });
});

app.post("/campgrounds", function(req, res) {
    var name = req.body.name;
    var image = req.body.image;
    var newCampground = {name: name, image: image};
    Campground.create(newCampground, function(err, newlyCreated) {
        if(err) {
            console.log(err);
        } else {
            res.redirect("/campgrounds");
        }
    });
});

app.get("/campgrounds/new", function(req, res) {
   res.render("new"); 
});

app.get("/campgrounds/:id", function(req, res) {
    res.send("Show page");
});

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("The YelpCamp Server has started!!!")
});