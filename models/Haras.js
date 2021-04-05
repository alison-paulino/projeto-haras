const { Schema, model } = require('mongoose');
const Horse = require('../models/Horse');
const Plans = require('../models/Plans');


const harasSchema = new Schema(
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
        email: {
            type: String,
            required: [true, 'Email é obrigatório.'],
            match: [/^\S+@\S+\.\S+$/, 'Por favor, use um email válido.'],
            unique: true,
            lowercase: true,
            trim: true
        },
        localization: {
            type: String,
            required: [ true, 'Localização é obrigatório.']
        },
        horse_id: {
            type: Schema.Types.ObjectId, ref: 'Horse'
          },
          plans_id: {
            type: Schema.Types.ObjectId, ref: 'Plans'
          },
        
    },
    {
        timestamps: true
    }
);
module.exports = model('Haras', harasSchema);