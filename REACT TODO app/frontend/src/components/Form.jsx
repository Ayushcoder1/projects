import { useState, useEffect } from 'react';

function Form(param){
    const token = param.token;
    let [id, setId] = useState('');
    let [title, setTitle] = useState('');
    let [description, setDescription] = useState('');
    let [deadline, setDeadline] = useState('');

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
        param.get_data();
    }

    return (
        <>
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
        </>
    )
}

export default Form