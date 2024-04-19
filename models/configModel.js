const mongoose = require("mongoose");

const configSchema = new mongoose.Schema({
    hospitalName:{
        type:String,
        required:true
    },
    companyName:{
        type:String,
        required:true
    },
    hospitalEmail:{
        type:String,
        required:true
    },
    hospitalPhone:{
        type:String,
        required:true
    },
    hospitalWD:{
        type:String,
        required:true
    },
    hospitalWT:{
        type:String,
        required:true
    },
    hospitalAddress:{
        type:String,
        required:true
    },
    hospitalDomain:{
        type:String,
        required:true
    },
    hospitalGST:{
        type:String,
        required:true
    },
    hospitalLicense:{
        type:String,
        required:true
    },
    hospitalFacebook:{
        type:String,
        required:true
    },
    hospitalInstagram:{
        type:String,
        required:true
    },
    hospitalYoutube:{
        type:String,
        required:true
    },
    hospitalAboutUs:{
        type:String,
        required:true
    },
    HospitalIconPath:{
        type:String,
        required:true
    },
    HospitalLogoPath:{
        type:String,
        required:true
    },
    HospitalStampPath:{
        type:String,
        required:true
    },
});

const configModel = mongoose.model("Config", configSchema);

module.exports = { configModel };
