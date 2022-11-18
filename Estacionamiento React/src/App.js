import {BrowserRouter, BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import './App.css';
import Login from './Paginas/Login.js'
import BarradeNavegacion from './Componentes/BarradeNavegacion.js'
import UserContext from './Context/UserContext.js'


function App() {
  return (
    <div className="App">
      <BarradeNavegacion/>
      <Login/>
    </div>
  );
}

export default App;
