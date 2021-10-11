const { json } = require("express");
const express = require("express");
const fs = require("fs");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello Worldddddddddddddddddd!");
});

app.get("/api/v1/columns", (req, res) => {
  try {
    const jsonString = fs.readFileSync("./db.json");
    res.send(jsonString);
    return;
  } catch (err) {
    console.log(err);
    return;
  }
});

app.get("/api/v1/search", (req, res) => {
  try {
    const jsonString = JSON.parse(fs.readFileSync("./db.json"));
    const card = jsonString.cards[0];
    card.createdAt = new Date();
    card.updatedAt = new Date();

    res.send(card);
    return;
  } catch (err) {
    console.log(err);
    return;
  }
});

app.get("/api/v1/columns/count", (req, res) => {
  // columnsの個数を返す
  try {
    const jsonString = JSON.parse(fs.readFileSync("./db.json"));
    const columns = jsonString.columns;

    res.send({ count: columns.length });
    return;
  } catch (err) {
    console.log(err);
    return;
  }
});

app.get("/api/v1/cards/text/count", (req, res) => {
  // cardsのテキストの長さを返す
  try {
    const jsonString = JSON.parse(fs.readFileSync("./db.json"));
    const cards = jsonString.cards;
    for (let i = 0; i < `${cards.length}`; i++) {
      cards[i].length = cards[i].text.length;
    }
    res.send(cards);
    return;
  } catch (err) {
    console.log(err);
    return;
  }
});

app.get("/users/:userId/books/:bookId", function (req, res) {
  const userId = req.params.userId;
  const users = ["first", "second", "third"];
  res.send(users[parseInt(userId)]);
});

// TODO: columnsの中から、indexを指定して、合致するcolumnを返せるように変形する
app.get("/api/v1/columns/1", (req, res) => {
  // columnsの1番目を返す
  try {
    const jsonString = JSON.parse(fs.readFileSync("./db.json"));
    const columns = jsonString.columns;

    res.send(columns[0]);
    return;
  } catch (err) {
    console.log(err);
    return;
  }
});

app.get("/users/cards/:index", function (req, res) {
  const index = req.params.index;
  const jsonString = JSON.parse(fs.readFileSync("./db.json"));
  const cards = jsonString.cards;
  const users = ["first", "second", "third"];
  res.send(cards[parseInt(index)]);
});

app.get("/users/cardsOrder/:key", function (req, res) {
  const key = req.params.key;
  const a = `\"${key}\"`
  const jsonString = JSON.parse(fs.readFileSync("./db.json"));
  // const jsonString = fs.readFileSync("./db.json");
  const cardsOrder = jsonString.cardsOrder;
  // const key = Object.keys(cardsOrder);
const type = typeof(cardsOrder)
const test = cardsOrder[key]
console.log('a is',a)
console.log('key is', key)

  res.send(test);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

