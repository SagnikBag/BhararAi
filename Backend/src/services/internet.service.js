import { tavily as Tavily} from "@tavily/core";

const tavily = Tavily({
    apikey: process.env.TAVILY_API_KEY
})

export const searchInternet = async ({query})=>{
    const results =  await tavily.search(query,{
        maxResults:5,
        // searchDepth: "advanced",
    })
    Console.log("Search results:", results);                
    return JSON.stringify(results);
}