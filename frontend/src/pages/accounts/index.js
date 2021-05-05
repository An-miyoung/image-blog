import React from "react";
import { Route } from "react-router-dom";
import Login from "./Login";
import Profile from "./Profile";
import Signup from "./Signup";
import LoginRequiredRoute from "utils/LoginRequiredRoute";


function Routes({ match }) {
    return (
        <>
            <Route exact path={match.url + "/signup"} component={Signup}/>
            <Route exact path={match.url + "/login"} component={Login}/>
            <LoginRequiredRoute exact path={match.url + "/profile"} component={Profile}/>
        </>
    )
}

export default Routes;