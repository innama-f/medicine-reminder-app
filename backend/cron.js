const cron = require("node-cron");
const Medicine = require("./models/Medicine");
const admin = require("./firebase");
console.log("🚀 CRON FILE LOADED");

cron.schedule(
  "* * * * *",
  async () => {

    console.log("⏰ CRON RUNNING");

    const meds = await Medicine.find({
      reminder: true
    });

    const now = new Date();

    const currentTime = now.toLocaleTimeString(
      "en-GB",
      {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
        timeZone: "Asia/Kolkata"
      }
    );

    console.log("Current:", currentTime);

    meds.forEach(async (med) => {

  if (med.status === "taken") return;

  // FIRST REMINDER
  if (
    med.time === currentTime &&
    !med.lastReminder
  ) {

    await sendNotification(med);

    med.lastReminder = new Date();

    await med.save();

    return;
  }

  // REPEAT EVERY 30 MINUTES
  if (med.lastReminder) {

    const diff =
      (now - new Date(med.lastReminder))
      / (1000 * 60);

    if (diff >= 30) {

      await sendNotification(med);

      med.lastReminder = new Date();

      await med.save();
    }
  }

});

  },
  {
    timezone: "Asia/Kolkata"
  }
);
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