import { tavily as Tavily} from "@tavily/core";

const tavily = Tavily({
    apikey: process.env.TAVILY_API_KEY
})

export const searchInternet = async (query)=>{
    return await tavily.search(query,{
        maxResults:5,
        searchDepth: "advanced",
    })
}