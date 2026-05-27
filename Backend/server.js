import  'dotenv/config';
import app from './src/app.js';
import http from 'http';
import connectDB from './src/config/database.js';
import { testAi } from './src/services/ai.service.js';
import { initSocket } from './src/sockets/server.socket.js';
const PORT = process.env.PORT ||3000;

testAi();

const httpServer = http.createServer(app);

initSocket(httpServer);

connectDB()
.catch((err)=>{
    console.log("MongoDb connection failed:", err);
    
})

httpServer.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`);
    
})