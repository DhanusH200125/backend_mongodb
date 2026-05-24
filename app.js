const express = require('express');
const app = express();
const userModel = require('./usermodel');


// CRUD Operations

// Create 
app.get('/create', async(req, res)   => {
    let createUser = await userModel.create({
        name: "hasi",
        email: "hasi@gmail.com",
        username: "hasi21"
    })
    res.send(createUser);
}) 

// Read method - find() - to read all the data from the database, findOne() - to read a single document from the database, findById() - to read a document by its unique identifier.
app.get('/read', async(req,res)=>{
    let readUser = await userModel.find();

    res.send(readUser);
})

//Update method - findOneAndUpdate() - to update a single document based on a condition, findByIDAndUpdate() - to update a document by its unique identifier.
app.get('/update', async(req, res)  => {
   let updateUser = await userModel.findOneAndUpdate(
    {username: "harsh123"},
    {name:"harsh sharma"},  
    {new: true} 
    );

    res.send(updateUser);
})

// Delete method - findOneAndDelete() - to delete a single document based on a condition, findByIdAndDelete() - to delete a document by its unique identifier.
app.get('/delete', async(req, res)=>{
    let deleteUser = await userModel.findOneAndDelete({name: "harsh sharma"});

    res.send(deleteUser);
})


app.get('/', (req, res) => {
    res.send("Hello World");

})



app.listen(8000);