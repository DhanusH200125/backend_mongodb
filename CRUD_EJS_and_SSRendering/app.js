const express = require('express');
const path = require('path');
const app = express();
const userModel = require('./models/users');

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));


app.get('/', (req, res) => {
    res.render("index");

})

app.get('/read', async(req, res) => {
    let allusers = await userModel.find();
    res.render("read", {users: allusers});
})

app.post('/create', async(req, res) => {
    let {username, email, imageUrl} = req.body;
    let createdUser = await userModel.create({
        username: username,
        email: email,
        imageUrl: imageUrl,
    })
    res.redirect('/read');
    // res.send(createdUser);
})

app.get('/delete/:_id', async(req, res) =>{
    let {_id} = req.params;
    let allusers = await userModel.findOneAndDelete({_id: _id});
    res.redirect('/read');

})

app.get('/edit/:userId', async(req, res) =>{
    // let {_id: userId} = req.params; 
    let user = await userModel.findOne({_id: req.params.userId});
    res.render('edit', {user: user});


})


app.post('/update/:userId', async(req, res) =>{ 
    let user = await userModel.findOneAndUpdate({_id: req.params.userId}, {
        username: req.body.username,
        email: req.body.email,
        imageUrl: req.body.imageUrl,
    }, {new: true}
    );
    res.redirect("/read");

})

app.get('/check-data', async(req, res) => {
    let allusers = await userModel.find();
    console.log(req.params);
    res.json(allusers);  // This will show raw data in json format
})




app.listen(8000);

