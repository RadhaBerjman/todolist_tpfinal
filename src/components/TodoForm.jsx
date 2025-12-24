// src/components/TodoForm.jsx 
import { useState } from "react";

const TodoForm = ({ onAddTodo }) => {
    const [inputValue, setInputValue] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!inputValue.trim()) {
            setError('⚠️ Escribe una tarea');
            return;
        }

        if (inputValue.trim().length < 3) {
            setError('⚠️ Mínimo 3 caracteres');
            return;
        }

        if (inputValue.length > 200) {
            setError('⚠️ Máximo 200 caracteres');
            return;
        }

        onAddTodo(inputValue);
        setInputValue('');
        setError('');
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
        <div className="mb-5">
            <form onSubmit={handleSubmit}>
                <div className="field">
                    <label className="label is-size-6 mb-2">
                        <span className="icon-text">
                            <span className="icon">
                                <i className="fas fa-plus-circle"></i>
                            </span>
                            <span>Nueva tarea</span>
                        </span>
                    </label>

                    <div className="field has-addons">
                        <div className="control is-expanded">
                            <input
                                className={`input ${error ? 'is-danger' : ''}`}
                                type="text"
                                placeholder="¿Qué necesitas hacer?"
                                value={inputValue}
                                onChange={(e) => {
                                    setInputValue(e.target.value);
                                    if (error) setError('');
                                }}
                                onKeyDown={handleKeyDown}
                                autoFocus
                            />
                        </div>
                        <div className="control">
                            <button
                                type="submit"
                                className="button is-primary"
                                disabled={!inputValue.trim()} // Deshabilita el botón si el input está vacío o solo tiene espacios
                            >
                                <span className="icon">
                                    <i className="fas fa-plus"></i>
                                </span>
                                <span>Agregar</span>
                            </button>
                        </div>
                    </div>

                    {/* Mensaje de error*/}
                    {error && (
                        <p className="help is-danger mt-1">
                            <span className="icon-text">
                                <span className="icon is-small">
                                    <i className="fas fa-exclamation-circle"></i>
                                </span>
                                <span>{error}</span>
                            </span>
                        </p>
                    )}

                    {/* Contador de caracteres */}
                    <p className="help has-text-right mt-1">
                        {inputValue.length}/200
                        {inputValue.length > 150 && (
                            <span className="has-text-warning"> (casi lleno)</span>
                        )}
                    </p>
                </div>
            </form>
        </div>
    );
};

export default TodoForm;