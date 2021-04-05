const { Schema, model } = require('mongoose');
const Horse = require('../models/Horse');
const Plans = require('../models/Plans');
const Padrinho = require('../models/Padrinho');


const refPlanHorseSchema = new Schema(
    {
        
        horse_id: {
            type: Schema.Types.ObjectId, ref: 'Horse'
          },
          plans_id: {
            type: Schema.Types.ObjectId, ref: 'Plans'
          },
          padrinho_id: {
            type: Schema.Types.ObjectId, ref: 'Padrinho'
          }
        
    },
    {
        timestamps: true
    }
);
module.exports = model('RefPlanHorse', refPlanHorseSchema);