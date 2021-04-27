const message = require('../models/Message');
const sponsor = require('../models/Sponsor');
const conversation = require('../models/Conversation')

class MessageRepository {
    constructor(MessageModel){
        this.message = MessageModel;
    }
    getMessage = async (id) => {
            try {
                const conversationDB = await conversation.findOne({sponsor_id:id}).populate('message_id')
                return conversationDB
            } catch (error) {
                throw new Error()
            }
    } 
    sendMessage = async ( payload ) => {
        try {
                const {bodyMessage, read, author,sponsor_id} = payload
                const newMessage = await this.message.create({bodyMessage, read, author})
                const updatededConversation = await conversation.findOne({sponsor_id})
                if(updatededConversation){
                     const addMessage = await conversation.findByIdAndUpdate(
                    updatededConversation,{$push:{message_id:newMessage._id}})
                    return addMessage
                }else{
                const newConversation = await conversation.create({message_id:newMessage.id,sponsor_id})
                }
            return newMessage
        } catch (error) {
            console.log(error)
            throw new Error(error);
        }
        
    }
    getIdAdm = async (id)=>{
        try{
            const sponsorDB = await sponsor.findById(id).populate('message_id')
            console.log(sponsorDB)
            return sponsorDB
        }catch(error) {

        }
    }

}
 module.exports = new MessageRepository(message);