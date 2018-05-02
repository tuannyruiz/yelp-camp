var express = require('express');
var app = express();

app.set("view engine", "ejs");

app.get("/", function(req, res) {
    res.render("landing");
});

app.get("/campgrounds", function(req, res) {
    var campgrounds = [
        {name: "Salmon Creeks", image: "https://pixabay.com/get/ea36b7062bf6093ed1584d05fb1d4e97e07ee3d21cac104497f5c370a4eeb6b9_340.jpg"},
        {name: "Granite Hill", image: "https://farm4.staticflickr.com/3273/2602356334_20fbb23543.jpg"},
        {name: "Mountain Goat's Rest", image: "https://farm8.staticflickr.com/7258/7121861565_3f4957acb1.jpg"}
    ]
    
    res.render("campgrounds", {campgrounds: campgrounds});
})

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("The YelpCamp Server has started!!!")
});