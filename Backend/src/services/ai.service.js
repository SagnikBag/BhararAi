import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import {ChatMistralAI} from "@langchain/mistralai";
import { HumanMessage,SystemMessage } from "langchain";

const geminiModel = new ChatGoogleGenerativeAI({
  model: "gemini-2.5-flash-lite",
  apiKey: process.env.GEMINI_API_KEY,
});

const mistralModel = new ChatMistralAI({
  model:"mistral-small-latest",
  apiKey:process.env.MISTRAL_API_KEY

}) 

export async function generateResponse(message){
     console.log("MESSAGE:", message);

   const response = await geminiModel.invoke([
    new HumanMessage( message )
   ])

   
   return response.text;
}

export async function generateChatTitle(message){
  console.log("MESSAGE:", message);

  const response = await mistralModel.invoke([
    new SystemMessage(`You are a helpful assistant that generates a concise title for a conversation based on the following message.
      
      User  will provide a message, and you will generate a title that captures the essence of the conversation in a few words.
       The title should be clear, relevant, and engaging.`),

       new HumanMessage(`
        Generate a concise title for the following message: "${message}"`)
  ])

  return response.text;
}
