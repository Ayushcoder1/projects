import { useState, useEffect } from 'react';
import Delete from '../assets/delete.png'

function TODO(param){
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [deadline, setDeadline] = useState('');
    const todo = param.todo;
    useEffect(() => {
    if (!todo) return;
    setTitle(todo.title);
    setDescription(todo.description);
    setDeadline(todo.deadline);
  }, [todo.title, todo.description, todo.deadline]);
  return (<div className="items">
    <div>
      <p>Title : {title}</p>
      <p>Description : {description}</p>
      <p>Deadline : {new Date(deadline).toLocaleDateString('en-CA')}</p>
    </div>
    <div className='icons'>
        <input type="checkbox" onChange={param.onToggle} disabled={param.todo.Status}/>
        <img src={Delete} alt="" id='delete' onClick={param.onDelete}/>
    </div>
  </div>)
}

export default TODO