const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const userSchema = new mongoose.Schema({
  name:{type:String,required:true},
  email:{type:String,required:true,unique:true},
  phone:{type:String},
  role:{type:String},
  avatar:{type:String}, 
  address:{type:String},
  password:{type:String,required:true },
  status:{type:Boolean,default:true }
}, { timestamps:true });

userSchema.pre("save", async function(next){
  if (!this.isModified("password")) 
    return next();
  try {
    const salt=await bcrypt.genSalt(10);
    this.password=await bcrypt.hash(this.password, salt);
    return next();
  } catch(err) {
    return next(err);
  }
});

userSchema.methods.comparePassword=async function(candidate){
  return bcrypt.compare(candidate, this.password);
};

module.exports = mongoose.model("User",userSchema);
