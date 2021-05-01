import React from "react";
import { Route } from "react-router-dom";
import Login from "./Login";
import Profile from "./Profile";
import SignUP from "./Signup";


function Routes({ match }) {
    return (
        <>
            <Route exact path={match.url + "/signup"} component={SignUP}/>
            <Route exact path={match.url + "/login"} component={Login}/>
            <Route exact path={match.url + "/profile"} component={Profile}/>
        </>
    )
}

export default Routes;