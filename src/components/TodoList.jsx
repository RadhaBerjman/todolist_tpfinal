// src/components/TodoList.jsx
import { useState, useEffect } from "react";
import TodoForm from "./TodoForm.jsx";
import TodoItem from "./TodoItem.jsx"; 
import { loadTodos, saveTodos } from "../utils/todoStorage.js";

const TodoList = () => {
    const [todos, setTodos] = useState([]);
    const [filter, setFilter] = useState("all");
    const [editingId, setEditingId] = useState(null);

    useEffect(() => {
        const savedTodos = loadTodos();
        if (savedTodos.length > 0) {
            setTodos(savedTodos);
        }
    }, []);

    useEffect(() => {
        saveTodos(todos);
    }, [todos]);

    const addTodo = (text) => {
        if (!text.trim()) return;
        const newTodo = {
            id: Date.now(),
            text: text.trim(),
            completed: false,
            createdAt: new Date().toISOString(),
        };
        setTodos([...todos, newTodo]);
    };
    
    const deleteTodo = (id) => {
        const todoToDelete = todos.find(todo => todo.id === id);
        const confirmed = window.confirm(
            `¿Seguro que quieres eliminar: "${todoToDelete.text}"?`
        );
        if (!confirmed) return;
        
        setTodos(todos.filter(todo => todo.id !== id));
    };

    const toggleComplete = (id) => {
        setTodos(todos.map(todo => 
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
        ));
    };

    const updateTodo = (id, newText) => {
        if (!newText.trim()) { 
            alert('La tarea no puede quedar vacía'); 
            return;
        }
        setTodos(todos.map(todo => 
            todo.id === id ? { ...todo, text: newText.trim() } : todo
        ));
        setEditingId(null);
    };

    const getFilteredTodos = () => {
        switch (filter) {
            case "completed":
                return todos.filter(todo => todo.completed);
            case "pending":
                return todos.filter(todo => !todo.completed);
            default:
                return todos; 
        }
    };

    const clearCompleted = () => {
        const completedCount = todos.filter(todo => todo.completed).length;
        if (completedCount === 0) {
            alert("No hay tareas completadas para eliminar.");
            return;
        }
    
        const confirmed = window.confirm(
            `¿Eliminar ${completedCount} tarea(s) completada(s)?`
        );
        if (confirmed) {
            setTodos(todos.filter(todo => !todo.completed));
        }
    };

    const filteredTodos = getFilteredTodos(); 
    const totalTodos = todos.length;
    const pendingCount = todos.filter(todo => !todo.completed).length;
    const completedCount = totalTodos - pendingCount;

    return (
        <div className="box fade-in">
            <TodoForm onAddTodo={addTodo} />
            
            <div className="columns is-vcentered mb-5">
                <div className="column">
                    <div className="field">
                        <label className="label">
                            <span className="icon-text">
                                <span className="icon">
                                    <i className="fas fa-filter"></i>
                                </span>
                                <span>Filtrar tareas:</span>
                            </span>
                        </label>
                        <div className="control">
                            <div className="select is-fullwidth">
                                <select 
                                    value={filter} 
                                    onChange={(e) => setFilter(e.target.value)}
                                    className="has-text-weight-medium"
                                >
                                    <option value="all">Todas ({totalTodos})</option>
                                    <option value="pending">Pendientes ({pendingCount})</option>
                                    <option value="completed">Completadas ({completedCount})</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className="column">
                    <div className="has-text-right">
                        <div className="tags has-addons">
                            <span className="tag is-info is-medium">Total</span>
                            <span className="tag is-dark is-medium">{totalTodos}</span>
                        </div>
                        <div className="tags has-addons mt-2">
                            <span className="tag is-warning is-medium">Pendientes</span>
                            <span className="tag is-dark is-medium">{pendingCount}</span>
                        </div>
                        {completedCount > 0 && (
                            <button 
                                onClick={clearCompleted}
                                className="button is-small is-danger is-light mt-3"
                            >
                                <span className="icon">
                                    <i className="fas fa-trash"></i>
                                </span>
                                <span>Limpiar completadas</span>
                            </button>
                        )}
                    </div>
                </div>
            </div>
            
            {totalTodos === 0 ? (
                <div className="notification is-info">
                    <div className="icon-text mb-2">
                        <span className="icon">
                            <i className="fas fa-info-circle"></i>
                        </span>
                        <span><strong>¡Bienvenido!</strong></span>
                    </div>
                    <p className="has-text-centered">
                        No hay tareas registradas. ¡Comienza agregando tu primera tarea arriba! ✨
                    </p>
                </div>
            ) : filteredTodos.length === 0 ? (
                <div className="notification is-warning">
                    <div className="has-text-centered">
                        <span className="icon-text">
                            <span className="icon">
                                <i className="fas fa-search"></i>
                            </span>
                            <span>No hay tareas que coincidan con el filtro "{filter}"</span>
                        </span>
                    </div>
                </div>
            ) : (
                filteredTodos.map(todo => (
                    <TodoItem
                        key={todo.id}
                        todo={todo}
                        onDelete={deleteTodo}
                        onToggleComplete={toggleComplete}
                        onUpdate={updateTodo}
                        isEditing={editingId === todo.id}
                        onStartEditing={() => setEditingId(todo.id)}
                        onCancelEditing={() => setEditingId(null)}
                    />
                ))
            )}
        </div>
    );
};

export default TodoList;