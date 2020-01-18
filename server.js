let express = require("express");
var cors = require("cors");
let app = express();

app.use(cors());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST");
  next();
});

// app.get("/", function(req, res) {
//   res.send("Hi. please hit the /monthly endpoint to get the data \n");
// });

var data = {
  labels: ["January", "February", "March", "April", "May", "June"],
  datasets: [
    {
      data: [226043, 220000, 250000, 160000, 210000, 219000]
    }
  ]
};

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

function setLabels(labels) {
  var nextMonthIndex = months.indexOf(labels[labels.length - 1]) + 1;
  var nextMonthName =
    months[nextMonthIndex] != undefined ? months[nextMonthIndex] : "January";
  labels.push(nextMonthName);
  labels.shift();
}

function getRandomArbitrary(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function setData(data) {
  data.push(getRandomArbitrary(100000, 280000));
  data.shift();
}

// Keep data for 10 days second (not changing data)
// setInterval(function changeData() {
//   setData(data.datasets[0].data);
//   setLabels(data.labels);
// }, 864000);

app.get("/monthly", function(req, res, next) {
  res.setHeader("Content-Type", "application/json");

  console.log(data);
  res.send(JSON.stringify(data));
});

// use port 3000 unless there exists a preconfigured port
var port = process.env.port || 3000;

var listener = app.listen(port, function() {
  console.log("Your app is listening on port " + listener.address().port);
});
