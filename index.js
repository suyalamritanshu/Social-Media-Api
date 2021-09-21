const express = require("express");
const app = express();
const dotenv = require("dotenv");
const DbConnect = require('./database');
const helmet = require("helmet");
const morgan = require("morgan");
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");
const PORT = process.env.PORT || 5000;


dotenv.config();

//Database Connection

DbConnect();




//middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));


app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute);


app.listen(PORT, () =>{
    console.log(`Listening on port ${PORT}`);
});