import React, { useState, useEffect } from 'react'
import TODO from './components/TODO'
import Form from './components/Form'
import Card from './components/Card'
import Edit from './EditPage.jsx'
import { todosAtom, editModeAtom, tokenAtom, get_data_Atom } from './store/atoms.jsx'
import { useAtom, useSetAtom } from 'jotai'
import Navbar from './components/Navbar.jsx'

function Todos() {
  const [todos , setTodos] = useAtom(todosAtom);
  const [editMode, setEditMode] = useAtom(editModeAtom);
  const get_data = useSetAtom(get_data_Atom);
  const setToken = useSetAtom(tokenAtom);

  useEffect(() => {
    get_data();
    // console.log('useEffect called');
    return () => {
      // console.log('cleanup called');
      // sessionStorage.removeItem('token');
      // setTodos([]);
      // setToken(null);
      // // console.log(token);
      // setEditMode(null);
      // get_data();
    };
  }, []);

  return (
    <>
    <div id='outer_app'>
      <Navbar isTodos={1}/>
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

export default Todos