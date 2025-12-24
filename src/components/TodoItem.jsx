// src/components/TodoItem.jsx
import { useState } from "react";

const TodoItem = ({  // Props recibidos desde TodoList
  todo,
  onDelete,
  onToggleComplete,
  onUpdate,
  isEditing,
  onStartEditing,
  onCancelEditing
}) => {
  const [editText, setEditText] = useState(todo.text); // Estado local para el texto en edición

  const handleSave = () => { // Guarda los cambios realizados
    if (editText.trim() === todo.text) {// Si no hay cambios, simplemente cancela la edición
      onCancelEditing();
      return;
    }
    onUpdate(todo.id, editText); // Llama a la función para actualizar la tarea con updateTodo
  };

  const handleKeyDown = (e) => { // Maneja teclas para guardar o cancelar
    if (e.key === 'Enter') handleSave(); // Guarda al presionar Enter
    if (e.key === 'Escape') onCancelEditing(); // Cancela al presionar Escape
  };

  return (
    <div className={`box is-shadowless py-3 mb-2 ${todo.completed ? 'has-background-light' : ''}`}>
      <div className="is-flex is-align-items-center">
        {/* Checkbox */}
        <button
          className={`button is-small mr-3 ${todo.completed ? 'is-success is-light' : 'is-light'}`}
          onClick={() => onToggleComplete(todo.id)}
          title={todo.completed ? "Marcar como pendiente" : "Marcar como completada"}
        >
          <span className="icon is-small">
            <i className={`fas fa-${todo.completed ? 'check' : 'square'}`}></i>
          </span>
        </button>

        {/* Contenido */}
        <div className="is-flex-grow-1">
          {isEditing ? (
            <div className="field has-addons">
              <div className="control is-expanded">
                <input
                  className="input is-small"
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  onKeyDown={handleKeyDown}
                  autoFocus
                />
              </div>
              <div className="control">
                <button className="button is-small is-success" onClick={handleSave}>
                  <span className="icon is-small">
                    <i className="fas fa-check"></i>
                  </span>
                </button>
              </div>
              <div className="control">
                <button className="button is-small is-light" onClick={onCancelEditing}>
                  <span className="icon is-small">
                    <i className="fas fa-times"></i>
                  </span>
                </button>
              </div>
            </div>
          ) : (
            <div className="is-flex is-align-items-center">
              <span
                className={`${todo.completed ? 'has-text-grey' : ''}`}
                style={{
                  textDecoration: todo.completed ? 'line-through' : 'none',
                  flexGrow: 1
                }}
              >
                {todo.text}
              </span>
              {todo.completed && (
                <span className="tag is-success is-light is-small ml-2">
                  <span className="icon is-small">
                    <i className="fas fa-check"></i>
                  </span>
                </span>
              )}
            </div>
          )}
        </div>

        {/* Botones de acción */}
        {!isEditing && (
          <div className="buttons are-small ml-3">
            <button
              className="button is-warning is-light"
              onClick={onStartEditing}
              disabled={todo.completed}
              title={todo.completed ? "No se pueden editar tareas completadas" : "Editar"}
            >
              <span className="icon is-small">
                <i className="fas fa-pencil-alt"></i>
              </span>
            </button>
            <button
              className="button is-danger is-light"
              onClick={() => onDelete(todo.id)}
              title="Eliminar"
            >
              <span className="icon is-small">
                <i className="fas fa-trash"></i>
              </span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TodoItem;