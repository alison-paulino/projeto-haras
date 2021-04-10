const { Schema, model } = require('mongoose');
const RefPlanHorse = require('../models/RefPlanHorse');

const sponsorSchema = new Schema(
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
        message: {
            type: [String]
        },
        dayUseMonth: {
            type: Number,
        },
        refPlanHorse_id: [
           {type: Schema.Types.ObjectId, ref: 'RefPlanHorse'}
            ] 
    },
    {
        timestamps: true
    }
);
module.exports = model('Sponsor', sponsorSchema);