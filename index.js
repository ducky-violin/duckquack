require("dotenv").config(); //the .env thing
const axios = require("axios"); //the API thing

const { App } = require("@slack/bolt");

const app = new App({
  token: process.env.SLACK_BOT_TOKEN, //bot token
  appToken: process.env.SLACK_APP_TOKEN, //app token
  socketMode: true
});

//duckquack-help
app.command("/duckquack-bot-help", async ({ ack, respond }) => {
  await ack();
  await respond({
    text:
`Available Commands:
/duckquack-crackajoke
/duckquack-catfact - Get a cat fact`
  });
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
app.command("/duckquack-catfact", async ({ ack, respond }) => {
  await ack();

  try {
    const response = await axios.get("https://catfact.ninja/fact");
    await respond({ text: `A very random cat fact:\n${response.data.fact}` });
  } catch (err) {
    await respond({ text: "No cat found." });
  }
});

(async () => {
  await app.start();
  console.log("bot is running!");
})();