let express=require("express");
let app=express();
let cors=require("cors");
let mongoose=require("mongoose");
let User=require("./models/user");
app.use(cors());
app.use(express.json());
app.use(express.urlencoded());
app.use(express.static(__dirname+"/public/build"));
// mongoose.connect("mongodb://localhost:27017/ToDo");
mongoose.connect("mongodb://rino:rino1234@ds057857.mlab.com:57857/foodblog");
mongoose.connection.on("connected",()=>{
    console.log("Mongo Db connected"); 
});
app.get('*',function(req,res){
    res.sendFile(__dirname+"/public/build/index.html");
});
app.post('/login',(req,res)=>{
    console.log(req.body.username);
    User.findOne({username:req.body.username,password:req.body.password},(err,user)=>{
        if(err){
            console.log(err);
        }
        else{
            if(user){
                res.send({status:"success",login:true})
            }
            else{
                res.send({status:"success",login:false})
            }
        }
    })
})
// For adding users manually
app.get("/add/:username/:password/:email",(req,res)=>{
    let user=new User({
        username:req.params.username,
        password:req.params.password,
        email:req.params.email
    });
    user.save((err,user)=>{
        if(err){
            console.log(err);
        }
        else{
            res.send('New User Added');
        }
    })
})
app.listen(process.env.PORT||3001,()=>{
    console.log("Server Running");
})