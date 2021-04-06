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
} 
module.exports = new SponsorRepository(Sponsor);