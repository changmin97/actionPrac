require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT;
const cors = require("cors");
const connect = require("./database/database.js");
const morgan = require("morgan");
const helmet = require("helmet");
const passport = require("passport");
const session = require("express-session");
const passportConfig = require("./passport");
const cookieParser = require("cookie-parser");
// 초기 세팅
const http = require('http');
const { Server } = require('socket.io');
const server = http.createServer(app);
// DB
const chatRoom = require("./schemas/chatRoom");
connect();

//라우터
const recruitPostsRouter = require("./routes/recruitPosts");
const recruitCommentsRouter = require("./routes/recruitComments");
const chatRoomsRouter = require("./routes/chatRooms");
const usersRouter = require("./routes/users");
passportConfig();
//미들웨어
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("tiny"));
app.use(cookieParser());

app.use(
    session({
        resave: false,
        saveUninitialized: false,
        secret: "nodebirdsecret",
        cookie: {
            httpOnly: true,
            secure: false,
        },
    })
);
app.use(passport.initialize());
app.use(passport.session());

app.use(
    "/api",
    express.urlencoded({ extended: false }),
    [recruitPostsRouter],
    [recruitCommentsRouter],
    [chatRoomsRouter]
);

app.use("/api/users", express.urlencoded({ extended: false }), [usersRouter]);

app.get("/", (req, res) => {
    res.send("깃헙액션되라!");
});

// 없는 url로 요청한 경우
app.use((req, res, next) => {
    res.status(404).send("존재하지 않는 url주소 입니다.");
});
// 서버 에러 핸들링
app.use((error, req, res, next) => {
    console.error(error);
    res.status(500).send("서버에 에러가 발생하였습니다.");
});

const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ["GET", "POST"],
    }
});

// 소켓 연결
io.on("connection", (socket) => {
    console.log(`User Connected: ${socket.id}`);

    socket.on("join_room", (data) => {
        // data에는 클라이언트에서 전송한 매개변수가 들어옴(이러한 매개변수에는 제한x)
        socket.join(data); // 해당 채팅방 입장
        console.log(`User with ID: ${socket.id} joined room: ${data}`);
      });

      // send_message 이벤트 수신(접속한 클라이언트의 정보가 수신되면)
    socket.on("send_message", (data) => {
        // db
      // 룸으로 receive_message 이벤트 송신(방에 접속한 클라이언트에게 메시지 전송)
      io.to(data.roomId).emit("receive_message", data); 
      console.log('data: ', data);
      console.log('data.room: ', data.room);
    });

    
    socket.on("disconnect", () => {
        console.log("User Disconnected", socket.id);
      });
});

server.listen(PORT, () => {
    console.log(`${PORT}번 포트로 서버가 열렸습니다.`);
});