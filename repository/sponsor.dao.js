const Sponsor = require('../models/Sponsor');
const bcrypt = require("bcryptjs"); 

class SponsorRepository{

    constructor(SponsorModel){
        this.sponsor = SponsorModel;
    }

    register = async (sponsor) => {
        const { name, phone, age, email, password, imageUrl, message, dayUse } = sponsor;
        try {
            const sponsor = await this.sponsor.findOne({email}) 
            if(sponsor){
                throw new Error();
            }else{
                const salt = bcrypt.genSaltSync(10);
                const passwordHash = bcrypt.hashSync(password, salt);
                const newSponsor = await this.sponsor.create({name, phone, age, email, imageUrl,message, dayUse, passwordHash})
                return ({
                    name: newSponsor.name,
                    phone : newSponsor.phone,
                    age: newSponsor.age,
                    email: newSponsor.email,
                    imageUrl: newSponsor.imageUrl,
                    message: newSponsor.message,
                    dayUse: newSponsor.dayUse
                })
            }
        } catch (error) {
            throw new Error();
        }
    }
    findSponsor = async (email) =>{
        try {
            
            const sponsor = await this.sponsor.findOne({email})
            return sponsor
        } catch (error) {
             throw new Error();
        }
    }
    findSponsorById = async (id)=>{
        try {
            const sponsor = await this.sponsor.findById(id)
            return sponsor
        } catch (error) {
            throw new Error();
        }
    }
    findSponsor = async (id)=>{
        try {
            const sponsor = await this.sponsor.find()
            return sponsor
        } catch (error) {
            throw new Error();
        }
    }
    updateSponsor = async (sponsor, id)=>{
        try {
            const { name, phone, age, email, password, imageUrl, message } = sponsor;
            const sponsorDB = await this.sponsor.findById(id) 
            if(!sponsorDB){
                throw new Error();
            }else{
                const salt = bcrypt.genSaltSync(10);
                const passwordHash = bcrypt.hashSync(password, salt);
                const updatedSponsor = await this.sponsor.findByIdAndUpdate(
                    id,{name, phone, age, email, imageUrl, passwordHash, message},{new : true})
                return ({
                    name: updatedSponsor.name,
                    phone : updatedSponsor.phone,
                    age: updatedSponsor.age,
                    email: updatedSponsor.email,
                    imageUrl: updatedSponsor.imageUrl,
                })
            }
        } catch (error) {
            throw new Error();
        }
    }

} 
module.exports = new SponsorRepository(Sponsor);