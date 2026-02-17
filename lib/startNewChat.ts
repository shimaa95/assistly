import { graphqlMutation } from "@/lib/graphql-client";
import { Insert_Guests, InsertChatSession, InsertMessage } from "@/qraphql/mutations/mutations";

async function startNewChat(guestName:string,guestEmail:string,chatbotId:number): Promise<number>{

    try {

        //create new guest intery
        const guestResult= await graphqlMutation<{insertGuests: {id: number}}>(
           Insert_Guests,
           {
               created_at:new Date().toISOString(),
               email:guestEmail,
               name:guestName,
           }
        )

      
        const guestId=guestResult.insertGuests.id

        // 2. initilaize a new chat session

        const chatSessionResult= await graphqlMutation<{insertChat_sessions: {id: number}}>(
            InsertChatSession,
            {
                chatbot_id:chatbotId,
                guest_id:guestId,
                created_at:new Date().toISOString()
            }
        )

        const chatSessionId=chatSessionResult.insertChat_sessions.id;



        //insert Inital Message

        await graphqlMutation(
            InsertMessage,
            {
                chat_session_id:chatSessionId,
                content:`Welcome ${guestName} !\n How can I assist you today?`,
                created_at:new Date().toISOString(),
                sender:'ai',
            }
        )
        console.log("New chat session started with id:");
        return chatSessionId;
    } catch (error) {
        console.error("Error starting new chat session:", error);
        throw error;
    }
}
export default startNewChat;
