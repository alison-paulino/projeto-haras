const { Schema, model } = require('mongoose');

const padrinhoSchema = new Schema(
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
        wage: {
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
        }
        
    },
    {
        timestamps: true
    }
);
module.exports = model('Padrinho', padrinhoSchema);