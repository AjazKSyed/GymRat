var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var aws = require("aws-sdk");
var multer = require("multer");
var multerS3 = require("multer-s3");
const passport = require("./auth");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var interestsRouter = require("./routes/interests");
var userInterestsRouter = require("./routes/user_interests");
var userFriendsRouter = require("./routes/user_friends");
var messageRouter = require("./routes/messages");
var userPicsRouter = require("./routes/user_pics");
var notificationRouter = require("./routes/notifications");
var usersBannedRouter = require("./routes/banned_users");
var userActivityRouter = require("./routes/user_activity");

var podPicsRouter = require("./routes/pod_pics");
var batchGroupsRouter = require("./routes/batchGroups");
var eventsRouter = require("./routes/events");
var batchInterestsRouter = require("./routes/batchInterests");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(passport.initialize());

app.use(express.static(__dirname, { dotfiles: "allow" }));
app.use("/", indexRouter);
app.use("/v1/users", usersRouter);
app.use("/v1/interests", interestsRouter);
app.use("/v1/user_interests", userInterestsRouter);
app.use("/v1/user_friends", userFriendsRouter);
app.use("/v1/messages", messageRouter);
app.use("/v1/user_pics", userPicsRouter);
app.use("/v1/notifications", notificationRouter);
app.use("/v1/banned_users", usersBannedRouter);
app.use("/v1/user_activity", userActivityRouter);

app.use("/v1/pod_pics", podPicsRouter);
app.use("/v1/batches", batchGroupsRouter);
app.use("/v1/batchInterests", batchInterestsRouter);
app.use("/v1/events", eventsRouter);


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

module.exports = app;
