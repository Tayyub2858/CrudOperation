const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name:{
        type : String,
        require : true
    },
    email:{
        type:String,
        require:true,
        unique: true
    },
    address:String
})
const  UserSchema = mongoose.model("user", userSchema);

module.exports = UserSchema;