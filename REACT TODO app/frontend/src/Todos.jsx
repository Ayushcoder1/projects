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
    localStorage.removeItem('token');
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
        <Edit />
      )}
    </div>
    </>
  )
}

function Navbar({changeStatus}){
  return (
    <nav className='navbar'>
      <h1>TODO APP</h1>
      <Link to="/" onClick={changeStatus}>Log out</Link>
    </nav>
  )
}

export default Todos