import { useState, useEffect } from 'react';
import TODO from './components/TODO'
import Form from './components/Form'
import Card from './components/Card'

var token = localStorage.getItem('token');

function Todos() {
  let [todos , setTodos] = useState([]);

  const get_data = async function(){
    if(token === null){
      return;
    }
    let res = await fetch('http://localhost:3000/todos', {
      method : 'GET',
      headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
      },
    });
    res = await res.json();
    setTodos(res);
  }

  const toggleDone = async (todoId) => {
    await fetch('http://localhost:3000/done', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token,
        'id': todoId
      }
    });
    get_data();
  };

  const deleteTodo = async (todoId) => {
    await fetch('http://localhost:3000/delete', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token,
        'id': todoId
      }
    });
    get_data();
  };

  useEffect(() => {
    get_data();
    // const intervalId = setInterval(get_data, 1000);
    // return () => clearInterval(intervalId);
  }, []);

  return (
    <>
    <div id='outer_app'>
      <Navbar></Navbar>
      <Card>
        <Form token={token} get_data={get_data}></Form>
      </Card>
      {todos.map(function(todo){
        return <Card  key={todo.id}>
          <TODO todo={todo}
              onToggle = {() => toggleDone(todo.id)}
              onDelete = {() => deleteTodo(todo.id)}></TODO>
        </Card>
      })}
    </div>
    </>
  )
}

function Navbar(){
  return (
    <nav className='navbar'>
      <h1>TODO APP</h1>
      <a href="\">Log out</a>
    </nav>
  )
}

export default Todos