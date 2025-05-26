import { useRef } from 'react';

function Form(param){
    const token = param.token;
    const idRef = useRef();
    const titleRef = useRef();
    const descriptionRef = useRef();
    const deadlineRef = useRef();

    async function addTodo(event){
        if(token === null){
          alert('log in please');
          return;
        }
        event.preventDefault();
        let Status = false;
        const id = idRef.current.value;
        const title = titleRef.current.value;
        const description = descriptionRef.current.value;
        const deadline = new Date(deadlineRef.current.value).getTime();
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
        idRef.current.value = '';
        titleRef.current.value = '';
        descriptionRef.current.value = '';
        deadlineRef.current.value = '';
        param.get_data();
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