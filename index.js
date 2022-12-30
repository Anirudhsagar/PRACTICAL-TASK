const bodyParser = require("body-parser");
const route = require("./src/routes/route");
const express = require("express")
const mongoose = require("mongoose");
const app = express();
const axios = require("axios")

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:true}));


axios.get('https://api.binance.com/api/v1/time')
 .then(response => {
    console.log(response.data);
 })
 .catch(error =>{
    console.log(error)
 })

 


mongoose.connect("mongodb+srv://anirudhsagar:fgAGHtahZoVNyIR3@cluster0.btvli.mongodb.net/Practical",{
    useNewUrlParser: true
})
.then(() => console.log("MongoDb is Connected"))
      .catch(err => console.log(err));

      app.use("/", route)

      app.listen(  4000, function(){
        console.log("Express app is running on port" )
      });