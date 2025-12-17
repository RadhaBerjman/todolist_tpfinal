import { useState, useEffect } from "react";
import { Box, Column, Columns, Tag, Message } from "react-bulma-components";
import TodoForm from "./Forms/TodoForm.jsx";
import { loadTodos, saveTodos } from "../utils/todoStorage.js";

const TodoList = () => {
    // Estado para la lista de las tareas
    const [todos, setTodos] = useState([]);
    // Estado para el filtro de tareas que toma todas las tareas, solo las completadas o solo las pendientes
    const [filter, setFilter] = useState("all");
    //Estado que controla si estamos editando una tarea
    const [editingTodo, setEditingTodo] = useState(null);
    // Estado para mostrar el modal de confirmación
    const [showModal, setShowModal] = useState(false);

    // Efecto #1 que carga las tareas al montar el componente
    useEffect(() => {
        const savedTodos = loadTodos();
        if (savedTodos.length > 0) {
            setTodos(savedTodos);
            console.log("Tareas cargadas por cumplir la condición: length > 0 ");
        }
    }, []);

    // Efecto #2 que guarda los cambios de ñas tareas en el almacenamiento local.
    useEffect(() => {
        saveTodos(todos);
        console.log("Tareas guardadas en el almacenamiento local");
    }, [todos]);

    //Función: 1 agrega una nueva tarea 
    const addTodo = (text) => {
        if (!text.trim()) return; // Evitar agregar tareas vacías
        const newTodo = {
            id: Date.now(), //crypto.randomUUID(), // Generar un ID único
            text: text.trim(),
            completed: false,
            createdAt: new Date().toISOString(), // Fecha de creación
        };
        setTodos([...todos, newTodo]); // Actualizar el estado con la nueva tarea utilizando el operador spread y respetando la ley de inmutabilidad.
    }
    
    //Función: 2 elimina una tarea
    const deleteTodo = (id) => {
        // Busca la tarea a eliminar
        const todoToDelete = todos.find(todo => todo.id === id);
        // Confirma antes de eliminar
        const confirmed = window.confirm(
            `¿Seguro que quieres eliminar la tarea: "${todoToDelete.text}"?`
        );
        if (!confirmed) return;
        // Filtra todas excepto la tarea eliminada
        setTodos(todos.filter(todo => todo.id !== id));
         // Mostrar modal
        setShowModal(true);
    };

    //Función: 3 alterna el estado de completado de una tarea
    const toggleCompleted = (id) => {
        setTodos( todos.map(todo => todo.id === id ? { ...todo, completed: !todo.completed } : todo
            )
        );
    };

    //Función: 4 actualiza el texto de una tarea
    const updateTodo = (id, newText) => {
        if (!newText.trim()) { alert('⚠️ La tarea no puede quedar vacía'); 
            return;}  // Evitar actualizar a texto vacío
        setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, text: newText.trim() } : todo
      ));
        setEditingId(null); // Salir del modo de edición
    };

    // Funcion: 5 filtra las tareas según el filtro seleccionado
    const filteredTodos = () => {
        switch (filter) {
            case "completed":
                return todos.filter(todo => todo.completed);
            case "pending":
                return todos.filter(todo => !todo.completed);
            default:
                return todos; 
        }
    };

    // Funcion 6: limpia todas las tareas completadas
    const clearCompleted = () => {
        const completedCount = todos.filter(todo => todo.completed).length;
        if (completedCount === 0) {
            alert("No hay tareas completadas para eliminar.");
            return;
        }
    
    const confirmed = window.confirm(
         `¿Eliminar ${completedCount} tarea(s) completada(s)?`
    );
    if (confirmed){
        setTodos(todos.filter(todo => !todo.completed));
    }
  }
};
  // calculos

  const filteredTodos = getFilteredTodos();
  const totalTodos = todos.length;
  const pedingCount = todos.filter(todo => !todo.completed).length;
  const completedCount = totalTodos - pedingCount;

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


export default TodoList;
