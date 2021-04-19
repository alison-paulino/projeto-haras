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
        // try {
            
        //      const { message, sponsor_id, administrator_id } = payload;
        //      const sponsorDB = await sponsor.findById(sponsor_id) 
        //      const findMessage = await this.message.findOne({$and:[{sponsor_id}, {administrator_id}])
        //      console.log(findMessage)
             
        //         if(findMessage) {
        //            const newMessage = await this.message.findByIdAndUpdate(findMessage._id,{$push:{message}},{new : true})
        //             return newMessage;    
        //         }
        //         else{
        //            const recordedMessage = await this.message.create({ message,sponsor_id, administrator_id});
        //            const recordeMessageIdSponsor= await sponsor.findByIdAndUpdate(sponsor_id,{$push:{message_id:recordedMessage._id}}).populate("message_id")
        //            //const recordeMessageIdAdm= await administrator.findByIdAndUpdate(administrator_id,{$push:{message_id:recordedMessage._id}})
        //            console.log(recordeMessageIdSponsor);
        //            return recordedMessage
        //       }   
               
             
            
        //     // const findMessage = await this.message.findById(sponsorDB.message_id) 
        //      //if(findMessage){
        // } catch (error) {
        //     throw new Error(error);
        // }
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