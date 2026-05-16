const Medicine = require("../models/Medicine");

exports.add = async (req,res)=>{
  const med = await Medicine.create({...req.body,userId:req.user.id});
  res.json(med);
};

exports.get = async (req,res)=>{
  const meds = await Medicine.find({userId:req.user.id});
  res.json(meds);
};

exports.update = async (req,res)=>{
  const med = await Medicine.findByIdAndUpdate(req.params.id,req.body,{new:true});
  res.json(med);
};

exports.delete = async (req,res)=>{
  await Medicine.findByIdAndDelete(req.params.id);
  res.send("Deleted");
};