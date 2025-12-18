// src/components/TodoForm.jsx
import { useState } from "react";

const TodoForm = ({ onAddTodo }) => {
    const [inputValue, setInputValue] = useState("");
    const [error, setError] = useState("");
    const [showHelp, setShowHelp] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!inputValue.trim()) {
            setError('⚠️ Por favor, escribe una tarea');
            setShowHelp(true);
            return;
        }

        if (inputValue.trim().length < 3) {
            setError('⚠️ La tarea debe tener al menos 3 caracteres');
            return;
        }

        if (inputValue.length > 200) {
            setError('Texto demasiado largo (máximo 200 caracteres)');
            return;
        }

        onAddTodo(inputValue);
        setInputValue('');
        setError('');
        setShowHelp(false);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            handleSubmit(e);
        }
        if (error && e.key !== 'Enter') {
            setError('');
        }
    };

    return (
        <div className="mb-6">
            <form onSubmit={handleSubmit}>
                <div className="field">
                    <label className="label is-size-5">
                        <span className="icon-text">
                            <span className="icon">
                                <i className="fas fa-tasks"></i>
                            </span>
                            <span>¿Qué necesitas hacer hoy?</span>
                        </span>
                    </label>
                    
                    <div className="control has-icons-left">
                        <input
                            className={`input is-medium ${error ? 'is-danger' : 'is-primary'}`}
                            type="text"
                            placeholder="Ej: Comprar leche, Estudiar React, Hacer ejercicio..."
                            value={inputValue}
                            onChange={(e) => {
                                setInputValue(e.target.value);
                                if (error) setError('');
                            }}
                            onKeyDown={handleKeyDown}
                            autoFocus
                        />
                        <span className="icon is-left is-small">
                            <i className="fas fa-plus"></i>
                        </span>
                    </div>
                    
                    {/* Mensaje de error */}
                    {error && (
                        <div className="notification is-danger is-light mt-2">
                            <span className="icon-text">
                                <span className="icon">
                                    <i className="fas fa-exclamation-triangle"></i>
                                </span>
                                <span>{error}</span>
                            </span>
                        </div>
                    )}
                    
                    {/* Mensaje de ayuda */}
                    {showHelp && !error && (
                        <p className="help is-info">
                            💡 Escribe una tarea con al menos 3 caracteres
                        </p>
                    )}
                    
                    {/* Contador de caracteres */}
                    <p className="help has-text-right">
                        {inputValue.length}/200 caracteres
                        {inputValue.length > 150 && (
                            <span className="has-text-warning"> (casi al límite)</span>
                        )}
                    </p>
                </div>
                
                <div className="field mt-4">
                    <div className="control">
                        <button
                            type="submit"
                            className="button is-primary is-medium is-fullwidth"
                            disabled={!inputValue.trim()}
                        >
                            <span className="icon">
                                <i className="fas fa-plus"></i>
                            </span>
                            <span>Agregar Tarea</span>
                        </button>
                    </div>
                </div>
            </form>
            
            <div className="content is-small mt-4 has-text-centered">
                <p className="has-text-grey">
                    <span className="icon-text">
                        <span className="icon">
                            <i className="fas fa-lightbulb"></i>
                        </span>
                        <span>
                            <strong>Tip:</strong> Presiona Enter para agregar rápidamente
                        </span>
                    </span>
                </p>
            </div>
        </div>
    );
};

export default TodoForm;