const express = require("express");
const { connection } = require("./Config/db");
const { bookRoute } = require("./Router/BookRouter");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Home Page");
});



app.use("/", bookRoute)

app.listen(8080, async () => {
  try {
    await connection;
    console.log("Connected to DB");
  } catch (error) {
    console.log(" Cannot Connected to DB");
    console.log(error);
  }
  console.log("Running the server at port 8080");
});
