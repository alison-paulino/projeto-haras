const { Schema, model } = require('mongoose');


const plansSchema = new Schema(
    {
        name: {
            type: String,
            time: true,
            required: [true, 'Nome é obrigatório.'],
        },
        price: {
            type: String,
            required: [true, 'Valor do plano é obrigatório'],
        },
        message: {
            type: [String]
        },
        duration: {
            type: Date,
            required: [ true, 'Duração do plano é obrigatório.']
        },
        dayUseMonth: {
            type: Number,
            required: [ true, 'quantidade de dias é obrigatório.']
        },
    },
    {
        timestamps: true
    }
);
module.exports = model('Plans', plansSchema);