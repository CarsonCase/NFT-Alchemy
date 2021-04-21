const express = require('express');

const app = express();
const PORT = 8080;

let elements = {};

app.get('/', (req,res)=>{
    res.render("index.ejs");
})

app.get('/elements/:id', (req,res)=>{
    res.send(req.params.id);
});

app.get('/elements/new', (req,res)=>{
    res.send("Create new element here");
});

app.post('/elements/:id', (req,res)=>{
    if(req.params.id in elements){
        console.log("this element already exists");
    }else{
        elements[req.params.id] = "true";
        res.redirect('/elements/new');
    }  
});

app.listen(PORT,()=>{
    console.log("Listening on Port: "+PORT);
});