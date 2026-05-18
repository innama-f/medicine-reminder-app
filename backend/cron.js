const cron = require("node-cron");
const Medicine = require("./models/Medicine");
const admin = require("./firebase");

cron.schedule("* * * * *", async () => {

  const meds = await Medicine.find({
    reminder: true
  });

  const now = new Date();

  const currentTime =
    now.toTimeString().slice(0,5);

  meds.forEach(async (med) => {

    // Skip if already taken
    if (med.status === "taken") return;

    // First reminder
    if (
      med.time === currentTime
    ) {

      await sendNotification(med);

      return;
    }

    // Repeat every 30 mins
   

  });

}, {
  timezone: "Asia/Kolkata"
});

async function sendNotification(med) {

  if (!med.token) {
    console.log("❌ No token for:", med.name);
    return;
  }

  try {
    console.log("Medicine token:", med.token);

    await admin.messaging().send({

  token: med.token,

  webpush: {
    notification: {
      title: "Medicine Reminder",
      body: `Take ${med.name} (${med.doseAmount} ${med.doseUnit})`,
      icon: "/logo192.png"
    }
  }

});
    console.log(
      "✅ Notification sent for",
      med.name
    );

  } catch (err) {

    console.log(
      "❌ Notification Error:",
      err.message
    );
  }
}