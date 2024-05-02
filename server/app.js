const express = require("express");
const app = express();
const connectDB = require("./db/connect");
const errorHandler = require("./middleware/error-handler");
const notFound = require("./middleware/not-found");
const cors = require("cors");
const bodyParser = require("body-parser");
const auth = require("./routes/auth");
const tradesmanRoute = require("./routes/TradesMan");
const chatRoute = require("./routes/Chat");
const messageRoute = require("./routes/Message");
const profileRoute = require("./routes/profileRoute");
const bookingRoute = require("./routes/bookings");
const paymentRoute = require("./routes/Payments");
const stripeRoute = require("./routes/stripeWebhook");
const reviewRoute = require("./routes/reviews");
const http = require("http");
// const server = http.createServer(app);
const Message = require("./models/Message");
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
app.get("/api/v1/messages", async (req, res) => {
  try {
    const messages = await Message.find();
    res.status(200).json(messages);
    console.log(messages, "messages");
  } catch (error) {
    console.log(error, "error fetching messages");
  }
});

app.use("/api/v1/auth", auth);
app.use("/api/v1/tradesman", tradesmanRoute);
app.use("/api/v1/chat", chatRoute);
app.use("/api/v1/payment", stripeRoute);
app.use("/api/v1/message", messageRoute);
app.use("/api/v1/profile", profileRoute);
app.use("/api/v1/booking", bookingRoute);
app.use("/api/v1/payment", paymentRoute);
app.use("/api/v1/review", reviewRoute);
app.use(errorHandler);
app.use(notFound);

app.use(express.static(path.resolve(__dirname, "../client/build")));

// Serve React app for all other routes
//  app.get('*', (req, res) => {
//    res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
//  });

// socket.io --------configuration
const server = app.listen(
  port,
  console.log(`Server running on PORT ${port}...`)
);

const io = require("socket.io")(server, {
  pingTimeout: 60000,
  cors: {
    origin: "http://localhost:3000",
    // credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("Connected to socket.io");
  socket.on("setup", (userData) => {
    socket.join(userData?._id);
    console.log(userData?._id, "connected user id");
    socket.emit("connected");
  });

  socket.on("join chat", (room) => {
    socket.join(room);
    console.log("User Joined Room: " + room);
  });
  socket.on("typing", (room) => socket.in(room).emit("typing"));
  socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

  socket.on("new message", (newMessageRecieved) => {
    var chat = newMessageRecieved.chat;

    if (!chat.users) return console.log("chat.users not defined");

    chat.users.forEach((user) => {
      console.log(user._id, "user._id");
      if (user._id == newMessageRecieved.sender._id) return;

      socket.in(user._id).emit("message recieved", newMessageRecieved);
    });
  });

  socket.off("setup", () => {
    console.log("USER DISCONNECTED");
    socket.leave(userData._id);
  });
});
