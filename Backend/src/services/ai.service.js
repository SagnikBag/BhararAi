import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import {HumanMessage} from "Langchain";

const model = new ChatGoogleGenerativeAI({
  model: "gemini-2.5-flash-lite",
  apiKey: process.env.GEMINI_API_KEY,
});

export async function genarateResponse(){
   const response = await model.invoke([
    new HumanMessage(message)
   ])

   return response.text;
}