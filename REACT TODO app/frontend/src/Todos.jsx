import React, { useState, useEffect } from 'react'
import TODO from './components/TODO'
import Form from './components/Form'
import Card from './components/Card'
import { Link } from 'react-router-dom'
import Edit from './EditPage.jsx'
import { todosAtom, editModeAtom, tokenAtom, get_data_Atom } from './store/atoms.jsx'
import { useAtom, useAtomValue, useSetAtom } from 'jotai'

function Todos() {
  const [todos , setTodos] = useAtom(todosAtom);
  const [editMode, setEditMode] = useAtom(editModeAtom);
  const get_data = useSetAtom(get_data_Atom);
  const setToken = useSetAtom(tokenAtom);

  useEffect(() => {
    get_data();

    return () => {
      setTodos([]);
      setToken(null);
      setEditMode(null);
      get_data();
    };
  }, []);

  const changeStatus = () => {
    setTodos([]);
    setToken(null);
    setEditMode(null);
    get_data();
  }
  return (
    <>
    <div id='outer_app'>
      <Navbar changeStatus={changeStatus}></Navbar>
      <Card>
        <Form />
      </Card>
      {todos.map(function(todo){
        // console.log(todo);
        return <Card  key={todo.id}>
          <TODO todo={todo}/>
        </Card>
      })}

      {editMode && (
        <div className='fixed inset-0 bg-white flex items-center justify-center z-50'>
          <div className='flex justify-center full-screen shadow-3xl'>
            <Edit/>
          </div>
        </div>
      )}
    </div>
    </>
  )
}

function Navbar({changeStatus}){
  return (
    <div className='flex justify-between bg-blue-50 m-1 my-2 rounded-lg px-4 py-2 font-mono shadow-md'>
      <h1 className='text-3xl font-semibold'>TODO APP</h1>
      <Link to="/login" onClick={changeStatus} className='flex items-center text-lg hover:underline hover:cursor-pointer pr-4'>Log out</Link>
    </div>
  )
}

export default Todos