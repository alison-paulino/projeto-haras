const { Schema, model } = require('mongoose');
const Haras = require('../models/Haras');
const Message = require('../models/Message')


const administratorSchema = new Schema(
    {
        name: {
            type: String,
            time: true,
            required: [true, 'Nome é obrigatório.'],
        
        },
        phone: {
            type: String,
            required: [true, 'Telefone é obrigatório'],
        },
        age: {
            type: Number,
            required: [true, 'Idade é obrigatório']
        },
        email: {
            type: String,
            required: [true, 'Email é obrigatório.'],
            match: [/^\S+@\S+\.\S+$/, 'Por favor, use um email válido.'],
            unique: true,
            lowercase: true,
            trim: true
        },
        passwordHash: {
            type: String,
            required: [ true, 'Password é obrigatório.']
        },
        imageUrl: {
            type: String,
        },
        haras_id: {
            type: Schema.Types.ObjectId, ref: 'Haras'
          },
        message_id:[{
            type: Schema.Types.ObjectId, ref: 'Message'
        }]
    },
    {
        timestamps: true
    }
);
module.exports = model('Administrator', administratorSchema);