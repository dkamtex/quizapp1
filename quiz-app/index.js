var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

const app = express()

app.use(bodyParser.json())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({
    extended:true
}))

mongoose.connect('mongodb://Localhost:27017/mydb',{
    useNewUrlParser: true,
    useUnifiedTopology:true
});

var db = mongoose.connection;

db.on('error',()=>console.log("error in connecting to database"))
db.once('open',()=>console.log("connected to database"))
app.post("/quiz-app",(req,res)=>{
    var name = req.body.name;
    var emai = req.body.emai;
    var phone = req.body.phone;
    var password = req.body.password;
    
    var data = {
        "name": name,
        "email": email,
        "phone": phone,
        "password":password
    }

    db.collection("users").insertOne(data,(err,collection)=>{
        if(err){
            throw err;
        }
        console.log("record inserted successfully");
    });

    return res.redirect('quiz-app_success.html')
})

app.get("/",(req,res)=>{
    res.set({
        "Allow-access-Allow-Origin": '*'
    })
    return res.redirect('index.html');
}).listen(3000);

console.log("listening on port 3000");