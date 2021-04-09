const plan = require('../models/Plans');

class PlansRepository {
    constructor( PlansModel ){
        this.plan = PlansModel;
    }

    createPlan = async (plan) => {
        
        try {
            const { name, price, message, duration, dayUseMonth } = plan
            const findPlan = await this.plan.findOne({name})
            if(findPlan){
                throw new Error();
            } else {
                const newPlan = await this.plan.create({ name, price, message, duration, dayUseMonth })
                return ({
                    name: newPlan.name,
                    price: newPlan.price,
                    duration: newPlan.duration,
                    plan_id: newPlan._id
                })    
            }
       
        } catch (error) {
            throw new Error(error);
        }
    
    }

    getPlan = async (id) => {
        try {
            const planBD = await this.plan.findById(id)
            return planBD
        } catch (error) {
            throw new Error(error);            
        }
    }

    editPlan = async (id, plan) => {
        try {
            const { name, price, duration } = plan;
            const editedPlan = await this.plan.findByIdAndUpdate (id, { name, price, duration }, {new : true});
            return ({
                name: editedPlan.name,
                price: editedPlan.price,
                duration: editedPlan.duration,
                })
        } catch (error) {
            throw new Error(error);
            
        }
     }
}

module.exports = new PlansRepository(plan)