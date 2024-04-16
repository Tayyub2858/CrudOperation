const express = require("express")
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");
const port = 5000
const app = express();
dotenv.config();
app.use(express.json())
app.use(cors());

const UserModal = require("./Schema/Schema");

const mongoodb = (process.env.DATABASE)

mongoose.connect(mongoodb)
.then(console.log("Mongodb Connected"))

// how to post data through apis mongodb 
app.post('/CreateUser', (req, res)=>{
    const {name, email, address} = req.body;
    UserModal.create({
        name : name,
        email : email,
        address : address
    }).then(result=>{
        console.log(result)
        res.status(200).json({ message: 'User added successfully' });
    }).catch(err =>{
        console.log(err)
        res.status(500).json({ error: 'Failed to add user' });
    })
})

// how to get the data into mongoodb 
app.get('/getUser', (req, res) => {
    UserModal.find( )
        .then(result => res.json(result))
        .catch(err => console.log(err))
})

// how to get a single user
app.get('/getUser/:id', (req,res)=>{
    UserModal.findById(req.params.id)
    .then(result => res.json(result))
    .catch(err => console.log(err))
})

// how to update the user 
app.put('/userUpdate/:id', (req, res)=>{
    const {name, email, address} = req.body;
    UserModal.findByIdAndUpdate(req.params.id, {name, email, address},{new :true})
    .then(result => res.json(result))
    .catch(err => console.log(err))
})
// how to delete the user 

app.delete('/userDelete/:id', (req, res)=>{
    UserModal.findByIdAndDelete(req.params.id)
    .then(result => res.json(result))
    .catch(err => console.log(err)) 
})

app.listen(port, (req, res)=>{
    console.log("Server is running on ",+ port)
})
