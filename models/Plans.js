const { Schema, model } = require('mongoose');


const plansSchema = new Schema(
    {
        name: {
            type: String,
            time: true,
            unique: true,
            required: [true, 'Nome é obrigatório.'],
        },
        description: {
            type: String,
            required: [true, 'Descrição do plano é obrigatório'],
        },
        price: {
            type: String,
            required: [true, 'Valor do plano é obrigatório'],
        },
        foto: {
            type: Number,
            required: [ true, 'Quantidade de fotos é obrigatório.']
        },
        dayUse: {
            type: Number,
             required: [ true, 'Quantidade de day use é obrigatório.']
        },
        video: {
            type: Number,
             required: [ true, 'Quantidade de videos é obrigatório.']
        },
    },
    {
        timestamps: true
    }
);
module.exports = model('Plans', plansSchema);