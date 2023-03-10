

const cityModel = require("../model/cityModel");

const mongoose = require("mongoose");
const userModel = require("../model/userModel");


const addUser = async (req,res)=> {
    try {
        let data = req.body;
        let { name, city, mobile, media_url } = data;

        if (!name) {
            return res.status(300).json("Please enter a name");
        }


        const alphaName = /^[a-zA-Z]+$/;

        let checkName = alphaName.test(data.name);
        if(!checkName) {
            return res.status(300).json("Name can have only aplhabets");
        }

        if(!data.city) {
            return res.status(300).json("Please Enter a city");

        }

        let findCity = await cityModel.findOne({ city });
        if(!findCity) {
            return res.status(300).json("Please Enter a Valid City name");

        }

        const  numMobile = /[1-9]/;

        if(mobile){
            let checkMobile = numMobile.test(data.mobile);
          
            if(!checkMobile) {
                return res.status(300).json("MObile can have only Numbers");
            }

        }

        if(media_url){
            const alphaUrl = /^(https:\/\/)/;

            let checkUrl = alphaUrl.test(data.media_url);
            if(!checkUrl) {
                return res.status(300).json(" Url should start with https://");
            }

        }
    
        let saveData = await userModel.create(data);
      
        let hideId = await userModel.findOne({_id : saveData._id }).select({ _id:0 })
        return res.status(200).json(hideId);
    

    } catch (error) {
        return res.status(500).json(error.message);
    }
};

const getUser = async (req,res) => {
    try {
        let user = await userModel.find({});
        return res.status(200).json(user);

    } catch (error) {
        return res.status(500).json(error.message);
    }
};

const updateUser = async (req,res) =>{
    try {
        let data = req.body;
        let {  city } = data;

        let id = req.params.userId;
        console.log(id)

        if(!mongoose.isValidObjectId(id)){
            return res.status(300).json("Please enter a valid user id");

        }

        let findUser = await userModel.findById(id);
        

        if(!findUser) {
            return res.status(300).json("User not found");
        }


        let user = await userModel.findOneAndUpdate( { data}, { $set: data});

        if (data.city) {
            let findCity = await cityModel.findOneAndUpdate( { city});
            if(!findCity) {
                return res.status(300).json("Please Enter a city name");
            }
        }
        let save = await userModel.findByIdAndUpdate(
            { _id: id },
            { $set: data },
            { new: true }
          );
          return res.status(200).json(save);

    } catch (error) {
        return res.status(500).json(error.message);
    }
}

module.exports = { addUser, getUser ,  updateUser};