var Users = require('../models/Users');

class UserService {
    findUser(query) {
        return Users.findOne(query,
            (err, result) => {

                if (err) {
                    return Promise.reject('error occured');
                }

                return Promise.resolve(result);

            });
    };
    registerUser(query) {
        return Users.create(query, (err, result) => {
            if (err) {
                return Promise.reject('user already exists');
            } 
            return Promise.resolve(result);
        })
    }
}




module.exports = UserService;

