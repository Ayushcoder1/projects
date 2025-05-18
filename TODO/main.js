const express = require('express');
const app = express();
const cors = require('cors');
const zod = require('zod');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const passKey = '12345678';
app.use(express.static(__dirname));
mongoose.connect('mongodb+srv://newayush:newayush123@cluster0.nr101vh.mongodb.net/TODO?retryWrites=true&w=majority');

app.use(express.json());
app.use(cors());
app.use(express.json());

const User = mongoose.model('users', {name : String, username : String, password : String});

const TodoSchema = new mongoose.Schema({
  todo_id: {
    type: String,
    required: true
  },
  todo_title: {
    type: String,
    required: true,
    trim: true
  },
  todo_description: {
    type: String,
    default: '',
    trim: true
  },
  Status : {
    type : Boolean,
    required : true,
    default : false
  }
}, { _id: false });

const TODO = mongoose.model('lists', {username : String, todos : {
  type : [TodoSchema],
  default : []
}})

function validator(req, res, next){
    const schema = zod.object({
        username : zod.string().email(),
        name : zod.string(),
        password : zod.string().min(6)
    })
    const check = schema.safeParse(req.body);
    if(!check.success){
        return res.status(403).json({msg : "Invalid Username or Password!"});
    }
    next();
}

function authMiddleware(req, res, next) {
  const auth = req.headers.authorization?.split(' ')[1];
  // console.log(auth);
  if (!auth) return res.status(401).send('No token');
  try {
    const payload = jwt.verify(auth, passKey);
    // console.log(payload);
    req.user = payload.username;  // { email, id, iat, exp }
    next();
  } catch (err) {
    res.status(401).send('Invalid token');
  }
}

app.post('/signup',validator, async function(req, res){
    const name = req.body.name;
    const username = req.body.username;
    const password = req.body.password;

    //check if user already exists
    const check = await User.findOne({username : username});
    if(check){
        return res.status(403).json({msg : "User already exists!"});
    }
    const user = new User({
        name : name,
        username : username,
        password : password
    });
    user.save();
    res.status(200).json({msg : "User created successfully!"});
});

app.post('/login', async function(req, res){
    const username = req.body.username;
    const password = req.body.password;
    const check1 = await User.findOne({username : username, password : password});
    const check2 = await User.findOne({name : username, password : password});
    if(!(check1 || check2)){
        return res.status(403).json({msg : "Wrong Username of Password!"});
    }
    var token = jwt.sign({username: username}, passKey);
    return res.status(200).json({token : token});
});

app.post('/add', authMiddleware, async (req, res) => {
    const todo = req.body;
    const username = req.user;
    
    await TODO.updateOne(
      { username : username},
      {$push: { todos: todo } },
      { upsert: true }
    );

    return res.status(200);
});

app.delete('/delete', authMiddleware, async (req, res) => {
  const todo_id = req.headers.id;
  const username = req.user;
  await TODO.updateOne(
    {username : username},
    {$pull : {todos : {todo_id : todo_id}}}
  );

  return res.status(200);
});

app.put('/done', authMiddleware, async (req, res) => {
  const todo_id = req.headers.id;
  const username = req.user;
  await TODO.updateOne(
    {username : username, "todos.todo_id": todo_id},
    {$set : {"todos.$.Status" : true}}
  );

  return res.status(200);
});

app.get('/todos', authMiddleware, async (req, res) => {
  const username = req.user;
  const data = await TODO.findOne({username : username});
  // console.log(data.todos);
  return res.json(data.todos);
});

app.get('/login', (req, res) => {
  res.redirect('loginPage.html');
})

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
