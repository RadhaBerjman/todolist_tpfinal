// src/components/TodoItem.jsx
import { useState } from "react";

const TodoItem = ({ 
  todo, 
  onDelete, 
  onToggleComplete, 
  onUpdate,
  isEditing,
  onStartEditing,
  onCancelEditing 
}) => {
  const [editText, setEditText] = useState(todo.text);

  const handleSave = () => {
    onUpdate(todo.id, editText);
  };

  return (
    <div className={`box mb-3 ${todo.completed ? 'has-background-light' : ''}`}>
      <div className="columns is-vcentered">
        {/* Checkbox */}
        <div className="column is-narrow">
          <button 
            className={`button ${todo.completed ? 'is-success' : 'is-light'}`}
            onClick={() => onToggleComplete(todo.id)}
          >
            <span className="icon">
              <i className="fas fa-check"></i>
            </span>
          </button>
        </div>

        {/* Texto o input de edición */}
        <div className="column">
          {isEditing ? (
            <div className="field has-addons">
              <div className="control is-expanded">
                <input
                  className="input"
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSave()}
                />
              </div>
              <div className="control">
                <button className="button is-success" onClick={handleSave}>
                  <span className="icon">
                    <i className="fas fa-save"></i>
                  </span>
                  <span className="ml-1">Guardar</span>
                </button>
              </div>
              <div className="control">
                <button className="button is-light" onClick={onCancelEditing}>
                  <span className="icon">
                    <i className="fas fa-times"></i>
                  </span>
                  <span className="ml-1">Cancelar</span>
                </button>
              </div>
            </div>
          ) : (
            <p style={{ 
              textDecoration: todo.completed ? "line-through" : "none",
              opacity: todo.completed ? 0.7 : 1 
            }}>
              {todo.text}
              {todo.completed && (
                <span className="tag is-success ml-2">Completada</span>
              )}
            </p>
          )}
        </div>

        {/* Botones */}
        <div className="column is-narrow">
          <div className="buttons">
            {!isEditing && (
              <>
                <button className="button is-warning" onClick={onStartEditing}>
                  <span className="icon">
                    <i className="fas fa-edit"></i>
                  </span>
                  <span className="ml-1">Editar</span>
                </button>
                <button className="button is-danger" onClick={() => onDelete(todo.id)}>
                  <span className="icon">
                    <i className="fas fa-trash"></i>
                  </span>
                  <span className="ml-1">Eliminar</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoItem;