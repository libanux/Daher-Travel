let express = require("express");
let http = require("http");
let socketIO = require("socket.io");
let cors = require("cors");

let app = express();
let server = http.createServer(app);
let io = socketIO(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

app.use(cors());

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });

  socket.on("message", (data) => {
    console.log("Received message:", data);
    // Broadcast the received message to all clients
    io.emit("message", data);
  });
});

server.listen(5000, () => {
  console.log("Server is running on port 5000");
});
