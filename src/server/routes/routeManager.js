const express = require("express");
const routeManager = express.Router();
const Utils = require ("./../lib/Utils");

/* bring in all the necessary routes for our app navigation */
const login = require("./login");
const logout = require("./logout");
const register = require("./register");
const subscriptions = require("./sub");
const subscriptionsDelete = require("./sub-delete");
const subscriptionsList = require("./sub-list");
const channelList = require("./channel-list");
const LoginValidate = require("./login-validate");

const returnFunction=()=> {
    Utils.buildResponse(true, Utils.buildPath("logout"));
}

routeManager.get("/", (req, res, next) => {
    // do nothing
});

routeManager.get("/dashboard", (req, res, next) => {
    // do nothing
    res.send("dashboard here")
});

routeManager.get(Utils.buildPath("login"), (req, res, next) => {
    login(req, res, next);
});

routeManager.get(Utils.buildPath("logout"), (req, res, next) => {
    logout(req, res, next);
});

routeManager.get(Utils.buildPath("register"), (req, res, next) => {
    register(req, res, next);
});

routeManager.get(Utils.buildPath("sub"), (req, res, next) => {
    subscriptions(req, res, next);
});

routeManager.get(Utils.buildPath("sub-list"), (req, res, next) => {
    subscriptionsList(req, res, next);
});

routeManager.get(Utils.buildPath("sub-delete"), (req, res, next) => {
    subscriptionsDelete(req, res, next);
});

routeManager.get(Utils.buildPath("channel-list"), (req, res, next) => {
    channelList(req, res, next);
});

routeManager.get(Utils.buildPath("login-validate"), (req, res, next) => {
    LoginValidate(req, res, next);
});


// handle  404
/*
routeManager.get((req, res, next) => {
    // implement 404 handling here
})

 */

module.exports = routeManager;
