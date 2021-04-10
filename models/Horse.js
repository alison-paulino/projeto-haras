const { Schema, model } = require('mongoose');
const RefPlanHorse = require('../models/RefPlanHorse');

const HorseSchema = new Schema(
    {
        name: {
            type: String,
            time: true,
            required: [true, 'Nome é obrigatório.'],
        },
        affiliation: {
            type: String,
            required: [true, 'Afiliação é obrigatório'],
        },
        color: {
            type: String,
            required: [ true, 'Cor é obrigatório.']
        },
        age: {
            type: Number,
            required: [ true, 'Idade é obrigatório.']
        },
        behavior: {
            type: String,
            required: [ true, 'Comportamento é obrigatório.']
        },
        breed: {
            type: String,
            required: [ true, 'Raça é obrigatório.']
        },
        imageUrl: {
            type: String,
        },
        dayUse: {
            type : Date
        },
        midiasImg: [{
            type : String
        }],
        midiasVideo:[ {
            type : String
        }],
        register: {
            type: String,
            required: [true, 'Registro é obrigatório.'],
            unique: true,
        }, 
        refPlanHorse_id: [{
            type: Schema.Types.ObjectId, ref: 'RefPlanHorse'
          }]
        
    },
    {
        timestamps: true
    }
);
module.exports = model('Horse', HorseSchema);