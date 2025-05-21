import { useState, useEffect } from 'react';
import './App.css'
import Delete from './assets/delete.png'

var token = localStorage.getItem('token');

function App() {
  let [todos , setTodos] = useState([]);
  let [id, setId] = useState('');
  let [title, setTitle] = useState('');
  let [description, setDescription] = useState('');
  let [deadline, setDeadline] = useState('');

  const get_data = async function(){
    if(token === null){
      // alert('log in please');
      return;
    }
    // console.log(token);
    let res = await fetch('http://localhost:3000/todos', {
      method : 'GET',
      headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
      },
    });
    res = await res.json();
    // console.log(res);
    setTodos(res);
  }

  async function addTodo(event){
    if(token === null){
      alert('log in please');
      return;
    }
    event.preventDefault();
    let Status = false;
    deadline = new Date(deadline).getTime();
    const content = {id, title, description, Status, deadline};
    const res = await fetch('http://localhost:3000/add', {
      method : 'POST',
      headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify(content)
    });
    if(res.status != 200){
      console.log('A todo with similar ID already exits, try again.');
      return;
    }
    setId('');
    setTitle('');
    setDescription('');
    setDeadline('');
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
    const intervalId = setInterval(get_data, 1000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
    <div id='outer_app'>
      <Navbar></Navbar>
      <form onSubmit={addTodo} className='todo-form'>
        <div>
          <p>TODO ID</p>
          <input type='text' placeholder='923/231' value={id} onChange={(event) => setId(event.target.value)}/>
        </div>
        <div>
          <p>Title</p>
          <input type='text' placeholder='title' value={title} onChange={(event) => setTitle(event.target.value)}/>
        </div>
        <div>
          <p>Description</p>
          <input type='text' placeholder='description' value={description} onChange={(event) => setDescription(event.target.value)}/>
        </div>
        <div>
          <p>Deadline</p>
          <input type='date' placeholder='YYYY-MM-DD' value={deadline} onChange={(event) => setDeadline(event.target.value)}/>
        </div>
        <div id='submit'>
          <button>
            ADD TODO
          </button>
        </div>
      </form>
      {todos.map(function(todo){
        return <TODO key={todo.id} todo={todo}
              onToggle = {() => toggleDone(todo.id)}
              onDelete = {() => deleteTodo(todo.id)}></TODO>
      })}
    </div>
    </>
  )
}

function Navbar(){
  return (
    <nav className='navbar'>
      <h1>TODO APP</h1>
      <a href="\login">Log out</a>
    </nav>
  )
}

function TODO(param){
  return (<div className="items">
    <div>
      <p>Title : {param.todo.title}</p>
      <p>Description : {param.todo.description}</p>
      <p>Deadline : {new Date(param.todo.deadline).toLocaleDateString('en-CA')}</p>
    </div>
    <div className='icons'>
        <input type="checkbox" onChange={param.onToggle} disabled={param.todo.Status}/>
        <img src={Delete} alt="" id='delete' onClick={param.onDelete}/>
    </div>
  </div>)
}

export default App
