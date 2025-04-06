import express from "express";
const PORT = process.env.PORT || 3000;
const app = express();

app.get("/", (req, res) => {
  res.send("Helooo");
});
app.get("/user", (req, res) => {
  res.send("Hello user");
});
app.listen(PORT, () => {
  console.log("Server is running!");
});
