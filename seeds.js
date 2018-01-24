var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var seedData = [
    {
        name: "Hippy Heaven",
        image: "https://farm4.staticflickr.com/3795/10131087094_c1c0a1c859.jpg",
        description: "Computer, belay that order. Is it my imagination, or have tempers become a little frayed on the ship lately? A surprise party? Mr. Worf, I hate surprise parties. I would *never* do that to you. What's a knock-out like you doing in a computer-generated gin joint like this? I'd like to think that I haven't changed those things, sir. Sure. You'd be surprised how far a hug goes with Geordi, or Worf. And blowing into maximum warp speed, you appeared for an instant to be in two places at once. When has justice ever been as simple as a rule book? Worf, It's better than music. It's jazz. We could cause a diplomatic crisis. Take the ship into the Neutral Zone Well, I'll say this for him - he's sure of himself. In all trust, there is the possibility for betrayal."
    },
    {
        name: "Hippy Hell",
        image: "https://farm6.staticflickr.com/5487/11519019346_f66401b6c1.jpg",
        description: "Computer, belay that order. Is it my imagination, or have tempers become a little frayed on the ship lately? A surprise party? Mr. Worf, I hate surprise parties. I would *never* do that to you. What's a knock-out like you doing in a computer-generated gin joint like this? I'd like to think that I haven't changed those things, sir. Sure. You'd be surprised how far a hug goes with Geordi, or Worf. And blowing into maximum warp speed, you appeared for an instant to be in two places at once. When has justice ever been as simple as a rule book? Worf, It's better than music. It's jazz. We could cause a diplomatic crisis. Take the ship into the Neutral Zone Well, I'll say this for him - he's sure of himself. In all trust, there is the possibility for betrayal."
    },
    {
        name: "Hippy Hop",
        image: "https://farm1.staticflickr.com/189/493046463_841a18169e.jpg",
        description: "Computer, belay that order. Is it my imagination, or have tempers become a little frayed on the ship lately? A surprise party? Mr. Worf, I hate surprise parties. I would *never* do that to you. What's a knock-out like you doing in a computer-generated gin joint like this? I'd like to think that I haven't changed those things, sir. Sure. You'd be surprised how far a hug goes with Geordi, or Worf. And blowing into maximum warp speed, you appeared for an instant to be in two places at once. When has justice ever been as simple as a rule book? Worf, It's better than music. It's jazz. We could cause a diplomatic crisis. Take the ship into the Neutral Zone Well, I'll say this for him - he's sure of himself. In all trust, there is the possibility for betrayal."
    }
];

function seedDB(){
    // REMOVE ALL DATA
    Campground.remove({}, function(err){
        if(err){
            console.log(err);
        } else {
            console.log("database emptied");
            //ADD A FEW CAMPGROUNDS
            seedData.forEach(function(seed){
                Campground.create(seed, function(err, campground){
                    if(err){
                        console.log(err);
                    } else {
                        console.log("added campground");
                        // CREATE A COMMENT
                        Comment.create(
                            {
                                text:"This place is full of dirty hippies",
                                author:"Cartman"
                            }, function (err, comment){
                                if (err){
                                    console.log(err);
                                } else {
                                    campground.comments.push(comment);
                                    campground.save();
                                    console.log("created new comment");
                                }
                            });
                    }
                });
            });
        }
    });
    
    //ADD A FEW COMMENTS
}
module.exports = seedDB;