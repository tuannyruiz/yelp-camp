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
    image: String
});

var Campground = mongoose.model("Campground", campgroundSchema);

// Campground.create(
//     {name: "Granite Hill", image: "https://farm4.staticflickr.com/3273/2602356334_20fbb23543.jpg"},
//     function(err, campground){
//         if(err){
//             console.log(err);
//         } else {
//             console.log(campground);   
//         }
//     }
// );

// 

var campgrounds = [
    {name: "Salmon Creeks", image: "https://pixabay.com/get/ea36b7062bf6093ed1584d05fb1d4e97e07ee3d21cac104497f5c370a4eeb6b9_340.jpg"},
    {name: "Granite Hill", image: "https://farm4.staticflickr.com/3273/2602356334_20fbb23543.jpg"},
    {name: "Mountain Goat's Rest", image: "https://farm8.staticflickr.com/7258/7121861565_3f4957acb1.jpg"},
    {name: "Salmon Creeks", image: "https://pixabay.com/get/ea36b7062bf6093ed1584d05fb1d4e97e07ee3d21cac104497f5c370a4eeb6b9_340.jpg"},
    {name: "Granite Hill", image: "https://farm4.staticflickr.com/3273/2602356334_20fbb23543.jpg"},
    {name: "Mountain Goat's Rest", image: "https://farm8.staticflickr.com/7258/7121861565_3f4957acb1.jpg"},
    {name: "Salmon Creeks", image: "https://pixabay.com/get/ea36b7062bf6093ed1584d05fb1d4e97e07ee3d21cac104497f5c370a4eeb6b9_340.jpg"},
    {name: "Granite Hill", image: "https://farm4.staticflickr.com/3273/2602356334_20fbb23543.jpg"},
    {name: "Mountain Goat's Rest", image: "https://farm8.staticflickr.com/7258/7121861565_3f4957acb1.jpg"}
]

app.get("/", function(req, res) {
    res.render("landing");
});

app.get("/campgrounds", function(req, res) {
    Campground.find({}, function(err, allCampgrounds) {
        if (err) {
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
    campgrounds.push(newCampground);
    res.redirect("/campgrounds");
});

app.get("/campgrounds/new", function(req, res) {
   res.render("new"); 
});

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("The YelpCamp Server has started!!!")
});