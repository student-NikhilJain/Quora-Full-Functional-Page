const express = require("express");
const app = express();
const port = 8081;

const { v4: uuidv4 } = require('uuid');
uuidv4();

const methodOverride = require('method-override')
app.use(methodOverride('_method'))


// To run ejs, set the view engine 
app.set("view engine" , "ejs");

// Views Directory ka path express ko batane ke liye 
const path = require("path");
app.set("views" , path.join(__dirname, "views"));

// Public Directory ka correct path express ko batayenge ...
app.use(express.static(path.join(__dirname , "public")));

// use middleware 
app.use(express.urlencoded({extended : true}));

app.get("/" , (req,res)=>{
    res.send("Server Working Well ! ")
})


// data
let posts = [
    {
        id: uuidv4(),
        username : "Apna College",
        content : "I love Coding",
    },
    {
        id: uuidv4(),
        username : "Nikhil Jain",
        content : " Hard Work is  must for success",

    },
    {
        id : uuidv4(),
        username : "Thomas Alva Edison",
        content : " Failure is NEcessary in life If I dont fail How I will learn more",

    },
]
app.get("/posts" , (req,res)=>{
   res.render("index.ejs" , {posts});
})

// To add a new post 
app.get("/posts/new" , (req,res)=>{
    res.render("new.ejs")
})

//  it will accept a post on "/posts" route 
app.post("/posts" , (req,res)=>{
    let {username, content} = req.body
    let id = uuidv4();
    posts.push({ id, username , content});
    res.redirect("/posts");
})

// To Search a Post By Id : (Show/View Route)
app.get("/posts/:id", (req,res)=>{
    let {id} = req.params;
    console.log(id);
   let post = posts.find((p)=> id === p.id);
   res.render("show.ejs" , {post} );
})
// Creating our Patch Request 


app.patch("/posts/:id" , (req,res)=>{
    let {id} = req.params;
    let newContent = req.body.content;
    let post = posts.find((p)=> id === p.id);
    post.content = newContent;
    console.log(post);
    res.redirect("/posts")
})

// Edit Route ke liye e=request accept karenge 
app.get("/posts/:id/edit", (req,res)=>{
    let {id} = req.params;
    let post = posts.find((p)=> id === p.id);
    res.render("edit.ejs",{ post })
   
})


app.delete("/posts/:id" , (req,res)=>{
    let {id} = req.params;
     posts = posts.filter((p)=> id !== p.id);
    res.redirect("/posts")
})











app.listen(port,()=>{
    console.log(`Server is on and Listening on port ${port}`)
})
