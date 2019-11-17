let mongoose=require("mongoose");
let Schema=mongoose.Schema;
let user=new Schema({
    username:{
        type:String,

    },
    password:{
        type:String
    },
    email:{
        type:String
    }
})
module.exports=mongoose.model("User",user);