var express = require("express");
var env = require("dotenv").config();
var ejs = require("ejs");
var path = require("path");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var session = require("express-session");
var MongoStore = require("connect-mongo")(session);

mongoose.connect(
  "mongodb+srv://rfid-project:rfid-project@rfid-project.4f7zj.mongodb.net/test",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (!err) {
      console.log("MongoDB Connection Succeeded.");
    } else {
      console.log("Error in DB connection : " + err);
    }
  }
);

var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {});

app.use(
  session({
    secret: "work hard",
    resave: true,
    saveUninitialized: false,
    store: new MongoStore({
      mongooseConnection: db,
    }),
  })
);

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(__dirname + "/views"));

var index = require("./routes/index");
app.use("/", index);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error("File Not Found");
  err.status = 404;
  next(err);
});

// error handler
// define as the last app.use callback
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.send(err.message);
});

const PORT = process.env.PORT || 3080;

var server = require("http")
  .createServer(app)
  .listen(PORT, function () {
    console.log("Server is started on http://127.0.0.1:" + PORT);
  });
const io = require("socket.io")(server);

io.on("connection", (socket) => {
  var python_process;
  socket.on("driver", (msg) => {
    let options = {
      pythonPath:
        "C:\\Users\\souso\\AppData\\Local\\Programs\\Python\\Python310\\python",
    };

    let { PythonShell } = require("python-shell");
    python_process = PythonShell.run(
      "driver.py",
      options,
      function (err, results) {
        if (err) throw err;
      }
    );
  });
  socket.on("disconnect", function () {
    python_process.kill("SIGINT");
  });
});
