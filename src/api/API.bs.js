'use strict';

var Fetch = require("bs-fetch/src/Fetch.bs.js");
var Js_dict = require("bs-platform/lib/js/js_dict.js");
var Js_json = require("bs-platform/lib/js/js_json.js");
var $$Promise = require("reason-promise/src/js/promise.bs.js");
var Belt_Option = require("bs-platform/lib/js/belt_Option.js");
var Belt_Result = require("bs-platform/lib/js/belt_Result.js");
var Caml_option = require("bs-platform/lib/js/caml_option.js");
var Json_decode = require("@glennsl/bs-json/src/Json_decode.bs.js");
var Constants$Auth0ReasonSample = require("../utils/Constants.bs.js");
var RePromise$Auth0ReasonSample = require("../utils/RePromise.bs.js");
var UserStore$Auth0ReasonSample = require("./UserStore.bs.js");

var redirectUrl = Constants$Auth0ReasonSample.clientUrl + "/oauth/callback";

function login(code) {
  return RePromise$Auth0ReasonSample.Js.let_(fetch(Constants$Auth0ReasonSample.serverUrl + "/login", Fetch.RequestInit.make(/* Post */2, {
                        "Content-Type": "application/json"
                      }, Caml_option.some(JSON.stringify(Js_dict.fromArray([[
                                      "code",
                                      code
                                    ]]))), undefined, undefined, /* CORS */3, undefined, undefined, undefined, undefined, undefined, undefined)(undefined)), (function (response) {
                return RePromise$Auth0ReasonSample.Js.let_(Belt_Result.getExn(response).json(), (function (json) {
                              var jsonDict = Belt_Option.getExn(Js_json.decodeObject(Belt_Result.getExn(json)));
                              var sessionId = Belt_Option.getExn(Js_json.decodeString(jsonDict["sessionId"]));
                              localStorage.setItem("sessionId", sessionId);
                              var accessToken = Belt_Option.getExn(Js_json.decodeString(jsonDict["accessToken"]));
                              var userId = Belt_Option.getExn(Js_json.decodeString(jsonDict["userId"]));
                              var anonymous = Belt_Option.getExn(Js_json.decodeBoolean(jsonDict["anonymous"]));
                              UserStore$Auth0ReasonSample.login(sessionId, accessToken, userId, anonymous);
                              return $$Promise.resolved(accessToken);
                            }));
              }));
}

function logout(param) {
  var sessionId = UserStore$Auth0ReasonSample.getSessionId(undefined);
  if (sessionId !== undefined) {
    RePromise$Auth0ReasonSample.Js.let_(fetch(Constants$Auth0ReasonSample.serverUrl + "/logout", Fetch.RequestInit.make(/* Post */2, {
                    Authorization: sessionId
                  }, undefined, undefined, undefined, /* CORS */3, undefined, undefined, undefined, undefined, undefined, undefined)(undefined)), (function (_response) {
            return $$Promise.resolved(undefined);
          }));
  } else {
    $$Promise.resolved(undefined);
  }
  localStorage.removeItem("sessionId");
  return UserStore$Auth0ReasonSample.logout(undefined);
}

function fetchUser(param) {
  var sessionId = UserStore$Auth0ReasonSample.getSessionId(undefined);
  if (sessionId !== undefined) {
    return RePromise$Auth0ReasonSample.Js.let_(fetch(Constants$Auth0ReasonSample.serverUrl + "/user", Fetch.RequestInit.make(/* Get */0, {
                          Authorization: sessionId
                        }, undefined, undefined, undefined, /* CORS */3, undefined, undefined, undefined, undefined, undefined, undefined)(undefined)), (function (response) {
                  if (response.TAG === /* Ok */0) {
                    var response$1 = response._0;
                    var status = response$1.status;
                    if (status === 200) {
                      return RePromise$Auth0ReasonSample.Js.let_(response$1.json(), (function (json) {
                                    var json$1 = Belt_Result.getExn(json);
                                    var userId = Json_decode.field("userId", Json_decode.string, json$1);
                                    var accessToken = Json_decode.field("accessToken", Json_decode.string, json$1);
                                    var anonymous = Json_decode.field("anonymous", Json_decode.bool, json$1);
                                    UserStore$Auth0ReasonSample.updateUser({
                                          id: userId,
                                          accessToken: accessToken,
                                          anonymous: anonymous
                                        });
                                    return $$Promise.resolved(undefined);
                                  }));
                    } else {
                      UserStore$Auth0ReasonSample.fetchFail(undefined);
                      return $$Promise.resolved(undefined);
                    }
                  }
                  UserStore$Auth0ReasonSample.fetchFail(undefined);
                  return $$Promise.resolved(undefined);
                }));
  } else {
    UserStore$Auth0ReasonSample.fetchFail(undefined);
    return $$Promise.resolved(undefined);
  }
}

exports.redirectUrl = redirectUrl;
exports.login = login;
exports.logout = logout;
exports.fetchUser = fetchUser;
/* Promise Not a pure module */
