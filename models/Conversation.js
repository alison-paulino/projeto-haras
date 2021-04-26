const { Schema, model } = require('mongoose');
const Message = require('../models/Message');
const Sponsor = require('../models/Sponsor');


const conversationSchema = new Schema(
    {
        message_id:[{
           type: Schema.Types.ObjectId, ref: "Message"
        }],
         sponsor_id: {
            type: Schema.Types.ObjectId, ref: 'Sponsor'
          }
    },
          {
              timestamps: true
          }
    );
module.exports = model('Conversation', conversationSchema);