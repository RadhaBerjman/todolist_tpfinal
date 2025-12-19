// src/components/TodoList.jsx 
import { useState, useEffect } from "react";
import TodoForm from "./TodoForm.jsx";
import TodoItem from "./TodoItem.jsx";
import { loadTodos, saveTodos } from "../utils/todoStorage.js";

const TodoList = () => { //
    const [todos, setTodos] = useState([]); // Lista de tareas que se renderizan 
    const [filter, setFilter] = useState("all"); // Filtro actual: "all", "completed", "pending"
    const [editingId, setEditingId] = useState(null); // ID de la tarea que se está editando

    useEffect(() => { // Cargar tareas al montar el componente
        const savedTodos = loadTodos(); // Carga las tareas guardadas
        if (savedTodos.length > 0) { // Si hay tareas guardadas, actualiza el estado
            setTodos(savedTodos);
        }
    }, []);

    useEffect(() => { // Guardar tareas en localStorage cuando cambian
        saveTodos(todos);
    }, [todos]);

    const addTodo = (text) => { // Agrega una nueva tarea
        if (!text.trim()) return; // No agregar si el texto está vacío
        const newTodo = {
            id: Date.now(),
            text: text.trim(),
            completed: false,
            createdAt: new Date().toISOString(),
        };
        setTodos([newTodo, ...todos]);
    };

    const deleteTodo = (id) => { // Elimina una tarea por su ID
        const todoToDelete = todos.find(todo => todo.id === id); // Encuentra la tarea a eliminar comparando por ID
        const confirmed = window.confirm( // window.confirm para confirmar eliminación
            `¿Eliminar: "${todoToDelete.text}"?`
        );
        if (!confirmed) return;
        setTodos(todos.filter(todo => todo.id !== id)); // Filtra la tarea eliminada y actualiza el estado sin ella
    };

    const toggleComplete = (id) => { // Alterna el estado de completado de una tarea
        setTodos(todos.map(todo =>  // Mapea las tareas y actualiza la que coincide con el ID
            todo.id === id ? { ...todo, completed: !todo.completed } : todo //desestructura la tarea y cambia su estado completed respetando el principio de inmutabilidad
        ));
    };

    const updateTodo = (id, newText) => { // Actualiza el texto de una tarea
        if (!newText.trim()) {  // Validación simple
            alert('La tarea no puede quedar vacía');
            return;
        }
        setTodos(todos.map(todo =>
            todo.id === id ? { ...todo, text: newText.trim() } : todo // Actualiza el texto de la tarea que coincide con el ID usando desestructuración con spread 
        ));
        setEditingId(null);// Salir del modo edición
    };

    const getFilteredTodos = () => { // Devuelve las tareas filtradas según el filtro seleccionado
        switch (filter) { // Evalúa el filtro actual
            case "completed": // Si es "completed", devuelve solo las tareas completadas
                return todos.filter(todo => todo.completed);
            case "pending": // Si es "pending", devuelve solo las tareas pendientes
                return todos.filter(todo => !todo.completed);
            default: // Si es "all" o cualquier otro valor, devuelve todas las tareas
                return todos;
        }
    };

    const clearCompleted = () => { // Elimina todas las tareas completadas
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

    const filteredTodos = getFilteredTodos(); // Tareas a mostrar según el filtro
    const totalTodos = todos.length; // Conteo total de tareas
    const pendingCount = todos.filter(todo => !todo.completed).length; // Conteo de tareas pendientes
    const completedCount = totalTodos - pendingCount; // Conteo de tareas completadas

    return (
        <div>
            <TodoForm onAddTodo={addTodo} />
            {/* PANEL DE CONTROL */}
            <div className="level is-mobile mb-4">
                <div className="level-left">
                    <div className="level-item">
                        <div className="field">
                            <div className="control">
                                <div className="select is-small">
                                    <select
                                        value={filter} 
                                        onChange={(e) => setFilter(e.target.value)} // Actualiza el filtro al cambiar la selección tomando el valor del evento.
                                    >
                                        <option value="all">Todas ({totalTodos})</option> {/* Muestra el conteo total de tareas */}
                                        <option value="pending">Pendientes ({pendingCount})</option> {/* Muestra el conteo de tareas pendientes */}
                                        <option value="completed">Completadas ({completedCount})</option> {/* Muestra el conteo de tareas completadas */}
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="level-right">
                    <div className="level-item">
                        <div className="tags has-addons">
                            <span className="tag is-dark is-small">Total</span>
                            <span className="tag is-info is-small">{totalTodos}</span> {/* Muestra el conteo total de tareas */}
                        </div>
                    </div>
                    <div className="level-item">
                        <div className="tags has-addons">
                            <span className="tag is-dark is-small">Pendientes</span>
                            <span className="tag is-warning is-small">{pendingCount}</span> {/* Muestra el conteo de tareas pendientes */}
                        </div>
                    </div>
                    {completedCount > 0 && ( // Mostrar solo si hay tareas completadas
                        <div className="level-item">
                            <button
                                onClick={clearCompleted} // Llama a la función para limpiar tareas completadas
                                className="button is-small is-danger is-outlined"
                                title="Limpiar completadas"
                            >
                                <span className="icon is-small">
                                    <i className="fas fa-trash"></i>
                                </span>
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* LISTA DE TAREAS */}
            <div className="content">
                {totalTodos === 0 ? ( // Si no hay tareas, mostrar mensaje
                    <div className="has-text-centered py-6">
                        <div className="icon is-large has-text-grey-light mb-3">
                            <i className="fas fa-clipboard-list fa-2x"></i>
                        </div>
                        <p className="has-text-grey">
                            Ninguna tarea por el momento. ¡Agrega tu primer tarea arriba! 😉
                        </p>
                    </div>
                ) : filteredTodos.length === 0 ? ( // Si no hay tareas que coincidan con el filtro, mostrar mensaje
                    <div className="notification is-light has-text-centered py-3">
                        <span className="icon-text">
                            <span className="icon">
                                <i className="fas fa-search"></i>
                            </span>
                            <span>No hay tareas con el filtro "{filter}"</span>
                        </span>
                    </div>
                ) : (
                    <div className="todo-list">
                        {filteredTodos.map(todo => ( // Renderiza cada tarea usando el componente TodoItem
                            <TodoItem
                                key={todo.id} // Usa el ID como key única
                                todo={todo}
                                onDelete={deleteTodo} // Pasa la función para eliminar la tarea
                                onToggleComplete={toggleComplete} // Pasa la función para alternar completado
                                onUpdate={updateTodo} // Pasa la función para actualizar la tarea
                                isEditing={editingId === todo.id} // Indica si esta tarea está en modo edición
                                onStartEditing={() => setEditingId(todo.id)} // Inicia la edición de esta tarea
                                onCancelEditing={() => setEditingId(null)} // Cancela la edición
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default TodoList;