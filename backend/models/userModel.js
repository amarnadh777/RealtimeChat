const mongoose =require('mongoose')
const userSchema = mongoose.Schema({

    fullName:{type:String,required:true}
    ,email:{type:String,requied:true},
    password:{type:String,requied:true},
    profileImg:{type:String,default:""}


}
,{timestamps:true}
)
const userModel = mongoose.model('User',userSchema)
module.exports = userModel