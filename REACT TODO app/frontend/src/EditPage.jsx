import React, { useEffect, useRef } from 'react';
import { useAtom, useAtomValue, useSetAtom } from 'jotai'
import { tokenAtom, editModeAtom, get_data_Atom } from './store/atoms.jsx'

function Edit(){
    const idRef = useRef();
    const titleRef = useRef();
    const descriptionRef = useRef();
    const deadlineRef = useRef();
    const StatusRef = useRef();
    const token = useAtomValue(tokenAtom);
    const [editMode, setEditMode] = useAtom(editModeAtom);
    const get_data = useSetAtom(get_data_Atom)

    useEffect(() => {
        titleRef.current.value = editMode.title;
        descriptionRef.current.value = editMode.description;
        deadlineRef.current.value = new Date(editMode.deadline).toLocaleDateString('en-CA');
        StatusRef.current.value = editMode.Status;
    },[]);

    async function editTODO(event){
        if(token === null){
            alert('log in please');
            return;
        }
        event.preventDefault();
        const id = editMode.id;
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
        setEditMode(null);
        get_data();
    }

    const cancelEdit = function(){
        setEditMode(null);
    }
    return (
        <div className='modal'>
            <form className='edit-form'>
                <div>
                    <p>TODO ID</p>
                    <input type="text" placeholder={editMode.id} disabled/>
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