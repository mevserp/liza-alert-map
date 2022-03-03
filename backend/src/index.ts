import "dotenv/config";
import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("Well done!");
});

app.listen(process.env.PORT, () => {
  console.log(`The app is listening on port ${process.env.PORT}!`);
});
