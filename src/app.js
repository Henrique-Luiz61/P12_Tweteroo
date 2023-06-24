import express, { json } from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const arrUsers = [];
const userNames = [];
const arrTweets = [];

app.post("/sign-up", (req, res) => {
  const newUser = {
    username: req.body.username,
    avatar: req.body.avatar,
  };
  arrUsers.push(newUser);
  userNames.push(newUser.username);

  res.send("OK");
});

app.post("/tweets", (req, res) => {
  if (userNames.includes(req.body.username) === false) {
    return res.send("UNAUTHORIZED");
  }

  const newTweet = {
    username: req.body.username,
    tweet: req.body.tweet,
  };
  arrTweets.push(newTweet);

  res.send("OK");
});

app.get("/tweets", (req, res) => {
  const tweets = [
    {
      username: "bobesponja",
      avatar:
        "https://cdn.shopify.com/s/files/1/0150/0643/3380/files/Screen_Shot_2019-07-01_at_11.35.42_AM_370x230@2x.png",
      tweet: "Eu amo hambúrguer de siri!",
    },
  ];

  res.send(tweets);
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Servidor está rodando na porta ${PORT}`));
