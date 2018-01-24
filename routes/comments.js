var express    = require("express"),
    router     = express.Router({mergeParams: true}),
    Campground = require("../models/campground"),
    middleware = require("../middleware"),
    Comment    = require("../models/comment");

//add comment form
router.get("/new", middleware.isLoggedIn, (req, res)=>{
    Campground.findById(req.params.id, (err, campground)=>{
        if(err){
            console.log(err);
        } else {
            res.render("comments/new", {campground: campground});
        }
    });
});

//add new comment
router.post("/", middleware.isLoggedIn, (req, res)=>{
    //lookup campground using id
    Campground.findById(req.params.id, (err, campground)=>{
        if(err){
            console.log(err);
        } else {
            //create new comment
            Comment.create(req.body.comment, (err, comment)=>{
                if(err){
                    req.flash("error", "Something went wrong, please try again");
                    console.log(err);
                } else {
                    //add username and id to comment
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    comment.save();
                    //connect new comment to campground
                    campground.comment.push(comment);
                    campground.save();
                    //redirect to campground show page
                    req.flash("success", "New comment added");
                    res.redirect("/campgrounds/" + campground._id);
                }
            });
        }
    });
});

//edit comment route - nested route!!
router.get("/:comment_id/edit", middleware.checkCommentOwnership, (req, res)=>{
    Comment.findById(req.params.comment_id, (err, foundComment)=>{
        if(err){
            res.redirect("back");
        } else {
            res.render("comments/edit", {campground_id: req.params.id, comment: foundComment});
        }
    });
});

//Comment update route
router.put("/:comment_id", middleware.checkCommentOwnership, (req, res)=>{
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, (err, updatedComment)=>{
        if(err){
            res.redirect("back");
        } else {
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

//delete comment route
router.delete("/:comment_id", middleware.checkCommentOwnership, (req, res)=>{
   Comment.findByIdAndRemove(req.params.comment_id, (err)=>{
       if(err){
           res.redirct("back");
       } else {
           req.flash("success", "Comment deleted")
           res.redirect("/campgrounds/" + req.params.id);
       }
   });
});

module.exports = router;