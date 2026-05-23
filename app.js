const express = require('express');
const app = express();
const userModel = require('./usermodel');



app.get('/create', async(req, res)   => {
    let createUser = await userModel.create({
        name: "hasi",
        email: "hasi@gmail.com",
        username: "hasi21"
    })
    res.send(createUser);
}) 


app.get('/update', async(req, res)  => {
   let updateUser = await userModel.findOneAndUpdate(
    {username: "harsh123"},
    {name:"harsh sharma"},  
    {new: true} 
    );

    res.send(updateUser);
})


app.get('/read', async(req,res)=>{
    let readUser = await userModel.find();

    res.send(readUser);
})
    

app.get('/delete', async(req, res)=>{
    let deleteUser = await userModel.findOneAndDelete({name: "harsh sharma"});

    res.send(deleteUser);
})


app.get('/', (req, res) => {
    res.send("Hello World");

})



app.listen(8000);