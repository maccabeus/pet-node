/*
 @ This file will handle the login
 @ Author: Adeniyi Anthony
 @ email: mlisoftinc@gmail.com
 */
import React from "react";
import Register from "./Register";
import Dashboard from "../dashboard/Dashboard";


import {
    BrowserRouter as Router,
    Link,
} from "react-router-dom";

class Login extends React.Component {

    constructor(props) {
        super(props);
        const port=3000;
        this.state = {
            disabledButton: false,
            popUp: 'hidden',
            meetContState: 'hidden',
            loginFormState: 'visible',
            actionMsg: 'Logging in. Please wait...',
            actionUrl: `http://localhost:${port}/process/login`,
            indexPath: '/dashboard',
            registerPath: '/register',
            phpSelf: '/',
            styles: {
                formControl: "form-control",
                formButton: "form-button",
                formIbtn: "ibtn"
            }
        };
    }

    setPopUp = (state, wait = null) => {
        if (wait === null) {
            this.setState({popUp: state});
        } else {
            // wait for the stipulated time before taking action
            setTimeout(() => {
                this.setState({popUp: state});
            }, wait)
        }

    };
    disableButton = (state) => {
        this.setState({disabledButton: state});
    };

    setMessage = (msg) => {
        this.setState({actionMsg: msg});
    };

    loginAccount = () => {
        /*
         disable the button first
         */
        this.disableButton(true);
        /*
         * once this is completed, show the pop up indicating that we are logging in
         *
         */
        this.setPopUp('visible');
        /*
         * process the login
         */
        let err = false;

        const user = document.getElementById('user').value;
        const password = document.getElementById('password').value;

        const rnd = Math.random();

        if (password == "") {
            this.setMessage("Password cannot be empty");
            err = true;
        }
        if (user == "") {
            this.setMessage("Username cannot be empty");
            err = true;
        }

        if (err == true) {
            this.setPopUp('hidden', 2000);
            this.disableButton(false);
            return false;
        }

        this.setMessage(this.state.actionMsg)
        const postUrl = `${this.state.actionUrl}?user=${user}&password=${password}&rnd=${rnd}`;

        fetch(postUrl, {
            method:"get",
            mode:"cors",
            credentials:"include",

        })
            //.then((response) => response.json())
            .then((response) => {
                return (response.json());
                //return (response.text());
            })
            .then((responseJson) => {
                console.log(responseJson);
                const status = responseJson['status'];
                const msg = responseJson['msg'];
                if (status === true) {
                    this.setMessage(msg);
                    document.location = `${this.state.indexPath}?${status}`;
                } else {
                    // notify user of the login failure
                    //alert(msg);
                    this.setMessage(msg);
                    // hide popup screen after 5 seconds
                    this.setPopUp('hidden', 2000);
                    // re-enable login  button
                    this.disableButton(false);
                }
            });
    };

    formHtml = () => {
        const html =
            <div className="row">
                <div className="form-holder">
                    <div className="form-content">
                        <div className="form-items">
                            <h3>An amazing pet life </h3>
                            <p>Login to your account</p>
                            <div className="page-links">
                                <Link className="active"  id="link-to-login" to="/login">Login</Link>
                                <Link to="/register">Register</Link>
                                <Link style={{display:"none", visibility:"hidden"}} id="link-to-dashboard" to="/dashboard">Dashboard</Link>
                            </div>
                            <form id='login-form' onSubmit={(e) => {
                                e.preventDefault()
                            }}>
                                <div className="modal-backdrop" style={{visibility: this.state.popUp}}>
                                    <div className="modal-content modal_content">
                                        <div className="modal-body">
                                            <div className="loader06">
                                            </div>
                                            <div className="text-primary">{this.state.actionMsg}</div>
                                        </div>
                                        <div className="modal-footer">
                                            <button className="ibtn" type="button" onClick={() => {
                                                this.setPopUp('hidden');
                                                this.disableButton(false)
                                            }}>
                                                Close
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <input className={this.state.styles.formControl} type="text" name="user" id="user"
                                       placeholder="Username" required/>
                                <input className={this.state.styles.formControl} type="password" name="password"
                                       id="password" placeholder="Enter password" onKeyUp={(e) => {
                                    if (parseInt(e.keyCode) === 13)
                                        this.loginAccount()
                                }}/>
                                <div className={this.state.styles.formButton}>
                                    <button id="submit" type="button" className={this.state.styles.formIbtn}
                                            disabled={this.state.disabledButton}
                                            onClick={() => this.loginAccount()}>Login
                                    </button>
                                    <button className="ibtn" type="submit" id="meet-submit"
                                            style={{visibility: 'hidden'}}> Submit
                                    </button>
                                    <button id="meet-submit" type="submit" style={{visibility: 'hidden'}}></button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <form method="post" style={{display:"none", visibility:"hidden"}} id="dashboard-login-form" action="/dashboard/">
                    <input type="hidden" id="dashboard-login-token" defaultValue={false} />
                    <input type="submit" id="dashboard-login-button"/>
                </form>
            </div>

        return (html);
    };

    render() {
        return this.formHtml();
    }
}
export default Login;