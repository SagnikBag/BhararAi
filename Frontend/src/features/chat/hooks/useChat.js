import {initializeSocketConnection} from "../service/chat.socket.js";
import {sendMessage,getChats,getMessages,deleteChat} from "../service/chat.api.js";
import {useDispatch} from "react-redux";
import {setChats,setCurrentChatId,setError,setLoading,createNewChat,addNewMessage} from "../chat.slice.js";

export const useChat = () =>{
    const dispatch = useDispatch();

    async function handleSendMessages({message,chatId}){
        dispatch(setLoading(true));
        const data = await sendMessage({message,chatId})
        const {chat,aiMessage} = data;
        dispatch(createNewChat({
            chatId:chat._id,
            title:chat.title
        }))
        dispatch(setChats((prev)=>{
            return {...prev,
                [chat._id]:{
                    ...chat,
                    messages:[{content:message,role:"user"},aiMessage]
                }
            }
        }))
     dispatch(addNewMessage({
        chatId:chat._id,
        content:message,
        role:"user"
     }))

    dispatch(addNewMessage({
        chatId:chat,_id,
        content:aiMessage.content,
        role:"assistant"
    })) 
        dispatch(setCurrentChatId(chat._id))
           
    }
    return {
        initializeSocketConnection,
        handleSendMessages,
    }
}