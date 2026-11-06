const admin = require("firebase-admin");
const notificationRepository = require("../modules/notification/repositories/notification.repository");
const { title } = require("errorhandler");
const transforms = require("../utilities/apiResponse");

const sendNotification = async (tokens, data, { from, to }, receiver) => {
  for (const tokenObj of tokens) {
    const push_token = tokenObj.push_token;

    if (!push_token) {
      console.warn("🚨 Skipping notification: No push token available.");
      continue;
    }

    let time = Intl.DateTimeFormat("fa-IR", {
      hour: "numeric",
      minute: "numeric",
    }).format(Date.now());

    const message = {
      notification: data,
      data: { time },
      token: push_token,
    };
    let res = null
    try {
      res = await admin.messaging().send(message);
      console.log("✅ Successfully sent message:", res);

      // Extract message ID
      res = res.split("/")[3];

      console.log(`-- Firebase => successfully sent message: ${from} to ${to} | message ID : ${res} --`);



    } catch (error) {
      console.error("❌ Error sending notification:", error);

    }
          // Create notification in the database
          const reciever_type = to === "USER" ? "user_id" : "admin_id";
          await notificationRepository.create({
            title: data.title,
            body: data.body,
            reciever: { [reciever_type]: receiver }, 
          });
          return res;
    
  }
};
module.exports = { sendNotification };
