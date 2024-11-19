import React, { useState, useEffect } from 'react';
import { addTodo, getTodos, updateTodo, deleteTodo } from './db';

const App = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState({ title: '', description: '', isCompleted: false });

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const data = await getTodos();
    setTodos(data);
  };

  const handleAddTodo = async () => {
    if (!newTodo.title || !newTodo.description) return;
    await addTodo(newTodo);
    setNewTodo({ title: '', description: '', isCompleted: false });
    fetchTodos();
  };

  const handleUpdateTodo = async (id, isCompleted) => {
    const todo = todos.find((t) => t.id === id);
    if (todo) {
      await updateTodo(id, { ...todo, isCompleted });
      fetchTodos();
    }
  };

  const handleDeleteTodo = async (id) => {
    await deleteTodo(id);
    fetchTodos();
  };

  return (
    <div style={{display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"column"}}>
      <h1 style={{color:"white"}}>Todo App</h1>
      <div style={{display:"flex",flexDirection:"column",marginTop:10}}>
        <input
          type="text"
          placeholder="Title"
          value={newTodo.title}
          onChange={(e) => setNewTodo({ ...newTodo, title: e.target.value })}
          style={{marginTop:10,color:"white",border:"1px solid white"}}
        />
        <textarea
          placeholder="Description"
          value={newTodo.description}
          style={{marginTop:10,color:"white",border:"1px solid white"}}
          onChange={(e) => setNewTodo({ ...newTodo, description: e.target.value })}
        />
        <button style={{backgroundColor:"blue",color:"white",marginTop:10}} onClick={handleAddTodo}>Add Todo</button>
      </div>
      <ul>
        {todos.map((todo) => (
          <li style={{color:"white"}} key={todo.id}>
            <h3>{todo.title}</h3>
            <p>{todo.description}</p>
            <label>
              Completed:
              <input
                type="checkbox"
                checked={todo.isCompleted}
                onChange={(e) => handleUpdateTodo(todo.id, e.target.checked)}
              />
            </label>
            <button style={{backgroundColor:"white"}} onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
