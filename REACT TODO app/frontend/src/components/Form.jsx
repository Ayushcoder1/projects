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
    <form onSubmit={addTodo} className='todo-form'>
      <div>
        <p>TODO ID</p>
        <input ref={idRef}          placeholder='ID' />
      </div>
      <div>
        <p>Title</p>
        <input ref={titleRef}       placeholder='Title' />
      </div>
      <div>
        <p>Description</p>
        <input ref={descriptionRef} placeholder='Description' />
      </div>
      <div>
        <p>Deadline</p>
        <input ref={deadlineRef}    type='date'/>
      </div>
      <div id='submit'>
        <button type='submit'>ADD TODO</button>
      </div>
    </form>
  );
}

export default Form