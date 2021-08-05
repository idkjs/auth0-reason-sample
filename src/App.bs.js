

import * as React from "react";
import * as Js_exn from "bs-platform/lib/es6/js_exn.js";
import * as ReasonReactRouter from "reason-react/src/ReasonReactRouter.bs.js";
import * as Auth0React from "@auth0/auth0-react";
import * as Hooks$Auth0ReasonSample from "./utils/Hooks.bs.js";
import * as Loading$Auth0ReasonSample from "./components/Loading.bs.js";
import * as Constants$Auth0ReasonSample from "./utils/Constants.bs.js";

var raiseErrorAndReturn = Js_exn.raiseError;

function App(Props) {
  ReasonReactRouter.useUrl(undefined, undefined);
  Hooks$Auth0ReasonSample.useSessionStorage(Constants$Auth0ReasonSample.sessionPageId);
  Auth0React.useAuth0();
  return React.createElement(Loading$Auth0ReasonSample.make, {});
}

var make = App;

export {
  raiseErrorAndReturn ,
  make ,
  
}
/* react Not a pure module */
