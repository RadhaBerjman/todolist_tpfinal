const STORAGE_KEY = 'todolist_tpfinal_v1';

/* Guarda las tareas en localStorage */
export const saveTodos = (todos) => {
  try {
    const data = {
      version: '1.0',
      timestamp: new Date().toISOString(),
      todos: todos
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    console.log('💾 Tareas guardadas:', todos.length);
    return true;
  } catch (error) {
    console.error('❌ Error guardando:', error);
    return false;
  }
};

/* Carga las tareas desde localStorage */
export const loadTodos = () => {
  try {
    const rawData = localStorage.getItem(STORAGE_KEY);
    
    if (!rawData) {
      return [];
    }
    
    const data = JSON.parse(rawData);
    
    // Verificar estructura
    if (data && Array.isArray(data.todos)) {
      console.log('📂 Tareas cargadas:', data.todos.length);
      return data.todos;
    }
    
    return [];
  } catch (error) {
    console.error('❌ Error cargando:', error);
    return [];
  }
};

/* Elimina todas las tareas */
export const clearTodos = () => {
  try {
    localStorage.removeItem(STORAGE_KEY);
    console.log('🧹 Todas las tareas eliminadas');
    return true;
  } catch (error) {
    console.error('❌ Error eliminando:', error);
    return false;
  }
};