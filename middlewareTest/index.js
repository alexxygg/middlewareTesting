const express = require("express");
const app = express();
const morgan = require("morgan");
app.use(morgan("dev"));

//This will run on every single request, no matter the type!
//i.e app.use(express.urlencoded)
// app.use((req, res, next) => {
//   console.log("FIRST MIDDLEWARE");
//   next();
// });

// app.use((req, res, next) => {
//   console.log("SECOND MIDDLEWARE");
//   next();
// });

//This will console log the request type and
//the path the user requested. Close to what Morgan does.
// app.use((req, res, next) => {
//   //   req.method = "POST";
//   console.log(req.method, req.path);
//   req.requestTime = Data.now();
//   next();
// });

// app.use((req, res, next) => {
//   //This will show us the query key value pair in an object.
//   //   console.log(req.query);
//   const { password } = req.query;
//   if (password === "thePassword") {
//     // res.send("secret website");
//     next();
//   }
//   res.send("SORRY, WRONG PASSWORD");
// });

const passwordChecker = (req, res, next) => {
  const { password } = req.query;
  if (password === "thePassword") {
    next();
  }
  res.send("WRONG PASSWORD");
};

app.get("/", (req, res) => {
  res.send("HOME");
});

app.get("/secret", passwordChecker, (req, res) => {
  res.send("OUR SECRET WEBSITE");
});

app.use("/dogs", (req, res, next) => {
  console.log("Log for any HTTP request type to /dogs");
  next();
});

app.get("/dogs", (req, res) => {
  res.send("DOGS");
});

app.use((req, res) => {
  res.status(404).send("ERROR, NO CONTENT WAS FOUND");
});

app.listen(3000, () => {
  console.log("Port 3000 running.");
});
