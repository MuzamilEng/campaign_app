const express = require("express");
const app = express();
const connectDB = require("./db/connect");
const errorHandler = require("./middleware/error-handler");
const notFound = require("./middleware/not-found");
const cors = require("cors");
const auth = require("./routes/auth");
const profileRoute = require("./routes/profileRoute");
const path = require("path");

const port = process.env.PORT || 5000;
require("dotenv").config({ path: ".env" });

connectDB();

// Middleware
app.use(cors({ origin: "*" }));
app.use(express.json());

app.use(express.static("public"));
app.use(express.json({ limit: "50mb", extended: true }));
app.use(
  express.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 })
);

// Routes


app.use("/api/v1/auth", auth);
app.use("/api/v1/profile", profileRoute);

app.use(errorHandler);
app.use(notFound);

app.use(express.static(path.resolve(__dirname, "../client/build")));

const start = async () => {
  try {
    await connectDB(process.env.URI);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();