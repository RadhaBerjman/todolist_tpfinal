// src/App.jsx
import 'bulma/css/bulma.min.css';
import './styles/global.css';
import './styles/custom.css';
import TodoList from './components/TodoList.jsx';

function App() {
  return (
    <div className="App">
      <section className="hero is-primary is-medium">
        <div className="hero-body">
          <div className="container">
            <div className="has-text-centered">
              <h1 className="title is-size-1 has-text-white mb-3">
                📋 To Do List 🤗
              </h1>
              <p className="subtitle has-text-white">
                Gestiona tus tareas de forma simple y eficiente.
              </p>
              <div className="tags are-medium">
                <span className="tag is-light">React</span>
                <span className="tag is-light">Bulma</span>
                <span className="tag is-light">LocalStorage</span>
                <span className="tag is-light">Responsive</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <section className="section">
        <div className="container">
          <div className="card shadow-lg">
            <div className="card-content p-5">
              <TodoList />
            </div>
          </div>
        </div>
      </section>
      
      <footer className="footer">
        <div className="container has-text-centered">
          <div className="content">
            <p>
              <strong>To Do List App</strong> 
              <br />
              Curso de React - Ada ITW
            </p>
            <p className="is-size-7 mt-2 has-text-grey">
              Desarrollado con ❤️ usando React + Bulma + Yarn
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;