import React, { useEffect, useRef } from 'react';

function Edit(param){
    const token = param.token;
    const idRef = useRef();
    const titleRef = useRef();
    const descriptionRef = useRef();
    const deadlineRef = useRef();
    const StatusRef = useRef();

    useEffect(() => {
        titleRef.current.value = param.todo.title;
        descriptionRef.current.value = param.todo.description;
        deadlineRef.current.value = new Date(param.todo.deadline).toLocaleDateString('en-CA');
        StatusRef.current.value = param.todo.Status;
    },[]);

    async function editTODO(event){
        if(token === null){
            alert('log in please');
            return;
        }
        event.preventDefault();
        const id = param.todo.id;
        const Status = StatusRef.current.value == 'true' ? true : false;
        const title = titleRef.current.value;
        const description = descriptionRef.current.value;
        const deadline = new Date(deadlineRef.current.value).getTime();
        const content = {id, title, description, Status, deadline};
        const res = await fetch('http://localhost:3000/edit', {
            method : 'PUT',
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
        // idRef.current.value = '';
        // titleRef.current.value = '';
        // descriptionRef.current.value = '';
        // deadlineRef.current.value = '';
        param.setEditMode(null);
        param.get_data();
    }

    const cancelEdit = function(){
        param.setEditMode(null);
    }
    return (
        <div className='modal'>
            <form className='edit-form'>
                <div>
                    <p>TODO ID</p>
                    <p>{param.todo.id}</p>
                </div>
                <div>
                    <p>Title</p>
                    <input ref={titleRef}/>
                </div>
                <div>
                    <p>Description</p>
                    <input ref={descriptionRef}/>
                </div>
                <div>
                    <p>Deadline</p>
                    <input ref={deadlineRef} type='date'/>
                </div>
                <div>
                    <p>Status</p>
                    <input ref={StatusRef}/>
                </div>
                <div id='submit'>
                    <button type='submit' onClick={editTODO}>EDIT TODO</button>
                    <button type='button' onClick={cancelEdit}> Cancel </button>
                </div>
            </form>
        </div>
    );
}

export default Edit