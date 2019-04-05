const chalk = require("chalk");
const express = require("express");
const bodyParser = require("body-parser");
var cors = require("cors");
const app = express();

const port = 9000;

let value = 0;

app.use(cors());
app.options("*", cors());
app.use(bodyParser.json({ type: "application/json" }));

app.get("/value", function(req, res) {
  res.status(200).json({ value: value });
  res.end();
});

app.listen(port, () => {
  console.log(chalk.green("plant facé is listening on " + port));
});

module.exports = app;

const SerialPort = require("serialport");
const sp = new SerialPort("/dev/ttyACM1", {
  baudRate: 9600
});

// Open errors will be emitted as an error event
sp.on("error", function(err) {
  console.log("Error: ", err.message);
});

sp.on("data", function(data) {
  data = data.toString("utf8");
  data = data.split("\n")[0];
  value = parseInt(data);
  if(data > 750) {
    console.log(chalk.red("PANIC"));
  }
  else if(data > 400) {
      console.log(chalk.cyan("OK"));
  }
  else {
    console.log(chalk.green("Happy"));
  }
});
