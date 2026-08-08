require("dotenv").config(); //the .env thing
const axios = require("axios"); //the API thing

const { App } = require("@slack/bolt");

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  appToken: process.env.SLACK_APP_TOKEN,
  socketMode: true
});

//quack
app.command("/duckquack-bot", async ({ command, ack, respond }) => {
  const start = Date.now();
  await ack();
  const latency = Date.now() - start;
  await respond({ text: `quack!\nLatency: ${latency}ms` });
});

//crack a joke
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

//quack a joke
app.command("/duckquack-bot", async ({ command, ack, respond }) => {
  const start = Date.now();
  await ack();
  const latency = Date.now() - start;
  await respond({ text: `quack quack quack! (said something in duck language, presumably a joke)\nLatency: ${latency}ms` });
});

(async () => {
  await app.start();
  console.log("bot is running!");
})();