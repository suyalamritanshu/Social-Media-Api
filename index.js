const express = require("express");
const app = express();
const dotenv = require("dotenv");
const DbConnect = require('./database');
const helmet = require("helmet");
const morgan = require("morgan");
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");


dotenv.config();

//Database Connection

DbConnect();
// mongoose.connect(
//     process.env.MONGODB_URL,
//     { useNewUrlParser: true, useUnifiedTopology: true },
//     () => {
//       console.log("DB Connected...");
//     }
//   );




//middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));


app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute);


app.listen(8800, () =>{
    console.log("Listening on port 8800")
})