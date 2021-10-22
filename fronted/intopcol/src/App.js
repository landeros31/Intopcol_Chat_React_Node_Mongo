import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

function App() {
  return (
    
    <Router>
        <Switch>

            <Route path='/login'>
                <h1>esta en el login</h1>
            </Route>

           <Route path='/singup'>
              <h1>esta en el registro</h1>
            </Route>

            <Route path='/chat'>
              <h1>estas en el chat</h1>
            </Route>

            <Route path='/'>
              <h1>estas en la pagina de inicio</h1>
            </Route>
        </Switch>
    </Router>


  );
}

export default App;