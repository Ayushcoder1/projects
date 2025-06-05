import React, { useEffect, useRef } from 'react';
import { useAtom, useAtomValue, useSetAtom } from 'jotai'
import { tokenAtom, editModeAtom, get_data_Atom, edit_todo_Atom } from './store/atoms.jsx'

function Edit(){
    const idRef = useRef();
    const titleRef = useRef();
    const descriptionRef = useRef();
    const deadlineRef = useRef();
    const StatusRef = useRef();
    const token = useAtomValue(tokenAtom);
    const [editMode, setEditMode] = useAtom(editModeAtom);
    const edit_todo = useSetAtom(edit_todo_Atom);

    useEffect(() => {
        titleRef.current.value = editMode.title;
        descriptionRef.current.value = editMode.description;
        deadlineRef.current.value = new Date(Number(editMode.deadline)).toLocaleDateString('en-CA');
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
        // const res = await fetch('http://localhost:3000/edit', {
        //     method : 'PUT',
        //     headers: {
        //     'Content-Type': 'application/json',
        //     'Authorization': 'Bearer ' + token
        //     },
        //     body: JSON.stringify(content)
        // });
        edit_todo(content);
    }

    const cancelEdit = function(){
        setEditMode(null);
    }
    return (
        <div className='fixed top-15 flex justify-center items-center'>
            <form onSubmit={editTODO} className=' bg-zinc-300 rounded-lg shadow-3xl px-10 py-5 m-1 items-center w-200 grid grid-rows-6'>
                <div className='flex justify-between font-mono'>
                    <p className='text-3xl font-semibold'>TODO ID</p>
                    <input ref={idRef}     disabled={true}     placeholder={editMode.id} className='border-2 w-80 p-2 rounded-sm bg-white text-xl'/>
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
                <div className='flex justify-between font-mono'>
                    <p className='text-3xl font-semibold'>Status</p>
                    <input ref={StatusRef}    type='text' className='border-2 w-80 p-2 rounded-sm bg-white text-xl'/>
                </div>
                <div className='flex justify-center mt-4'>
                    <button type='submit' className='p-4 bg-white rounded-xl text-2xl font-mono font-semibold hover:cursor-pointer'>EDIT TODO</button>
                    <button className='p-4 ml-2 bg-white rounded-xl text-2xl font-mono font-semibold hover:cursor-pointer' onClick={cancelEdit}>CANCEL</button>
                </div>
            </form>
        </div>
    );
}

export default Edit