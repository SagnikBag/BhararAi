import {initializeSocketConnection} from "../service/chat.socket.js";
import {sendMessage,getChats,getMessages,deleteChat} from "../service/chat.api.js";
import {useDispatch} from "react-redux";
import {setChats,setCurrentChatId,setError,setLoading,createNewChat,addNewMessage,addMessages } from "../chat.slice.js";

export const useChat = () =>{
    const dispatch = useDispatch();

    async function handleSendMessage({message,chatId}){
        try {
            dispatch(setLoading(true));
            const data = await sendMessage({message,chatId})
            
            if(!data) {
                dispatch(setError("Failed to send message: No response from server"));
                dispatch(setLoading(false));
                return;
            }
            
            const {chat,aiMessage} = data;
            
            if(!chat) {
                dispatch(setError("Failed to send message: Invalid server response"));
                dispatch(setLoading(false));
                return;
            }
            
            if(!chatId)
            dispatch(createNewChat({
                chatId:chat._id,
                title:chat.title
            }))
           dispatch(addNewMessage({
            chatId: chatId ||chat._id,
            content:message,
            role:"user"
         }))

           if(aiMessage) {
               dispatch(addNewMessage({
                chatId: chatId || chat._id,
                content:aiMessage.content,
                role:"assistant"
            })) 
           }
            
            dispatch(setCurrentChatId(chat._id))
            dispatch(setLoading(false));
        } catch (error) {
            dispatch(setError(error.message || "Failed to send message"));
            dispatch(setLoading(false));
        }
    }

    async function handleGetChats(){
        dispatch(setLoading(true));
        const data = await getChats();
        const {chats} = data;
        dispatch(setChats(chats.reduce((acc,chat)=>{
            acc[chat._id] = {
                id:chat._id,
                title:chat.title,
                messages:[],
                lastUpdated:chat.updatedAt

            }
            return acc;
        }, {})))
    }
    async function handleOpenChat(chatId,chats){

        if(chats[chatId]?.messages.length===0){
        const data = await getMessages(chatId)
        const {messages} = data;

        const formattedMessages = messages.map(msg =>({
            content:msg.content,
            role:msg.role
        }))
        dispatch(addMessages({
            chatId,
            messages:formattedMessages
        }))
    }
        dispatch(setCurrentChatId(chatId))
    }

   

    return {
        initializeSocketConnection,
        handleSendMessage,
        handleGetChats,
       handleOpenChat
    }
}