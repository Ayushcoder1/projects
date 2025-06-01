import { useState, useEffect } from 'react';
import Delete from '../assets/delete.png'
import Edit from '../assets/edit.png'
import {  useSetAtom } from 'jotai'
import { delete_todo_Atom, toggle_todo_Atom, editModeAtom } from '../store/atoms';

function TODO({todo}){
  const setEditMode = useSetAtom(editModeAtom);
  const onDelete = useSetAtom(delete_todo_Atom);
  const onToggle = useSetAtom(toggle_todo_Atom);

  const onEdit = function(){
    setEditMode(todo);
  }

  
  return (<div className="flex justify-between bg-blue-50 mx-1 my-3 shadow-md rounded-md">
    <div className='text-xl p-6'>
      <p className='text-xl font-mono my-1'>Title : {todo.title}</p>
      <p className='text-xl font-mono my-1'>Description : {todo.description}</p>
      <p className='text-xl font-mono my-1'>Deadline : {new Date(todo.deadline).toLocaleDateString('en-CA')}</p>
    </div>
    <div className='border-l-2 px-8 grid grid-rows-3'>
        <input className='w-7 h-7 hover:cursor-pointer mt-3' type="checkbox" onChange={() => onToggle(todo.id, true)} disabled={todo.Status} checked={todo.Status}/>
        <img  className='w-7 h-7 hover:cursor-pointer mt-1' src={Delete} alt="" id='delete' onClick={onDelete}/>
        <img className='w-7 h-7 hover:cursor-pointer' src={Edit} alt="" id="edit" onClick={onEdit}/>
    </div>
  </div>)
}

export default TODO