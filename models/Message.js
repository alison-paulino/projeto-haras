const { Schema, model } = require('mongoose');



const messageSchema = new Schema(
    {
        author: {
             type: String, enum: ['sponsor', 'admin']
        },
        bodyMessage:{
            type: String
        },
        read:{
              type:String
          },
    },
          {
              timestamps: true
          }
    );
module.exports = model('Message', messageSchema);