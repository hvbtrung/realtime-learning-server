require("express-async-errors");
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const session = require("express-session");
const passport = require("passport");
const path = require("path");

const passportSetup = require("./src/api/utils/passport");
const requestInfo = require("./src/api/middleware/requestInfo");
const errorHandler = require("./src/api/middleware/errorMiddleware");
const userRoute = require("./src/api/routes/userRoute");
const groupDetailRoute = require("./src/api/routes/groupDetailRoute");
const groupRoute = require("./src/api/routes/groupRoute");
const presentationRoute = require("./src/api/routes/presentationRoute");
const slideRoute = require("./src/api/routes/slideRoute");
const messageRoute = require("./src/api/routes/messageRoute");
const questionRoute = require("./src/api/routes/questionRoute");
const questionVoteRoute = require("./src/api/routes/questionVoteRoute");
const app = express();

const corsOptions = {
  origin: [
    "http://localhost:3000",
    "https://accounts.google.com",
    `${process.env.CLIENT_URL}`,
  ],
  credentials: true,
};

// middleware
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false },
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(requestInfo);

// Routes Middleware
app.use("/api/users", userRoute);
app.use("/api/group", groupDetailRoute);
app.use("/api/groups", groupRoute);
app.use("/api/presentations", presentationRoute);
app.use("/api/slides", slideRoute);
app.use("/api/messages", messageRoute);
app.use("/api/questions", questionRoute);
app.use("/api/vote", questionVoteRoute);

// Routes
app.get("/", (req, res) => {
  res.send("Home Page");
});

// Error Middleware
app.use(errorHandler);

module.exports = app;
