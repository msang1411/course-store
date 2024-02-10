const express = require("express");
var morgan = require("morgan");
const bodyParser = require("body-parser");
require("dotenv").config();
const accountServerRouter = require("./routers/accountSever");

const app = express();
const port = process.env.PORT || 8080;

// Middleware
app.use(morgan("dev"));
app.use(bodyParser.json());

// Database
require("./db/init.mongodb");

// Routers
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// // Catch errors 404 and forward them to error handle
// app.use((req, res, next) => {
//   const err = new Error("Not found");
//   err.status = 404;
//   next(err);
// });

// // Error handle function
// app.use(() => {
//   const error =
//     app.get("env") === "development" ? { message: err.message } : {};
//   const status = error.status || 500;

//   // Response to client
//   return res.status(status).json({
//     error: {
//       message: error.message,
//     },
//   });
// });

app.use("/account-server", accountServerRouter);

app.listen(port, () => {
  console.log(`app listening on port localhost:${port}`);
});
