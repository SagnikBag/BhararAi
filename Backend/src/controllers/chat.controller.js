import {generateResponse,generateChatTitle} from '../services/ai.service.js';
import ChatModel from '../models/chat.model.js';
import messageModel from '../models/message.model.js';
import chatModel from '../models/chat.model.js';



export async function sendMessage(req,res){

    const { message , chat: chatId} = req.body;
    
    let title = null, chat = null;

if(!chatId){
     title = await generateChatTitle(message);
     chat  = await ChatModel.create({
    user: req.user.id,
    title
   })
}  

 const userMessage = await messageModel.create({
        chat: chatId || chat._id,
        content: message,
        role: "user"
    })

    const messages = await messageModel.find({chat: chatId || chat._id})

    const result =  await generateResponse(messages);

    const aiMessage = await messageModel.create({
     chat: chatId ||chat._id,
     content: result,
     role: "ai"
   })

    console.log(messages);
    res.status(201).json({
        title,
        chat,
        aiMessage:result
    })
}
export async function getChats(req,res){
    const user = req.user;

    const chats = await ChatModel.find({user: user.id})

    res.status(200).json({
        message: "Chats retrieved successfully",
        chats
    })
}
export async function getMessages(req,res){
    const {chatId} = req.params;

    const chat = await chatModel.findOne({
        _id: chatId,
        user: req.user.id
    })

    if(!chat){
        return res.status(404).json({
            message: "chat not found"
        })
    }
    const messages = await messageModel.find({
        chat:chatId
    })

    res.status(200).json({
        message: "Messages retrieved successfullt",
        messages
    })
}
export async function deletChat(req,res){
    const {chatId} = req.params;

    const chat = await chatModel.findOneAndDelete({
        _id: chatId,
        user: req.user.id
    })

    if(!chat){
        return res.status(404).json({
            message: "chat not found"
        })
    }
    await messageModel.deleteMany({
        chat:chatId
    })
    res.status(200).json({
        message: "Chat deleted successfully"
    })
}
