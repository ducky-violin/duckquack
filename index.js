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
    text: "/duckquack-crackajoke\n/duckquack-catfact\n/duckquack-quackajoke" 
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

//crack a joke: duckquack generates joke from API when you run this command + quacks
app.command("/duckquack-quackajoke", async ({ ack, respond }) => {
  await ack();

  try {
    const response = await axios.get("https://official-joke-api.appspot.com/random_joke");
    await respond({ 
      text: `quack quack ${response.data.fact} quack quack quack`,
      response_type: "in_channel"
    });
  } catch (err) {
    await respond({ text: "No joke found." });
  }
});

//catfact
app.command("/duckquack-catfact", async ({ ack, respond }) => {
  await ack();
  
  try {
    const response = await axios.get("https://catfact.ninja");
    await respond({ 
      text: `A very random cat fact:\n${response.data.fact}`,
      response_type: "in_channel"
    });
  } catch (err) {
    await respond({ text: "No cat found." });
  }
});

(async () => {
  await app.start();
  console.log("bot is running!");
})();