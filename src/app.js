import express, { json } from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const arrUsers = [];
const arrTweets = [];
const userNames = [];

app.post("/sign-up", (req, res) => {
  const { username, avatar } = req.body;

  if (!username || !avatar) {
    return res.status(400).send("Todos os campos são obrigatórios!");
  } else {
    const newUser = {
      username: username,
      avatar: avatar,
    };

    arrUsers.push(newUser);
    userNames.push(newUser.username);

    res.status(201).send("OK");
  }
});

app.post("/tweets", (req, res) => {
  const { username, tweet } = res.body;

  if (userNames.includes(req.body.username) === false) {
    return res.status(401).send("UNAUTHORIZED");
  } else if (!username || !tweet) {
    res.status(400).send("Todos campos são obrigatórios!");
  } else {
    const newTweet = {
      username: username,
      avatar: arrUsers[arrUsers.length - 1].avatar,
      tweet: tweet,
    };

    if (arrTweets.length === 10) {
      let tweetRemoved = arrTweets.shift();
    }

    arrTweets.push(newTweet);

    res.status(201).send("OK");
  }
});

app.get("/tweets", (req, res) => {
  res.send(arrTweets);
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Servidor está rodando na porta ${PORT}`));
