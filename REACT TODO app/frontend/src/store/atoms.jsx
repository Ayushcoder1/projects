import { atom } from 'jotai';

export const todosAtom = atom([]);

export const editModeAtom = atom(null);

export const tokenAtom = atom(sessionStorage.getItem('token') || null);

export const get_data_Atom = atom(
  (get) => get(todosAtom),
  async (get, set) => {
    const token = get(tokenAtom);
    if (token === null) {
      set(todosAtom, []);
      return;
    }
    let res = await fetch('http://localhost:3000/todos', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token,
      },
    });
    res = await res.json();
    set(todosAtom, res);
  }
);

export const add_todo_Atom = atom(
  null,
  async (get, set, newTodo) => {
    const token = get(tokenAtom);
    if (token === null) {
      alert('log in please');
      return;
    }
    const res = await fetch('http://localhost:3000/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token,
      },
      body: JSON.stringify(newTodo),
    });
    if (res.status !== 200) {
      console.log('A todo with similar ID already exists, try again.');
      return;
    }
    set(get_data_Atom);
  }
);

export const toggle_todo_Atom = atom(
  null,
  async (get, set, todoId, status) => {
    const token = get(tokenAtom);
    if (token === null) {
      alert('log in please');
      return;
    }
    await fetch('http://localhost:3000/done', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token,
        'id': todoId,
        'status' : status === true ? 'true' : 'false',
      },
    });
    set(get_data_Atom);
  }
);

export const delete_todo_Atom = atom(
  null,
  async (get, set, todoId) => {
    const token = get(tokenAtom);
    if (token === null) {
      alert('log in please');
      return;
    }
    await fetch('http://localhost:3000/delete', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token,
        'id': todoId,
      },
    });
    set(get_data_Atom);
  }
);

export const session_Atom = atom(
  null,
  async (get, set, { username, password, name=null }) => {
    const path = name ? 'signup' : 'login';
    // console.log('here', { username, password, name });
    const res = await fetch(`http://localhost:3000/${path}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password, name }),
    });
    const data = await res.json();
    if (res.status === 200) {
      sessionStorage.setItem('token', data.token);
      set(tokenAtom, data.token);
      set(get_data_Atom);
    } else {
      console.error('Login failed:', data.message);
    }
  }
);

export const edit_todo_Atom = atom(
  null,
  async (get, set, content) => {
    const token = get(tokenAtom);
    const res = await fetch('http://localhost:3000/edit', {
        method : 'PUT',
        headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify(content)
    });
    set(get_data_Atom);
    set(editModeAtom, null);
  }
)