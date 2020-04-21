import React from 'react';
import './App.css';
import {  Route, Switch } from 'react-router-dom';
import PrivateRoute from './helpers/privateRoute'

import Home from './containers/home/Home'
import LoginForm from './components/login/LoginForm';
import PageNotFound from './components/pageNotFound/PageNotFound'

function App() {

  return (
    // <div className="App">
    //   <LoginForm />
    // </div>
    <main>
      <Switch>
          <PrivateRoute path='/' component={Home} exact />
          {/*<PrivateRoute path="/private1/:id?" exact component={PrivateComponent1}/>*/}
          <Route path='/login' component={LoginForm} />
          <Route component={PageNotFound} />

      </Switch>
    </main>
  );
}

export default App;
