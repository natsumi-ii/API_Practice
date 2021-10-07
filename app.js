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

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
