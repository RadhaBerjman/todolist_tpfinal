import "./styles/global.css";
import 'bulma/css/bulma.min.css';
import './styles/custom.css';

function App() {
  return (
    <div className="App">
      <section className="section">
        <div className="container">
          <h1 className="title is-1 has-text-centered has-text-primary">
            📝 My To do List
            </h1>
            <p className="subtitle has-text-centered">
              ¡Organiza tus tareas diarias de manera fácil y rápida!
            </p>
            {/* Mi componente de lista de tareas */}
            <div className="box">
              {/* Componente de la lista de tareas */}
              <p className="has-text-centered"> 
                
              </p>
            </div>
        </div>
      </section>
    </div>
  );
}

export default App;
