'use strict';

var React = require("react");
var Js_exn = require("bs-platform/lib/js/js_exn.js");
var Reactstrap = require("reactstrap");
var Index = require("history/index");
var ReactRouterDom = require("react-router-dom");
var Auth0React = require("@auth0/auth0-react");
var Home$Auth0ReasonSample = require("./views/Home.bs.js");
var Footer$Auth0ReasonSample = require("./components/Footer.bs.js");
var NavBar$Auth0ReasonSample = require("./components/NavBar.bs.js");
var Loading$Auth0ReasonSample = require("./components/Loading.bs.js");
var Profile$Auth0ReasonSample = require("./views/Profile.bs.js");
var ExternalApi$Auth0ReasonSample = require("./views/ExternalApi.bs.js");
var InitFontAwesome$Auth0ReasonSample = require("./utils/InitFontAwesome.bs.js");

Index.createBrowserHistory();

((require('./App.css')));

InitFontAwesome$Auth0ReasonSample.init(undefined);

var raiseErrorAndReturn = Js_exn.raiseError;

function App(Props) {
  var match = Auth0React.useAuth0();
  var error = match.error;
  var err = error !== undefined;
  var oops = function (msg) {
    return React.createElement("div", undefined, "Oops..." + msg);
  };
  var loading = function (param) {
    return React.createElement(Loading$Auth0ReasonSample.make, {});
  };
  if (err) {
    Js_exn.raiseError(error.message);
    oops(error.message);
  }
  if (match.isLoading) {
    loading(undefined);
  }
  return React.createElement(ReactRouterDom.BrowserRouter, {
              history: undefined,
              children: React.createElement("div", {
                    className: "d-flex flex-column h-100",
                    id: "app"
                  }, React.createElement(NavBar$Auth0ReasonSample.make, {}), React.createElement(Reactstrap.Container, {
                        className: "flex-grow-1 mt-5",
                        children: React.createElement(ReactRouterDom.Switch, {
                              children: null
                            }, React.createElement(ReactRouterDom.Route, {
                                  path: "/",
                                  exact: true,
                                  component: Home$Auth0ReasonSample.make
                                }), React.createElement(ReactRouterDom.Route, {
                                  path: "/profile",
                                  component: Profile$Auth0ReasonSample.make
                                }), React.createElement(ReactRouterDom.Route, {
                                  path: "/external-api",
                                  component: ExternalApi$Auth0ReasonSample.make
                                }))
                      }), React.createElement(Footer$Auth0ReasonSample.make, {}))
            });
}

var history;

var make = App;

exports.history = history;
exports.raiseErrorAndReturn = raiseErrorAndReturn;
exports.make = make;
/*  Not a pure module */
