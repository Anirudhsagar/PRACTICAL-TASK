

 const express = require ("express");
  const route = express.Router()

  

  const {addCity,getCity} = require("../controller/cityController")

  const User = require("../controller/userController")

  route.get("/", (req,res)=> {
    return res.json("Api is Working")
  })

//   ===================== City =================

route.post("/addCity", addCity)

route.get("/city", getCity)

//   Step 3: Consume 3rd Party API






//   ==================== user

route.post("/addUser",User.addUser)

route.get("/user", User.getUser)

route.put("/user/update/:userId",User.updateUser)



//   route handler ======================

route.all("/*", (req,res) =>{
    res.status(400).send({status:false, message: "Endpoint is not correct"})
});

module.exports = route