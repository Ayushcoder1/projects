const express = require('express');
const { authMiddleware } = require('../middleware');
const { TODO } = require('../db');

const router = express.Router();

router.post('/add', authMiddleware, async (req, res) => {
    const todo = req.body;
    const username = req.user;
    const lookup = await TODO.findOne({
      username,
      'todos.id': todo.id
    });

    
    if(lookup){
      return res.sendStatus(409);
    }

    await TODO.updateOne(
      { username : username},
      {$push: { todos: todo } },
      { upsert: true }
    );

    return res.sendStatus(200);
});

router.put('/edit', authMiddleware, async (req, res) => {
    const todo = req.body;
    const username = req.user;
    const lookup = await TODO.findOne({
      username,
      'todos.id': todo.id
    });

    
    if(!lookup){
      return res.sendStatus(409);
    }

    await TODO.updateOne(
      { username : username,
        'todos.id' : todo.id
      },
      {
        $set: {
          'todos.$.title':       todo.title,
          'todos.$.description': todo.description,
          'todos.$.Status':      todo.Status,
          'todos.$.deadline':    todo.deadline
        }
      },
    );

    return res.sendStatus(200);
});

router.delete('/delete', authMiddleware, async (req, res) => {
  const id = req.headers.id;
  const username = req.user;
  await TODO.updateOne(
    {username : username},
    {$pull : {todos : {id : id}}}
  );

  return res.sendStatus(200);
});

router.put('/done', authMiddleware, async (req, res) => {
  const id = req.headers.id;
  const username = req.user;
  await TODO.updateOne(
    {username : username, "todos.id": id},
    {$set : {"todos.$.Status" : req.headers.status === 'true' ? true : false}}
  );

  return res.sendStatus(200);
});

router.get('/todos', authMiddleware, async (req, res) => {
  const username = req.user;
  const data = await TODO.findOne({username : username});
  // console.log(data.todos);
  if(data == null) return res.json([])
  return res.json(data.todos);
});

module.exports = router;