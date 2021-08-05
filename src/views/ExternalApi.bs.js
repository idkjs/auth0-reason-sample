

import * as Curry from "bs-platform/lib/es6/curry.js";
import * as Fetch from "bs-fetch/src/Fetch.bs.js";
import * as React from "react";
import * as $$Promise from "reason-promise/src/js/promise.bs.js";
import * as Caml_obj from "bs-platform/lib/es6/caml_obj.js";
import * as Reactstrap from "reactstrap";
import * as Auth0React from "@auth0/auth0-react";
import * as Utils$Auth0ReasonSample from "../utils/Utils.bs.js";
import * as Config$Auth0ReasonSample from "../config/Config.bs.js";
import * as Highlight$Auth0ReasonSample from "../components/Highlight.bs.js";

var initialState = {
  showResult: false,
  apiMessage: "",
  error: undefined
};

function ExternalApi(Props) {
  var match = React.useState(function () {
        return initialState;
      });
  var setState = match[1];
  var state = match[0];
  var match$1 = Auth0React.useAuth0();
  var getAccessTokenSilently = match$1.getAccessTokenSilently;
  var getAccessTokenWithPopup = match$1.getAccessTokenWithPopup;
  var loginWithPopup = match$1.loginWithPopup;
  var match$2 = Config$Auth0ReasonSample.getConfig(undefined);
  var audience = match$2.audience;
  var apiOrigin = match$2.apiOrigin;
  var audienceOpt = audience !== undefined ? audience : "";
  var url = apiOrigin !== undefined ? apiOrigin + "/api/external" : "http://localhost:3001/api/external";
  var options_audience = audienceOpt;
  var options = {
    audience: options_audience,
    scope: undefined,
    ignoreCache: undefined,
    redirect_uri: undefined,
    timeoutInSeconds: undefined
  };
  var callApi = function (param) {
    var token = Curry._1(getAccessTokenSilently, options);
    return $$Promise.map($$Promise.Js.toResult($$Promise.Js.fromBsPromise(fetch(url, Fetch.RequestInit.make(/* Get */0, {
                                  Authorization: token,
                                  "Content-Type": "application/json"
                                }, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined)(undefined)))), (function (response) {
                  if (response.TAG === /* Ok */0) {
                    if (response._0.ok) {
                      Curry._1(setState, (function (param) {
                              return {
                                      showResult: state.showResult,
                                      apiMessage: state.apiMessage,
                                      error: undefined
                                    };
                            }));
                      return {
                              TAG: /* Ok */0,
                              _0: undefined
                            };
                    } else {
                      return {
                              TAG: /* Error */1,
                              _0: undefined
                            };
                    }
                  }
                  var error = response._0;
                  Curry._1(setState, (function (param) {
                          return {
                                  showResult: state.showResult,
                                  apiMessage: state.apiMessage,
                                  error: error
                                };
                        }));
                  return {
                          TAG: /* Error */1,
                          _0: undefined
                        };
                }));
  };
  var handle = function (e, fn) {
    e.preventDefault();
    return Curry._1(fn, undefined);
  };
  var handleConsent = function (param) {
    Curry._1(getAccessTokenWithPopup, undefined).then(function (param) {
            Curry._1(setState, (function (param) {
                    return {
                            showResult: state.showResult,
                            apiMessage: state.apiMessage,
                            error: undefined
                          };
                  }));
            return Promise.resolve(undefined);
          }).catch(function (error) {
          Curry._1(setState, (function (param) {
                  return {
                          showResult: state.showResult,
                          apiMessage: state.apiMessage,
                          error: error
                        };
                }));
          return Promise.reject(error);
        });
    return callApi(undefined);
  };
  var handleLoginAgain = function (param) {
    Curry._1(loginWithPopup, undefined).then(function (param) {
            Curry._1(setState, (function (param) {
                    return {
                            showResult: state.showResult,
                            apiMessage: state.apiMessage,
                            error: undefined
                          };
                  }));
            return Promise.resolve(undefined);
          }).catch(function (error) {
          Curry._1(setState, (function (param) {
                  return {
                          showResult: state.showResult,
                          apiMessage: state.apiMessage,
                          error: error
                        };
                }));
          return Promise.reject(error);
        });
    return callApi(undefined);
  };
  return React.createElement(React.Fragment, undefined, React.createElement("div", {
                  className: "mb-5"
                }, Caml_obj.caml_equal(state.error, "consent_required") ? React.createElement(Reactstrap.Alert, {
                        color: "warning",
                        children: null
                      }, "You need to ...", React.createElement("a", {
                            className: "alert-link",
                            href: "#/",
                            onClick: (function (e) {
                                handle(e, handleConsent);
                                
                              })
                          }, "consent to get access to users api")) : null, Caml_obj.caml_equal(state.error, "login_required") ? React.createElement(Reactstrap.Alert, {
                        color: "warning",
                        children: null
                      }, "You need to ...", React.createElement("a", {
                            className: "alert-link",
                            href: "#/",
                            onClick: (function (e) {
                                handle(e, handleLoginAgain);
                                
                              })
                          }, "log in again")) : null, React.createElement("h1", undefined, "External API"), React.createElement("p", {
                      className: "lead"
                    }, "Ping an external API by clicking the button below."), React.createElement("p", undefined, "This will call a local API on port 3001 that would have been started\n            if you run <code>npm run dev</code>. An access token is sent as part\n            of the request's `Authorization` header and the API will validate it\n            using the API's audience value."), audience === undefined ? React.createElement(Reactstrap.Alert, {
                        color: "warning",
                        children: null
                      }, React.createElement("p", undefined, "You can't call the API at the moment because your application does\n                not have any configuration for <code>audience</code>, or it is\n                using the default value of <code>YOUR_API_IDENTIFIER</code>. You\n                might get this default value if you used the\n                 Download\n                 Sample\n\n                feature of ", React.createElement("a", {
                                href: "https://auth0.com/docs/quickstart/spa/react"
                              }, "the quickstart guide"), ", but have not set an API up in your Auth0 Tenant. You can find\n                out more information on", React.createElement("a", {
                                href: "https://auth0.com/docs/api"
                              }, "->React.string"), "in the\n                Auth0 Docs."), React.createElement("p", undefined, "The audience is the identifier of the API that you want to call\n                (see{}", React.createElement("a", {
                                href: "https://auth0.com/docs/get-started/dashboard/tenant-settings#api-authorization-settings"
                              }, "API Authorization Settings"), "{}", " for more info)."), React.createElement("p", undefined, "In this sample, you can configure the audience in a couple of\n                ways:"), React.createElement("ul", undefined, React.createElement("li", undefined, "in the", React.createElement("code", undefined, "src/index.js"), "file"), React.createElement("li", undefined, "by specifying it in the <code>auth_config.json</code> file (see\n                  the <code>auth_config.json.example</code> file for an example of\n                  where it should go)")), React.createElement("p", undefined, "Once you have configured the value for", React.createElement("code", undefined, "audience"), ",\n                please restart the app and try to use the\n                 Ping\n                 API\n                  button below.")) : null, React.createElement(Reactstrap.Button, {
                      color: "primary",
                      disabled: audience === undefined,
                      onClick: callApi,
                      className: "mt-5",
                      children: "Ping API"
                    })), React.createElement("div", {
                  className: "result-block-container"
                }, state.showResult ? React.createElement("div", {
                        className: "result-block"
                      }, React.createElement("h6", {
                            className: "muted"
                          }, "Result"), React.createElement(Highlight$Auth0ReasonSample.make, {
                            children: React.createElement("span", undefined, Utils$Auth0ReasonSample.stringify(state.apiMessage))
                          })) : null));
}

var make = ExternalApi;

export {
  initialState ,
  make ,
  
}
/* react Not a pure module */
