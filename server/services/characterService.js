var Character = require('../models/Character');

class CharacterService {
    findCharacters() {
        return Character.find({},
            (err, result) => {

                if (err) {
                    return Promise.reject('error occured');
                }
                return Promise.resolve(result);

            });
    };
    filteredCharacter(query) {
        return Users.create(query, (err, result) => {
            if (err) {
                return Promise.reject('user already exists');
            } 
            return Promise.resolve(result);
        })
    }
}




module.exports = CharacterService;

