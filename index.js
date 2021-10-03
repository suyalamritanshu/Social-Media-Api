const express = require("express");
const app = express();
const dotenv = require("dotenv");
const DbConnect = require('./database');
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");
const PORT = process.env.PORT || 5000;
const multer = require("multer");
const conversationRoute = require("./routes/conversations");
const messageRoute = require("./routes/messages");
const router = express.Router();
const path = require("path");


dotenv.config();

//Database Connection

DbConnect();

app.use("/images", express.static(path.join(__dirname, "public/images")));




//middleware
app.use(cookieParser());
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "public/images");
    },
    filename: (req, file, cb) => {
      cb(null, req.body.name);
    },
  });
  
  const upload = multer({ storage: storage });
  app.post("/api/upload", upload.single("file"), (req, res) => {
    try {
      return res.status(200).json("File uploded successfully");
    } catch (error) {
      console.log(error);
    }
  });


app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute);
app.use("/api/conversations", conversationRoute);
app.use("/api/messages", messageRoute);

app.listen(PORT, () =>{
    console.log(`Listening on port ${PORT}`);
});