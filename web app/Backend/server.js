var express = require("express");
var env = require("dotenv").config();
var ejs = require("ejs");
var path = require("path");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var session = require("express-session");
var MongoStore = require("connect-mongo")(session);
const faceapi = require("face-api.js");
const { Canvas, Image } = require("canvas");
const canvas = require("canvas");
const fileUpload = require("express-fileupload");
faceapi.env.monkeyPatch({ Canvas, Image });

var createError = require("http-errors");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/", indexRouter);
app.use("/users", usersRouter);

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
app.use(express.static(path.join(__dirname, "public")));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(__dirname + "/views"));

var index = require("./routes/index");
app.use("/", index);

// error handler
// define as the last app.use callback
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.send(err.message);
});

app.use(
  fileUpload({
    useTempFiles: true,
  })
);
async function LoadModels() {
  // Load the models
  // __dirname gives the root directory of the server
  await faceapi.nets.faceRecognitionNet.loadFromDisk(
    __dirname + "/models/face_models"
  );
  await faceapi.nets.faceLandmark68Net.loadFromDisk(
    __dirname + "/models/face_models"
  );
  await faceapi.nets.ssdMobilenetv1.loadFromDisk(
    __dirname + "/models/face_models"
  );
}

LoadModels();

const faceSchema = new mongoose.Schema({
  label: {
    type: String,
    required: true,
    unique: true,
  },
  descriptions: {
    type: Array,
    required: true,
  },
});

const FaceModel = mongoose.model("Face", faceSchema);

async function uploadLabeledImages(images, label) {
  try {
    let counter = 0;
    const descriptions = [];
    // Loop through the images
    for (let i = 0; i < images.length; i++) {
      const img = await canvas.loadImage(images[i]);
      counter = (i / images.length) * 100;
      console.log(`Progress = ${counter}%`);
      // Read each face and save the face descriptions in the descriptions array
      const detections = await faceapi
        .detectSingleFace(img)
        .withFaceLandmarks()
        .withFaceDescriptor();
      descriptions.push(detections.descriptor);
    }

    // Create a new face document with the given label and save it in DB
    const createFace = new FaceModel({
      label: label,
      descriptions: descriptions,
    });
    await createFace.save();
    return true;
  } catch (error) {
    console.log(error);
    return error;
  }
}

async function getDescriptorsFromDB(image) {
  // Get all the face data from mongodb and loop through each of them to read the data
  let faces = await FaceModel.find();
  for (i = 0; i < faces.length; i++) {
    // Change the face data descriptors from Objects to Float32Array type
    for (j = 0; j < faces[i].descriptions.length; j++) {
      faces[i].descriptions[j] = new Float32Array(
        Object.values(faces[i].descriptions[j])
      );
    }
    // Turn the DB face docs to
    faces[i] = new faceapi.LabeledFaceDescriptors(
      faces[i].label,
      faces[i].descriptions
    );
  }

  // Load face matcher to find the matching face
  const faceMatcher = new faceapi.FaceMatcher(faces, 0.6);

  // Read the image using canvas or other method
  const img = await canvas.loadImage(image);
  let temp = faceapi.createCanvasFromMedia(img);
  // Process the image for the model
  const displaySize = { width: img.width, height: img.height };
  faceapi.matchDimensions(temp, displaySize);

  // Find matching faces
  const detections = await faceapi
    .detectAllFaces(img)
    .withFaceLandmarks()
    .withFaceDescriptors();
  const resizedDetections = faceapi.resizeResults(detections, displaySize);
  const results = resizedDetections.map((d) =>
    faceMatcher.findBestMatch(d.descriptor)
  );
  return results;
}

var fi = [];
var label = "";

app.post("/post-label", async (req, res) => {
  if (req.body) {
    label = req.body.label;
  }
});

app.post("/post-face", async (req, res) => {
  console.log(label);
  if (req.files) {
    fi.push(req.files.file.tempFilePath);
  }
  if (fi.length === 3) {
    let result = await uploadLabeledImages(fi, label);
    if (result) {
      res.json({ message: "Face data stored successfully" });
    } else {
      res.json({ message: "Something went wrong, please try again." });
    }
  } else res.json({ message: "ok" });
});

app.post("/check-face", async (req, res) => {
  const File1 = req.files.File1.tempFilePath;
  let result = await getDescriptorsFromDB(File1);
  res.json({ result });
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
    //python_process.kill("SIGINT");
  });

  // catch 404 and forward to error handler
  app.use(function (req, res, next) {
    next(createError(404));
  });

  // error handler
  app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render("error");
  });
});
