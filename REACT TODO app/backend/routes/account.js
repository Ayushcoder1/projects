const express = require('express');
const { authMiddleware } = require('../middleware');
// const { TODO } = require('../db');
const { client } = require('../db.js');

const router = express.Router();

router.post('/add', authMiddleware, async (req, res) => {
    const todo = req.body;
    const username = req.user;
    // const lookup = await TODO.findOne({
    //   username,
    //   'todos.id': todo.id
    // });
    // await client.connect();
    const lookup = await client.query(`
      SELECT * FROM users u JOIN todo t on u.id = t.user_id
      WHERE u.email = $1 and t.id = $2;
    `, [username, todo.id])

    
    if(lookup.row_length > 0){
      return res.sendStatus(409);
    }

    // await TODO.updateOne(
    //   { username : username},
    //   {$push: { todos: todo } },
    //   { upsert: true }
    // );

    await client.query(`
      INSERT INTO todo (user_id, id, title, description, status, deadline)
      VALUES ((SELECT id FROM users WHERE email = $1), $2, $3, $4, $5, $6);
    `, [username, todo.id, todo.title, todo.description, todo.Status, todo.deadline]);

    // client.end();
    return res.sendStatus(200);
});

router.put('/edit', authMiddleware, async (req, res) => {
    const todo = req.body;
    const username = req.user;
    // const lookup = await TODO.findOne({
    //   username,
    //   'todos.id': todo.id
    // });

    // await client.connect();
    // const lookup = await client.query(`
    //   SELECT * FROM users u JOIN todo t on users.id = t.user_id
    //   WHERE u.email = $1 AND t.id = $2;
    // `, [username, todo.id])

    // if(lookup.row_length == 0){
    //   return res.sendStatus(409);
    // }

    // await TODO.updateOne(
    //   { username : username,
    //     'todos.id' : todo.id
    //   },
    //   {
    //     $set: {
    //       'todos.$.title':       todo.title,
    //       'todos.$.description': todo.description,
    //       'todos.$.Status':      todo.Status,
    //       'todos.$.deadline':    todo.deadline
    //     }
    //   },
    // );
    await client.query(`
      UPDATE todo
      SET title = $1, description = $2, status = $3, deadline = $4
      WHERE id = $5 AND user_id = (SELECT id FROM users WHERE email = $6);
    `, [todo.title, todo.description, todo.Status, todo.deadline, todo.id, username]);
    // client.end();

    return res.sendStatus(200);
});

router.delete('/delete', authMiddleware, async (req, res) => {
  const id = req.body.id;
  const username = req.user;
  // await TODO.updateOne(
  //   {username : username},
  //   {$pull : {todos : {id : id}}}
  // );
  // await client.connect();
  // console.log(id);
  await client.query(`
    DELETE FROM todo
    WHERE id = $1 AND user_id = (SELECT id FROM users WHERE email = $2);
  `, [id, username]);
  // client.end();

  return res.sendStatus(200);
});

router.put('/done', authMiddleware, async (req, res) => {
  const id = req.headers.id;
  const username = req.user;
  // await TODO.updateOne(
  //   {username : username, "todos.id": id},
  //   {$set : {"todos.$.Status" : req.headers.status === 'true' ? true : false}}
  // );
  const status = req.headers.status === 'true' ? true : false;
  // await client.connect();
  await client.query(`
    UPDATE todo
    SET status = $1 WHERE id = $2 AND user_id = (SELECT id FROM users WHERE email = $3);
  `, [status, id, username]);
  // client.end();

  return res.sendStatus(200);
});

router.get('/todos', authMiddleware, async (req, res) => {
  const username = req.user;
  // const data = await TODO.findOne({username : username});

  // await client.connect();
  const data = await client.query(`
    SELECT * FROM todo
    WHERE user_id = (SELECT id from users WHERE email = $1);
  `, [username]);

  // console.log(data);
  if(data.row_length == 0) return res.json([])
  const todos = data.rows.map(row => ({
    id: row.id,
    title: row.title,
    description: row.description,
    Status: row.status,
    deadline: row.deadline
  }));
  // console.log(todos);
  return res.json(todos);
});

module.exports = router;