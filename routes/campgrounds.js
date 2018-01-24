var express    = require("express"),
    Campground = require("../models/campground"),
    middleware = require("../middleware"),
    router     = express.Router({mergeParams: true});
    
//index route - show all campgrounds
router.get("/", (req, res)=>{
    Campground.find({}, (err, allCampgrounds)=>{
        if(err){
            console.log(err);
        }else{
            res.render("campgrounds/index", {campgrounds: allCampgrounds});
        }
    });
});

// create route - add campground to DB
router.post("/", middleware.isLoggedIn, (req, res)=>{
   var campName = req.body.name;
   var campImage = req.body.image;
   var campDesc = req.body.description;
   var author = {
       id: req.user._id,
       username: req.user.username
   };
   var newCampground = {name: campName, image: campImage, description: campDesc, author: author};
   Campground.create(newCampground, (err, newlyCreated)=>{
       if(err){
           console.log(err);
       } else{
            res.redirect("/campgrounds");           
       }
   });
});

//New route - show form to create new campground
router.get("/new", middleware.isLoggedIn, (req, res)=>{
    res.render("campgrounds/new");
});

// Show route - show more info about one campground
router.get("/:id", (req, res)=>{
    // find campground with provided ID, and populate the comments
    Campground.findById(req.params.id).populate("comment").exec((err, foundCampground)=>{
        if(err){
            console.log(err);
        } else {
            // render show template for that campground
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
});

// Edit campground route
router.get("/:id/edit", middleware.checkCampgroundOwnership, (req, res)=>{
    Campground.findById(req.params.id, (err, foundCampground)=>{
        res.render("campgrounds/edit", {campground: foundCampground});
    });
});

// Update campground route
router.put("/:id", middleware.checkCampgroundOwnership, (req, res)=>{
    //find and update campground
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, (err, updatedCampground)=>{
        if(err){
            res.redirect("/campgrounds");
        }else{
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

//Destroy route
router.delete("/:id", middleware.checkCampgroundOwnership, (req, res)=>{
    Campground.findByIdAndRemove(req.params.id, (err)=>{
        if(err){
            res.redirect("/campgrounds");
        } else {
            res.redirect("/campgrounds");
        }
    });
});

module.exports = router;