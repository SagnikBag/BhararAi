import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { HumanMessage } from "langchain";

const model = new ChatGoogleGenerativeAI({
  model: "gemini-2.5-flash-lite",
  apiKey: process.env.GEMINI_API_KEY,
});

export async function generateResponse(message){
     console.log("MESSAGE:", message);

   const response = await model.invoke([
    new HumanMessage({ content: message })
   ])

   
   return response.text;
}

