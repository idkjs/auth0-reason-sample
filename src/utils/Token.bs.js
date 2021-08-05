

import * as Belt_Option from "bs-platform/lib/es6/belt_Option.js";
import * as Caml_option from "bs-platform/lib/es6/caml_option.js";

function LocalStorage(K) {
  var key = K.key;
  var get = function (param) {
    return Caml_option.null_to_opt(localStorage.getItem(key));
  };
  var set = function (value) {
    localStorage.setItem(key, value);
    
  };
  var remove = function (param) {
    localStorage.removeItem(key);
    
  };
  return {
          key: key,
          get: get,
          set: set,
          remove: remove
        };
}

var key = "counters.session.token";

function get(param) {
  return Caml_option.null_to_opt(localStorage.getItem(key));
}

function set(value) {
  localStorage.setItem(key, value);
  
}

function remove(param) {
  localStorage.removeItem(key);
  
}

var Token = {
  key: key,
  get: get,
  set: set,
  remove: remove
};

function getToken(param) {
  return Caml_option.null_to_opt(localStorage.getItem(key));
}

var setToken = set;

function deleteToken(param) {
  localStorage.removeItem(key);
  
}

function isLoggedIn(param) {
  return Belt_Option.isSome(Caml_option.null_to_opt(localStorage.getItem(key)));
}

function resetStore(param) {
  localStorage.removeItem(key);
  
}

export {
  LocalStorage ,
  Token ,
  getToken ,
  setToken ,
  deleteToken ,
  isLoggedIn ,
  resetStore ,
  
}
/* No side effect */
