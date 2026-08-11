require("dotenv").config(); //the .env thing
const axios = require("axios"); //the API thing

const { App } = require("@slack/bolt");

const app = new App({
  token: process.env.SLACK_BOT_TOKEN, //bot token
  appToken: process.env.SLACK_APP_TOKEN, //app token
  socketMode: true
});

//quack: duckquack quacks when you run this command
app.command("/duckquack", async ({ ack, respond }) => {
  await ack();
  
  try {
    await say({ text: "quack!" });
  }
  
  catch (err) {
    await say({ text: "(Duckquack wasn't paying attention, try again!)" });
  }

});

//crack a joke: duckquack generates joke from API when you run this command
app.command("/duckquack-crackajoke", async ({ ack, respond }) => {
  await ack();

  try {
    const response = await axios.get("https://official-joke-api.appspot.com/random_joke");
    await respond({
      text:
`${response.data.setup}

${response.data.punchline}`
    });
  } catch (err) {
    await respond({ text: "Didn't come up with a witty response in time, try again!" });
  }
});

//quack a joke: duckquack quacks when you run this command
app.command("/duckquack-quackajoke", async ({ ack, respond }) => {
  await ack();

    try {
    await say({ text: "quack quack quack! (said something in duck language, presumably a joke)" });
  }
  
  catch (err) {
    await say({ text: "(Duckquack wasn't paying attention, try again!)" });
  }

});

(async () => {
  await app.start();
  console.log("bot is running!");
})();