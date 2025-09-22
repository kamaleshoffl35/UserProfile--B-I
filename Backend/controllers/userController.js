const User = require("../models/User");

exports.register=async(req,res)=>{
  try {
    const {name,email,password,phone,role,avatar,address}=req.body;
    if(!name || !email || !password)
         return res.status(400).json({ error: "name, email and password required" })
    const exists = await User.findOne({email})
    if(exists) 
        return res.status(400).json({error:"Email already in use"});
    const user=new User({name,email,password,phone,role,avatar,address});
    await user.save();
    const userObj = user.toObject();
    delete userObj.password;
    res.status(201).json(userObj);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.login=async (req, res) => {
  try{
    const {email,password}=req.body;
    if (!email || !password) 
        return res.status(400).json({ error: "email and password required" });
    const user = await User.findOne({email});
    if (!user) 
        return res.status(400).json({ error: "Invalid credentials" });
    const ok = await user.comparePassword(password);
    if (!ok) 
        return res.status(400).json({ error: "Invalid credentials" });
    const userObj = user.toObject();
    delete userObj.password;
    res.json(userObj);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.getUserById=async(req,res) => {
  try{
    const id=req.params.id;
    const u=await User.findById(id).select("-password");
    if (!u) 
        return res.status(404).json({ error: "User not found" });
    res.json(u);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.getMe = async (req, res) => {
  try{
    const id=req.header("x-user-id") || req.query.userId;
    if (!id) 
        return res.status(400).json({error: "user id required in x-user-id header or ?userId="});
    const u=await User.findById(id).select("-password");
    if (!u) 
        return res.status(404).json({ error: "User not found" });
    res.json(u);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateUser=async(req,res) => {
  try {
    const id=req.params.id;
    const update={ ...req.body };
    if (update.password) {
      const user=await User.findById(id);
      if (!user) 
        return res.status(404).json({ error: "User not found" });
      user.set(update);
      await user.save();
      const obj = user.toObject(); 
      delete obj.password;
      return res.json(obj);
    }else{
      const user=await User.findByIdAndUpdate(id,update,{ new: true }).select("-password");
      if (!user) 
        return res.status(404).json({ error: "User not found" });
      res.json(user);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.listUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
