//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const ejs = require("ejs");
const _ = require("lodash");
// const { functionsIn } = require("lodash");

// var length = 3;
// var myString = "ABCDEFG";
// var myTruncatedString = myString.substring(0,length);

const homeStartingContent = "Hello Developer, I am Suman Patra a Developer,My first and foremost aim is too build a strong career by doing and carrying out all the task assigned to me as an web developer, with respect to the developement I should also be perfect in my algorithm skills to build a strong professional career in my near future";
const contactContent = "Email Address = patrasuman2000@gmail.com";
const aboutContent = "I am a web developer";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true 
}));
app.use(express.static("public"));

mongoose.connect("Add ur mongodbWebsite", {useNewUrlParser:true, useUnifiedTopology: true});

const postSchema = {
  title: String,
  content: String
};

const Post = mongoose.model("Post", postSchema);

// let posts = [];

app.get("/", function(req, res) {

  Post.find({}, function(err, posts){
  res.render("home", {
    startingContent: homeStartingContent,
    posts: posts
  });
});
});

app.get("/contact", function(req, res) {
  res.render("contact", {
    contactContent: contactContent
  });
});

app.get("/about", function(req, res) {
  res.render("about", {
    aboutContent: aboutContent
  });
});

app.get("/compose", function(req, res) {
  res.render("compose");
})

app.post("/compose", function(req, res) {
  // console.log(req.body.postBody);
  const post = new Post ({
    title: req.body.postTitle,
    content: req.body.postBody
  });

  post.save(function(err){
    if(!err){
      res.redirect("/");
    }
  });
});


app.get("/posts/:postid", function(req, res) {
  // const requestedTitle = _.lowerCase(req.params.postName);
  const requestedPostid = req.params.postid;  

  Post.findOne({_id: requestedPostid}, function(err, post){ 
    res.render("post", {
      title: post.title,
      content: post.content
    });
  });
});

  app.listen(3000, function() {
  console.log("Server started on port 3000");
});
