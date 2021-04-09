const Haras = require ('../models/Haras');

class HarasRepository {
    constructor( HarasModel ) {
        this.haras = HarasModel;
    }

    createHaras = async (haras) => {
        const { name, phone, email, localization } = haras
        
        try {
            const haras = await this.haras.create({name, phone, email, localization})
            return ({
                name: haras.name,
                phone: haras.phone,
                email: haras.email,
                localization: haras.localization,
                haras_id: haras._id
            })    
            
        } catch (error) {
            throw new Error(error);
        }
    
    }


    getHaras = async (id) => {
        try {
            const harasBD = await this.haras.findById(id);
            return harasBD;
        } catch (error) {
            throw new Error();            
        }
    }



    editHaras = async ( id, haras ) => {
        try {
            console.log(haras)
            const { name, phone, email, localization } = haras
            const editedHaras = await this.haras.findByIdAndUpdate(id, {name, phone, email, localization}, {new : true})
            return ({
                name: editedHaras.name,
                phone: editedHaras.phone,
                email: editedHaras.email,
                localization: editedHaras.localization,
            })

        } catch (error) {
            throw new Error();
            
        }
    }




}

module.exports = new HarasRepository(Haras)