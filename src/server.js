const express = require("express");
var morgan = require("morgan");
const bodyParser = require("body-parser");
require("dotenv").config();
const accountServerRouter = require("./routers/accountSever");

// error
const { errorHandlingMiddleware } = require("./middlewares/errorHandling");

const app = express();
const port = process.env.PORT || 8080;

// Middleware
app.use(morgan("dev"));
app.use(bodyParser.json());

// Database
// Mongodb
require("./db/init.mongodb");
require("./configs/db.config").dbInitial();
// Redis
// const client = require("./db/connections_redis");
// client.set("foo", "anonystick");
// client.get("foo", (err, result) => {
//   if (err) console.log("redis get error: ", err.message);
//   console.log("get foo:", result);
// });

// Routers
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/account-server", accountServerRouter);

// Middleware error handling
app.use(errorHandlingMiddleware);

app.listen(port, () => {
  console.log(`app listening on port localhost:${port}`);
});
