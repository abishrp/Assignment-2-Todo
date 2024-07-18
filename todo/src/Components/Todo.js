import React, { useState, useEffect, useRef } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEdit, faTrash, faClose } from '@fortawesome/free-solid-svg-icons';
const TodoForm = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [editindex, setEditintex] = useState(null);
  const isInitialMount = useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
      const savedTodos = JSON.parse(localStorage.getItem("todos")) || [];
      setTodos(savedTodos);
      isInitialMount.current = false;
      console.log("load");
    }
  }, []);

  useEffect(() => {
    if (!isInitialMount.current) {
      localStorage.setItem("todos", JSON.stringify(todos));
      console.log("update");
    }
  }, [todos]);

  const addTodo = () => {
  if (newTodo.trim() === "") return;

  if (editindex !== null) {
    const updatedTodos = todos.map((todo, index) =>
      index === editindex ? newTodo : todo
    );
    setTodos(updatedTodos);
    setEditintex(null);
  } else {
    setTodos([...todos, newTodo]);
  }

  setNewTodo("");
};

  

  const deleteTodo = (index) => {
    const updatedTodos = todos.filter((_, i) => i !== index);
    setTodos(updatedTodos);
  };

  const handleEnter = (e) => {
    if (e.key === "Enter") {
      addTodo();
    }
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const reorderedTodos = Array.from(todos);
    const removed = reorderedTodos.splice(result.source.index, 1);
    reorderedTodos.splice(result.destination.index, 0, removed);
    setTodos(reorderedTodos);
  };
  const startEdit =(index)=>
  {
    setNewTodo(todos[index]);
    setEditintex(index);

  }
  // const finishTodo = ()=>
  // {

  // }

  return (
    <div className="container">
      <h2>Todo Form</h2>
      <div className="form">
      <input className="inputtask"
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        onKeyDown={handleEnter}
      />
      <button className="addbtn" onClick={addTodo}><FontAwesomeIcon icon={faPlus} /></button>

      </div>
     
     <div>
     <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="todos">
          {(provided) => (
            <ul {...provided.droppableProps} ref={provided.innerRef} className="list">
              {todos.map((todo, index) => (
                <Draggable
                key={index}
                draggableId={index.toString()}
                index={index}
              >
                {(provided, snapshot) => (
                  <li
                    ref={provided.innerRef}
                    {...provided.dragHandleProps}
                    {...provided.draggableProps}
                    className={snapshot.isDragging ? 'dragging' : 'items'}
                  >
                    <span className="todo-text">
                    {todo.length > 15 ? `${todo.slice(0, 15)}...` : todo}
                  </span>
                    <div className="editremovebutton">
                    <button onClick={() => startEdit(index)}> <FontAwesomeIcon icon={faEdit} /></button>
                    <button onClick={() => deleteTodo(index)}><FontAwesomeIcon icon={faTrash} /></button>
                    {/* <button onClick={() => finishTodo(index)}><FontAwesomeIcon icon={faClose} /></button> */}

                    </div>
                    
                  </li>
                )}
              </Draggable>
              
              ))}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
     </div>
    </div>
  );
};

export default TodoForm;
