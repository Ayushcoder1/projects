import { useRef } from 'react';
import {  useSetAtom } from 'jotai'
import {  add_todo_Atom } from '../store/atoms.jsx'

function Form(){
    const idRef = useRef();
    const titleRef = useRef();
    const descriptionRef = useRef();
    const deadlineRef = useRef();
    const addTODO = useSetAtom(add_todo_Atom);
    function addTodo(event){
        event.preventDefault();
        let Status = false;
        const id = idRef.current.value;
        const title = titleRef.current.value;
        const description = descriptionRef.current.value;
        const deadline = new Date(deadlineRef.current.value).getTime();
        const content = {id, title, description, Status, deadline};
        addTODO(content);
        idRef.current.value = '';
        titleRef.current.value = '';
        descriptionRef.current.value = '';
        deadlineRef.current.value = '';
    }

    return (
    <form onSubmit={addTodo} className=' bg-blue-50 rounded-lg shadow-lg px-10 py-5 m-1 items-center grid grid-cols-2 gap-4'>
      <div className='flex justify-between font-mono'>
        <p className='text-3xl font-semibold'>TODO ID</p>
        <input ref={idRef}          placeholder='ID' className='border-2 w-80 p-2 rounded-sm bg-white text-xl'/>
      </div>
      <div className='flex justify-between font-mono'>
        <p className='text-3xl font-semibold'>Title</p>
        <input ref={titleRef}       placeholder='Title' className='border-2 w-80 p-2 rounded-sm bg-white text-xl'/>
      </div>
      <div className='flex justify-between font-mono'>
        <p className='text-3xl font-semibold'>Description</p>
        <input ref={descriptionRef} placeholder='Description' className='border-2 w-80 p-2 rounded-sm bg-white text-xl'/>
      </div>
      <div className='flex justify-between font-mono'>
        <p className='text-3xl font-semibold'>Deadline</p>
        <input ref={deadlineRef}    type='date' className='border-2 w-80 p-2 rounded-sm bg-white text-xl'/>
      </div>
      <div className='col-span-2 flex justify-center mt-4'>
        <button type='submit' className='p-4 bg-white rounded-xl text-2xl font-mono font-semibold'>ADD TODO</button>
      </div>
    </form>
  );
}

export default Form