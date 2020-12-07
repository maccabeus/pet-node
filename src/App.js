import React from "react";
import './assets/css/App.css';

import {
    BrowserRouter as Router,
    Route,
    Switch
} from "react-router-dom";

/* import all the application routes */
import Login from "./component/user/Login";
import Register from "./component/user/Register";
import Dashboard from "./component/dashboard/Dashboard";


function App() {
    return (
        <Router id="app" className="container-fluid">
                <Switch>
                    <Route exact path="/">
                        <Login/>
                    </Route>
                    <Route exact path="/login">
                        <Login/>
                    </Route>
                    <Route exact path="/register">
                        <Register/>
                    </Route>
                    <Route exact path="/dashboard">
                        <Dashboard/>
                    </Route>
                </Switch>
        </Router>
    );
}

export default App;