'use strict';

var React = require("react");
var ReactDOMRe = require("reason-react/src/legacy/ReactDOMRe.bs.js");
var Auth0React = require("@auth0/auth0-react");
var App$Auth0ReasonSample = require("./App.bs.js");

((require('./index.css')));

var $$window = window;

console.log(process.env.AUTH0_DOMAIN, process.env.AUTH0_CLIENT_ID, process.env.AUTH0_AUDIENCE, $$window.location.origin);

ReactDOMRe.renderToElementWithId(React.createElement(Auth0React.Auth0Provider, {
          domain: process.env.AUTH0_DOMAIN,
          clientId: process.env.AUTH0_CLIENT_ID,
          redirectUri: $$window.location.origin,
          audience: process.env.AUTH0_AUDIENCE,
          children: React.createElement(App$Auth0ReasonSample.make, {})
        }), "root");

if (
    "serviceWorker" in navigator &&
    !window.location.host.startsWith("localhost")
) {
    navigator.serviceWorker.register("/sw.js");
}
;

exports.$$window = $$window;
/*  Not a pure module */
