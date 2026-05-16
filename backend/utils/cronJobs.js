const cron = require("node-cron");
const Medicine = require("../models/Medicine");

cron.schedule("* * * * *", async ()=>{
  const now = new Date().toLocaleTimeString([], {hour:"2-digit",minute:"2-digit"});

  const meds = await Medicine.find();

  meds.forEach(m=>{
    if(m.time === now){
      console.log("Reminder:",m.name);
    }
  });
});