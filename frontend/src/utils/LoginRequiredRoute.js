import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAppContext } from "store";

export default function LoginRequiredRoute({ component: Component, ...kwargs}) {
    const { store: {IsAuthenticated} } = useAppContext();

    return (
        <Route {...kwargs} render={
            props => {
                if ( IsAuthenticated ) {
                    return < Component {...props} />
                }
                else {
                    return (
                        < Redirect to={
                            { pathname: "/accounts/login", 
                            state: { from: props.location }}} 
                        />
                    );
                }
            }
        } />
    );
}