const express = require("express");
const fs = require("fs");
const app = express();
const port = 3000;

// curl http://localhost:3000 でレスポンスが来る
app.get("/", (req, res) => {
  res.send("Hello Worldddddddddddddddddd!");
});

// curl http://localhost:3000/api/v1/columns でレスポンスが来る
app.get("/api/v1/columns", (req, res) => {
  try {
    const jsonString = fs.readFileSync("./db.json");
    res.send(jsonString);
    return;
    // res.send('Hello World!')
  } catch (err) {
    console.log(err);
    return;
  }
});

// TODO: ここを実装する
app.get("/api/v1/search", (req, res) => {
  try {
    const jsonString = JSON.parse(fs.readFileSync("./db.json"));
    const cards = jsonString.cards;
    for (let i = 0; i < `${cards.length}`; i++) {
      cards[i].createdAt = new Date();
      cards[i].updatedAt = new Date();
    }
    // 現在のレスポンス {"id":"7lR4Vd3EYixP","text":"布団から出る\n(:3っ)っ -=三[＿＿]"}
    // 理想のレスポンス {"id":"7lR4Vd3EYixP","text":"布団から出る\n(:3っ)っ -=三[＿＿]", createdAt: 現在の時刻、 updatedAt: 現在の時刻 }

    res.send(cards[0]);
    return;
    // res.send('Hello World!')
  } catch (err) {
    console.log(err);
    return;
  }
});

// TODO: ここを実装する
app.get("/api/v1/columns/1", (req, res) => {
  // columnsの1番目を返す
  try {
    const jsonString = JSON.parse(fs.readFileSync("./db.json"));
    const columns = jsonString.columns;

    res.send(columns[0]);
    return;
    // res.send('Hello World!')
  } catch (err) {
    console.log(err);
    return;
  }
});

// TODO: ここを実装する
app.get("/api/v1/columns/count", (req, res) => {
  // columnsの個数を返す
  // 理想のレスポンス { count: '数字' }
  try {
    const jsonString = JSON.parse(fs.readFileSync("./db.json"));
    const columns = jsonString.columns;

    res.send(`{ count: '${columns.length}' }`);
    return;
    // res.send('Hello World!')
  } catch (err) {
    console.log(err);
    return;
  }
});

// TODO: ここを実装する
app.get("/api/v1/cards/text/count", (req, res) => {
  // cardsのテキストの長さを返す
  // 理想のレスポンス
  // {
  //   "id": "7lR4Vd3EYixP",
  //   "text": "布団から出る\n(:3っ)っ -=三[＿＿]"
  //   "length": 10,
  // },
  // {
  //   "id": "TsXP5w9qLeM-",
  //   "text": "顔を洗う👐"
  //   "length": 10,
  // },
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
