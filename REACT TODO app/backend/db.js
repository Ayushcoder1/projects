const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://newayush:newayush123@cluster0.nr101vh.mongodb.net/TODO?retryWrites=true&w=majority');

const TodoSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    default: '',
    trim: true
  },
  Status : {
    type : Boolean,
    required : true,
    default : false
  },
  deadline : {
    type : Number,
    required : true
  }
}, { _id: false });


const User = mongoose.model('users', {name : String, username : String, password : String});

const TODO = mongoose.model('lists', {username : String, todos : {
  type : [TodoSchema],
  default : []
}})

module.exports = {
    User, TODO
};