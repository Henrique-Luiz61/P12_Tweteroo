import express, { json } from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const arrUsers = [];
const userNames = [];
const arrTweets = [];
const objTweet = {
  username: "",
  avatar: "",
  tweet: "",
};

app.post("/sign-up", (req, res) => {
  const newUser = {
    username: req.body.username,
    avatar: req.body.avatar,
  };
  arrUsers.push(newUser);
  userNames.push(newUser.username);
  objTweet.avatar = newUser.avatar;

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
  objTweet.username = newTweet.username;
  objTweet.tweet = newTweet.tweet;

  res.send("OK");
});

app.get("/tweets", (req, res) => {
  if (arrTweets.length === 10) {
    arrTweets.shift();
  }

  if (objTweet.tweet !== "") {
    arrTweets.push(objTweet);
  }

  res.send(arrTweets);
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Servidor está rodando na porta ${PORT}`));
