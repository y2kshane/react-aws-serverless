import React, { Fragment } from "react";
import PrivateRoute from "../libs/privateRoute";

import Home from "../containers/home/Home";
import { Route, Switch } from "react-router-dom";
import LoginForm from "../containers/login/LoginForm";
import ConfirmUser from "../containers/confirmUser/ConfirmUser";
import UserRegistration from "../containers/register/UserRegistration";
import PageNotFound from "../components/pageNotFound/PageNotFound";

const routes = (
  <Fragment>
    <Switch>
      <PrivateRoute path="/" component={Home} exact />
      {/*<PrivateRoute path="/private1/:id?" exact component={PrivateComponent1}/>*/}
      <Route path="/login" component={LoginForm} />
      <Route path="/resetPassword" component={LoginForm} />
      <Route path="/confirmUser" component={ConfirmUser} />
      <Route path="/register" component={UserRegistration} />
      <Route component={PageNotFound} />
    </Switch>
  </Fragment>
);

export default routes;
