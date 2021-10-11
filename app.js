const { json } = require("express");
const express = require("express");
const fs = require("fs");
const port = 3000;

const bodyParser = require('body-parser');
const router = express.Router();
const app = express();

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/', router);


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

// TODO: postを実装する
// 参考: https://e-words.jp/w/POST%E3%83%A1%E3%82%BD%E3%83%83%E3%83%89.html
// POST method route
// 打ち方 curl -X POST -H "Content-Type: application/json" -d '{"test":"test"}' http://localhost:3000/users
app.post('/cards', function (req, res) {
  console.log('cards post')
  // const {name, id} = req
  console.log('body is', req.body);
  // TODO:
  // Cardクラスのインスタンスを宣言して、console.logに出力
  // Cardクラスは新しく作る
  // Cardクラスのconstructorの実装だけでok
  // 持つpropertyとしては、idとtext

  // Nice to Have: db.jsonのcardsに作成したcardインスタンスを挿入できるように→db.jsonを書き換えるということ
  res.send('POST request to the homepage')
})

// TODO: cardsのidを指定して、消せるように。データの送信などはpostと同じ。db.jsonの書き換えも込み
app.delete('/cards/:id', function (req, res) {
  res.send('DELETE request to homepage')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

