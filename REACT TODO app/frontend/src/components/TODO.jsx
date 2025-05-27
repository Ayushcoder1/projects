import { useState, useEffect } from 'react';
import Delete from '../assets/delete.png'
import Edit from '../assets/edit.png'
import {  useSetAtom } from 'jotai'
import { delete_todo_Atom, toggle_todo_Atom, editModeAtom } from '../store/atoms';

function TODO({todo}){
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [deadline, setDeadline] = useState('');
    const setEditMode = useSetAtom(editModeAtom);
    const onDelete = useSetAtom(delete_todo_Atom);
    const onToggle = useSetAtom(toggle_todo_Atom);

    useEffect(() => {
    if (!todo) return;
    setTitle(todo.title);
    setDescription(todo.description);
    setDeadline(todo.deadline);
  }, [todo.title, todo.description, todo.deadline]);

  const onEdit = function(){
    setEditMode(todo);
  }

  
  return (<div className="items">
    <div>
      <p>Title : {title}</p>
      <p>Description : {description}</p>
      <p>Deadline : {new Date(deadline).toLocaleDateString('en-CA')}</p>
    </div>
    <div className='icons'>
        <input type="checkbox" onChange={onToggle} disabled={todo.Status}/>
        <img src={Delete} alt="" id='delete' onClick={onDelete}/>
        <img src={Edit} alt="" id="edit" onClick={onEdit}/>
    </div>
  </div>)
}

export default TODO