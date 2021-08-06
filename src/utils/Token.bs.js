'use strict';

var Belt_Option = require("bs-platform/lib/js/belt_Option.js");
var Caml_option = require("bs-platform/lib/js/caml_option.js");

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

exports.LocalStorage = LocalStorage;
exports.Token = Token;
exports.getToken = getToken;
exports.setToken = setToken;
exports.deleteToken = deleteToken;
exports.isLoggedIn = isLoggedIn;
exports.resetStore = resetStore;
/* No side effect */
