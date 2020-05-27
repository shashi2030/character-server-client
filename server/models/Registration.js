var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var registerSchema = new Schema({
    username:{type: String,
        required: true,
        unique: true,
        },
    name:String,
    password:String
});

var Register = mongoose.model('Register', registerSchema);
module.exports = Register;