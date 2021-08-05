

import * as React from "react";
import * as $$Promise from "reason-promise/src/js/promise.bs.js";
import * as Caml_array from "bs-platform/lib/es6/caml_array.js";
import * as Belt_Option from "bs-platform/lib/es6/belt_Option.js";
import * as Caml_option from "bs-platform/lib/es6/caml_option.js";
import * as ReactAtmosphere from "react-atmosphere";
import * as ReasonReactRouter from "reason-react/src/ReasonReactRouter.bs.js";
import * as API$Auth0ReasonSample from "./api/API.bs.js";
import * as Home$Auth0ReasonSample from "./views/Home.bs.js";
import * as RePromise$Auth0ReasonSample from "./utils/RePromise.bs.js";

function Main(Props) {
  var url = ReasonReactRouter.useUrl(undefined, undefined);
  React.useEffect((function () {
          var match = url.path;
          if (match && match.hd === "oauth") {
            var match$1 = match.tl;
            if (match$1 && match$1.hd === "callback" && !match$1.tl) {
              var components = url.search.split("&").map(function (component) {
                    return component.split("=");
                  });
              var code = Caml_array.get(Belt_Option.getExn(Caml_option.undefined_to_opt(components.find(function (component) {
                                return Caml_array.get(component, 0) === "code";
                              }))), 1);
              var state = Caml_array.get(Belt_Option.getExn(Caml_option.undefined_to_opt(components.find(function (component) {
                                return Caml_array.get(component, 0) === "state";
                              }))), 1);
              RePromise$Auth0ReasonSample.let_(API$Auth0ReasonSample.login(code), (function (accessToken) {
                      ReasonReactRouter.replace("/" + decodeURIComponent(state));
                      return $$Promise.resolved(accessToken);
                    }));
            } else {
              API$Auth0ReasonSample.fetchUser(undefined);
            }
          } else {
            API$Auth0ReasonSample.fetchUser(undefined);
          }
          
        }), [url]);
  var match = url.path;
  return React.createElement("div", undefined, match ? null : React.createElement(Home$Auth0ReasonSample.make, {}), React.createElement(ReactAtmosphere.LayerContainer, {}));
}

var make = Main;

export {
  make ,
  
}
/* react Not a pure module */
