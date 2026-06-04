import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import {ChatMistralAI} from "@langchain/mistralai";
import { HumanMessage,SystemMessage,AIMessage,tool,createAgent } from "langchain";
import * as z from "zod";
import  {searchInternet} from "./internet.service.js"

const geminiModel = new ChatGoogleGenerativeAI({
  model: "gemini-2.5-flash-lite",
  apiKey: process.env.GEMINI_API_KEY,
    maxRetries: 1
});
const mistralModel = new ChatMistralAI({
  model:"mistral-small-latest",
  apiKey:process.env.MISTRAL_API_KEY

}) 
const searchInernetTool = tool(
  searchInternet,{
    name:"searchInternet",
    description:"Use this tool to get hte latest informantion from the intrnet",
    schema:z.object({
      query:z.string().describe("The search query to get the latest information from the internet")
    })
  }
)
const agent = createAgent({
  model:geminiModel,
  tools:[searchInernetTool]
})
export async function generateResponse(messages){
  
console.log(messages)

   const response = await agent.invoke({
    messages:[
    new SystemMessage(`You are a helpful assistant that provides accurate and concise answers to user queries.
       You can use the searchInternet tool to get the latest information from the internet if needed.
       If you don't know the answer, say you don't know. Always try to provide a helpful response based on the information you have and the tools available to you.
       If the question requires up-to-date information, use the searchInternet tool to fetch the latest data before responding.`),
    
    ...(messages.map(msg=>{ 
    if(msg.role == "user"){
       return new HumanMessage(msg.content)
    }
    else if(msg.role == "ai"){
      return new AIMessage(msg.content)
    }
     
   }))]
   });
  return response.content || response.messages[response.messages.length - 1].text;
}
export async function generateChatTitle(message){


  const response = await mistralModel.invoke([
    new SystemMessage(`You are a helpful assistant that generates a concise title for a conversation based on the following message.
      
      User  will provide a message, and you will generate a title that captures the essence of the conversation in a few words.
       The title should be clear, relevant, and engaging.`),

       new HumanMessage(`
        Generate a concise title for the following message: "${message}"`)
  ])

  return response.text;
}
