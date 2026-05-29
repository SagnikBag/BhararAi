import {generateResponse,generateChatTitle} from '../services/ai.service.js';
import ChatModel from '../models/chat.model.js';



export async function sendMessage(req,res){

    const { message } = req.body;

    const title = await generateChatTitle(message);

      console.log( title);

    const result =  await generateResponse(message);

   const chat = await ChatModel.create([
    user: req.user._id,
    title,

   ])

  

    res.json({
        aiMessage: result,
        title
    })
}