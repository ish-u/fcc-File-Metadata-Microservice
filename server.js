var express = require("express");
var cors = require("cors");
var multer = require("multer");
var upload = multer({ dest: "uploads/" });
require("dotenv").config();

var app = express();

app.use(cors());
app.use("/public", express.static(process.cwd() + "/public"));

app.get("/", function (req, res) {
  res.sendFile(process.cwd() + "/views/index.html");
});

// file analyse route
app.post("/api/fileanalyse", upload.single("upfile"), (req, res) => {
  const file = req.file;
  const file_meta_data = {
    name: file.originalname,
    type: file.mimetype,
    size: file.size,
  };
  res.send(file_meta_data);
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log("Your app is listening on port " + port);
});
