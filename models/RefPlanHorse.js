const { Schema, model } = require('mongoose');
const Horse = require('../models/Horse');
const Plans = require('../models/Plans');
const Padrinho = require('../models/Sponsor');


const refPlanHorseSchema = new Schema(
    {
        name: {
              type: String
        },
        horse_id: {
            type: Schema.Types.ObjectId, ref: 'Horse'
          },
          plans_id: {
            type: Schema.Types.ObjectId, ref: 'Plans'
          },
          sponsor_id: {
            type: Schema.Types.ObjectId, ref: 'Sponsor'
          }
        
    },
    {
        timestamps: true
    }
);
module.exports = model('RefPlanHorse', refPlanHorseSchema);