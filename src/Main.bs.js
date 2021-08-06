'use strict';

var React = require("react");
var $$Promise = require("reason-promise/src/js/promise.bs.js");
var Caml_array = require("bs-platform/lib/js/caml_array.js");
var Belt_Option = require("bs-platform/lib/js/belt_Option.js");
var Caml_option = require("bs-platform/lib/js/caml_option.js");
var ReactAtmosphere = require("react-atmosphere");
var ReasonReactRouter = require("reason-react/src/ReasonReactRouter.bs.js");
var API$Auth0ReasonSample = require("./api/API.bs.js");
var Home$Auth0ReasonSample = require("./views/Home.bs.js");
var RePromise$Auth0ReasonSample = require("./utils/RePromise.bs.js");

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

exports.make = make;
/* react Not a pure module */
