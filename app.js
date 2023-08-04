import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import multer from "multer";

import adminRoutes from "./route/admin.js";
import apartmentRoutes from "./route/apartment.js";

// express app initialization
const app = express();

// enironment
const PORT = process.env.PORT || 5000;
const DB =
  process.env.DB ||
  "mongodb+srv://testDatabase:test@cluster0.xyfq66h.mongodb.net/?retryWrites=true&w=majority";

// middlewares
app.use(cors());
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('Images'));
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, './Images/');
    },
    filename: function(req, file, cb) {
      cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname)
    }
  })
  const upload = multer({storage: storage});

app.post("/imageUpload", upload.array("image", 12), (req, res, next) => {
    console.log(req.files)

    const imglinks = []
    for (let i = 0; i < req.files.length; i++) {
      imglinks.push(`http://localhost:5000/${req.files[i].path.slice(7, req.files[i].path.length)}`)
      // `http://localhost:5000/${item.path.slice(7, item.path.length)}`
    }
  return res.json({
    status: "success",
    message: imglinks,
  });
});

app.use("/admin", adminRoutes);
app.use("/apartment", apartmentRoutes);

// connect database
mongoose
  .connect(DB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => {
    console.log("connected" + result);
    app.listen(PORT, () => {
      console.log(`Example app listening on port ${PORT}!`);
    });
  })
  .catch((err) => console.log(err));
