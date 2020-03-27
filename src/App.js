import React from "react";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import PizzaForm from './components/PizzaForm';
import Home from './components/Home';

const App = () => {
  return (
    <>
    <Router>
      <head>
        <h1>Lambda Eats</h1>
      </head>

      <Switch>
        <Route path ="/pizza">
            <PizzaForm/>
        </Route>

        <Route path ="/">
          <Home/>
        </Route>
      </Switch>

      </Router>
    </>
  );
};
export default App;
