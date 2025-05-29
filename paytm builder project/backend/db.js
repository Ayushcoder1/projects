const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://newayush:newayush123@cluster0.nr101vh.mongodb.net/Paytm?retryWrites=true&w=majority');

const userSchema = new mongoose.Schema({
    username : {
        type : String,
        required : true,
        trim : true,
        lowercase : true,
        minLength : 8,
        maxLength : 30
    },
    name : {
        type : String,
        required : true,
        trim : true,
        maxLength : 20
    },
    password : {
        type : String,
        required : true,
        minLength : 6
    }
});

const accountSchema = new mongoose.Schema({
    userId : {
        type : mongoose.Types.ObjectId,
        ref : 'User',
        required : true
    },
    balance : {
        type : Number,
        required : true
    }
});

const Account = mongoose.model('Account', accountSchema);
const User = mongoose.model('User', userSchema);

module.exports = {
    User, Account
};