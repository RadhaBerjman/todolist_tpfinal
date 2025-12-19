import 'bulma/css/bulma.min.css';
import './styles/global.css';
import './styles/custom.css';
import TodoList from './components/TodoList.jsx';

function App() {
  return ( 
    <div className="App"> 
      {/* HEADER */}
      <section className="hero is-primary is-small"> 
        <div className="hero-body py-4">
          <div className="container">
            <div className="has-text-centered">
              <h1 className="title is-size-3 has-text-white mb-2">
                📋 To Do List 😌💡
              </h1>
              <p className="subtitle is-size-6 has-text-white mb-3">
                Gestiona tus tareas de forma simple y eficaz.
              </p>
              <div className="tags are-medium is-centered">
                <span className="tag is-dark">React</span>
                <span className="tag is-dark">Bulma</span>
                <span className="tag is-dark">LocalStorage</span>
                <span className="tag is-dark">Responsive</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CONTENIDO PRINCIPAL */}
      <section className="section py-5">
        <div className="container">
          <div className="card">
            <div className="card-content p-4">
              <TodoList />
            </div>
          </div>
        </div>
      </section>
      
      {/* FOOTER */}
      <footer className="footer py-4">
        <div className="container has-text-centered">
          <div className="content">
            <p className="is-size-7 mb-1">
              <strong>To Do List App</strong> - Curso de Frontend - Ada ITW
            </p>
            <p className="is-size-7 has-text-grey">
              Desarrollado con 💖 por Radha con React + Bulma + Yarn 🤗
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;