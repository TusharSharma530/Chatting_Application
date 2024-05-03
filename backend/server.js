const express=require("express")
require("dotenv").config();
// const cors=require("cors")
const {chats} =require("./data/data");
const connectDB = require("./config/db");
const userRoutes=require("./Routes/userRoutes")
const chatRoutes=require("./Routes/chatRoutes")
const messageRoutes=require("./Routes/messageRoutes")
const path=require("path")
const {notFound,errorHandler}=require("./middleware/errorMiddleware")
connectDB();
const app=express();
// app.use(cors())
app.use(express.json()); //to accept json data
// app.get("/api/chat",(req,res)=>{
//     res.send(chats)
// })


app.use("/api/user",userRoutes)
app.use('/api/chat',chatRoutes);
app.use('/api/message',messageRoutes)

//Error handling routes
// ----------deploy
const __dirname1 = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname1, "/frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname1, "frontend", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running..");
  });
}


// ---deploy

app.use(notFound)
app.use(errorHandler)

//

const PORT=process.env.PORT||5000;


// -----socket implementation
const server = app.listen(PORT,console.log("runnninnnnnng"))

const io=require("socket.io")(server,{
    pingTimeout:60000,
    cors:{
        origin:`*`,
    },
})

io.on("connection",(socket)=>{
    console.log("connected to socket.io");

    socket.on('setup',(userData)=>{
        socket.join(userData._id);
        socket.emit('connected');
    })

    socket.on('join chat',(room)=>{
        socket.join(room);
        
    })
    socket.on('new message',(newMessageRecieved)=>{
        var chat=newMessageRecieved.chat;
        if(!chat.users) return console.log("chat users not defined")


        chat.users.forEach((user)=>{
            if(user._id==newMessageRecieved.sender._id)return;

            socket.in(user._id).emit("message recieved",newMessageRecieved)
        })
    })

    socket.off("setup",()=>{
        console.log("USEr disconnected");
        socket.leave(userData._id)
    })
})
