const express = require("express");
const app = express();
const path = require("path");
const methodOverride = require("method-override");
const { v4: uuidv4 } = require('uuid');


app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(methodOverride("_method"));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
app.use(express.static(path.join(__dirname, "/public")));

let posts = [
    {
        id: uuidv4(),
        username: "apnacollege",
        content: "I love coding!"
    },
    {
        id: uuidv4(),
        username: "falguni",
        content: "Awesome!"
    },
    {
        id: uuidv4(),
        username: "shinchan",
        content: "Love it!"
    }
];

//read- get request- all posts
//index.ejs 
app.get("/posts", (req, res) => {
    res.render("index.ejs", {posts});
});

//create posts- get request - to render new form
//new.ejs
app.get("/posts/new", (req, res) => {
    res.render("new.ejs");
});

//create posts- post request - to send form to server
//get req required
app.post("/posts", (req, res) => {
    let {username, content} = req.body;
    let id = uuidv4();
    posts.push({id, username, content});
    res.redirect("/posts");
});

//read- get request - single post 
//show.ejs
app.get("/posts/:id", (req, res)=> {
    let {id} = req.params;
    let post = posts.find((p) => id === p.id);
    res.render("show.ejs", {post, id});
});

//update- put/patch request - single post
//get req required
app.patch("/posts/:id", (req, res)=> {
    let {id} = req.params;
    let newContent = req.body.content;
    let post = posts.find((p) => id === p.id);
    post.content = newContent;
    console.log(post);
    res.redirect("/posts");       
});

//update- get request - single post
//edit.ejs
app.get("/posts/:id/edit", (req, res)=> {
    let {id} = req.params;
    let post = posts.find((p) => id === p.id);
    res.render("edit.ejs", {post, id});
});

//delete - delete request- single post
//no get post required
app.delete("/posts/:id", (req, res)=> {
    let {id} = req.params;
    posts = posts.filter((p) => id !== p.id);
    res.redirect("/posts");
});

app.listen(3000, (req, res)=> {
    console.log("app listening to server at port 3000");
});



 
 