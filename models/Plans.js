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
        message: [{
            type: String
        }],
        
        duration: {
            type: String,
            required: [ true, 'Duração do plano é obrigatório.']
        },
        dayUseMonth: {
            type: Number,
        },
    },
    {
        timestamps: true
    }
);
module.exports = model('Plans', plansSchema);