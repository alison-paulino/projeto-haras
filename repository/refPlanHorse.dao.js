const RefPlanHorse = require('../models/RefPlanHorse');
const Sponsor = require('../models/Sponsor');
const Horse = require('../models/Horse');

class RefPlanHorseRepositoty {
    constructor(refPlanHorseModel){
           this.refPlanHorse = refPlanHorseModel; 
    }

    apadrinhar = async (ids)=>{
        try {
            const { horse_id, plans_id, sponsor_id} = ids
            const refPlanHorse = await this.refPlanHorse.create(
                {horse_id, plans_id, sponsor_id })
            const refPlanHorse_id = refPlanHorse._id; 
            const SponsorInsertId = await Sponsor.findByIdAndUpdate(
                sponsor_id,{$push:{refPlanHorse_id}}, { new : true})
            const HorseInsertId = await Horse.findByIdAndUpdate(
                horse_id,{$push:{refPlanHorse_id}}, {new : true})
            return (refPlanHorse)
        } catch (error) {
            throw new Error();
        }
    }
    findHorseToSponsor = async (id)=>{
        try {
            const sponsor = await Sponsor.findById(id).populate({
                path: "refPlanHorse_id",
                populate : {path :"horse_id", model :"Horse" }
                })
            
            return(sponsor)
        } catch (error) {
         throw new Error();   
        }
    }
}
module.exports = new RefPlanHorseRepositoty(RefPlanHorse);