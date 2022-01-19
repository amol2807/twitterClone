const express = require("express");
const middleware = require("./middleware");
const app = express();
const port = 3003;
const loginRoute = require("./routes/loginRoutes");
const registerRoute = require("./routes/registerRoutes");
const path = require("path");

const server = app.listen(port, () =>
  console.log("Server listening on port " + port)
);

app.set("view engine", "pug");
app.set("views", "views");

app.use(express.static(path.join(__dirname, "public")));

// Routes
app.use("/login", loginRoute);
app.use("/register", registerRoute);

app.get("/", middleware.requireLogin, (req, res, next) => {
  var payload = {
    pageTitle: "BatchJob",
  };

  res.status(200).render("home", payload);
});
