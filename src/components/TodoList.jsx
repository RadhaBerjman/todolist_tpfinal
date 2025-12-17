import { useState, useEffect } from "react";
import { Box, Column, Columns, Tag, Message } from "react-bulma-components";
import TodoForm from "./TodoForm.jsx";
import TodoItem from "./TodoItem.jsx"; 
import { loadTodos, saveTodos } from "../utils/todoStorage.js";

const TodoList = () => {
    // Estado para la lista de las tareas
    const [todos, setTodos] = useState([]);
    // Estado para el filtro de tareas
    const [filter, setFilter] = useState("all");
    // Estado que controla qué tarea estamos editando (usa el id, no el objeto)
    const [editingId, setEditingId] = useState(null);

    // Efecto #1: Carga las tareas al montar el componente
    useEffect(() => {
        const savedTodos = loadTodos();
        if (savedTodos.length > 0) {
            setTodos(savedTodos);
            console.log("Tareas cargadas del localStorage");
        }
    }, []);

    // Efecto #2: Guarda los cambios en el almacenamiento local
    useEffect(() => {
        saveTodos(todos);
        console.log(" Tareas guardadas en localStorage");
    }, [todos]);

    // Función 1: Agrega una nueva tarea 
    const addTodo = (text) => {
        if (!text.trim()) return;
        const newTodo = {
            id: Date.now(), // Usar Date.now() está bien para este proyecto
            text: text.trim(),
            completed: false,
            createdAt: new Date().toISOString(),
        };
        setTodos([...todos, newTodo]);
        console.log(" Tarea agregada:", text);
    };
    
    // Función 2: Elimina una tarea (MODIFICARÁS ESTA PARA EL MODAL)
    const deleteTodo = (id) => {
        const todoToDelete = todos.find(todo => todo.id === id);
        const confirmed = window.confirm(
            `¿Seguro que quieres eliminar: "${todoToDelete.text}"?`
        );
        if (!confirmed) return;
        
        setTodos(todos.filter(todo => todo.id !== id));
        console.log(" Tarea eliminada");
    };

    // Función 3: Alterna el estado de completado
    const toggleComplete = (id) => {  // ← Cambié el nombre por consistencia
        setTodos(todos.map(todo => 
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
        ));
    };

    // Función 4: Actualiza el texto de una tarea
    const updateTodo = (id, newText) => {
        if (!newText.trim()) { 
            alert('La tarea no puede quedar vacía'); 
            return;
        }
        setTodos(todos.map(todo => 
            todo.id === id ? { ...todo, text: newText.trim() } : todo
        ));
        setEditingId(null);
        console.log("Tarea actualizada");
    };

    // Función 5: Filtra las tareas según selección
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

    // Función 6: Limpia todas las tareas completadas
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
            console.log("Tareas completadas limpiadas");
        }
    };

    // Cálculos
    const filteredTodos = getFilteredTodos(); 
    const totalTodos = todos.length;
    const pendingCount = todos.filter(todo => !todo.completed).length;
    const completedCount = totalTodos - pendingCount;

    return (
        <Box className="fade-in">
            {/* SECCIÓN 1: Formulario para agregar */}
            <TodoForm onAddTodo={addTodo} />
            
            {/* SECCIÓN 2: Contadores y filtros */}
            <Columns className="is-vcentered mb-5">
                <Column>
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
                                    <option value="all">
                                        Todas ({totalTodos})
                                    </option>
                                    <option value="pending">
                                        Pendientes ({pendingCount})
                                    </option>
                                    <option value="completed">
                                        Completadas ({completedCount})
                                    </option>
                                </select>
                            </div>
                        </div>
                    </div>
                </Column>
                
                <Column>
                    <div className="has-text-right">
                        <div className="tags has-addons">
                            <Tag color="info" size="medium">Total</Tag>
                            <Tag color="dark" size="medium">{totalTodos}</Tag>
                        </div>
                        <div className="tags has-addons mt-2">
                            <Tag color="warning" size="medium">Pendientes</Tag>
                            <Tag color="dark" size="medium">{pendingCount}</Tag>
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
                </Column>
            </Columns>
            
            {/* SECCIÓN 3: Lista de tareas */}
            {totalTodos === 0 ? (
                <Message color="info">
                    <Message.Header>
                        <span className="icon-text">
                            <span className="icon">
                                <i className="fas fa-info-circle"></i>
                            </span>
                            <span>¡Bienvenido!</span>
                        </span>
                    </Message.Header>
                    <Message.Body>
                        <p className="has-text-centered">
                            No hay tareas registradas. ¡Comienza agregando tu primera tarea arriba! ✨
                        </p>
                    </Message.Body>
                </Message>
            ) : filteredTodos.length === 0 ? (
                <Message color="warning">
                    <Message.Body className="has-text-centered">
                        <span className="icon-text">
                            <span className="icon">
                                <i className="fas fa-search"></i>
                            </span>
                            <span>No hay tareas que coincidan con el filtro "{filter}"</span>
                        </span>
                    </Message.Body>
                </Message>
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
        </Box>
    );
};

export default TodoList;