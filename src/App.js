import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [inputValue, setInputValue] = useState('');
  const [todoList, setTodoList] = useState([]);

  useEffect(() => {
    const savedTodoList = localStorage.getItem('todoList');
    setTodoList(JSON.parse(savedTodoList));
    
  }, []);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleAddTodo = () => {
    if (inputValue.trim() !== '') {
      const newTodoList = [...todoList, { id: Date.now(), text: inputValue, completed: false }];
      setTodoList(newTodoList);
      setInputValue('');
      localStorage.setItem('todoList', JSON.stringify(newTodoList));
      console.log("enemede");
    }
  };

  const handleToggleComplete = (id) => {
    const updatedTodoList = todoList.map(todo => {
      if (todo.id === id) {
        return { ...todo, completed: !todo.completed };
      }
      return todo;
    });
    setTodoList(updatedTodoList);
  };

  const handleDeleteAll = () => {
    setTodoList([]);
  };

  const handleDeleteCompleted = () => {
    const filteredTodoList = todoList.filter(todo => !todo.completed);
    setTodoList(filteredTodoList);
  };

  return (
    <div className="App">
      <h1>To do List</h1>
      <div className="input-container">
        <input
          type="text"
          placeholder="Agregar nuevo ítem"
          value={inputValue}
          onChange={handleInputChange}
          className="task-input"
        />
        <button onClick={handleAddTodo} className="task-button">Agregar</button>
      </div>
      <div className="task-list">
        {todoList.map(todo => (
          <div className="task-card" key={todo.id}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => handleToggleComplete(todo.id)}
              className="task-checkbox"
            />
            <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>{todo.text}</span>
          </div>
        ))}
      </div>
      <div className="button-container">
        <button onClick={handleDeleteAll} className="delete-button">Eliminar Todos</button>
        <button onClick={handleDeleteCompleted} className="delete-button">Eliminar Completados</button>
      </div>
    </div>
  );
  


  
}

export default App;
