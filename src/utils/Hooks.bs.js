'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var React = require("react");
var Belt_Option = require("bs-platform/lib/js/belt_Option.js");
var Caml_option = require("bs-platform/lib/js/caml_option.js");

function _useStorage(storage, key) {
  var match = React.useState(function () {
        return Caml_option.null_to_opt(storage.getItem(key));
      });
  var setValue = match[1];
  var value = match[0];
  var setItem = function (newValue) {
    Curry._1(setValue, (function (param) {
            return newValue;
          }));
    return function (param) {
      param.setItem(key, newValue);
      
    };
  };
  React.useEffect((function () {
          return (function (param) {
                    storage.setItem(key, Belt_Option.getWithDefault(value, ""));
                    
                  });
        }), [value]);
  return [
          value,
          setItem
        ];
}

var partial_arg = localStorage;

function useLocalStorage(param) {
  return _useStorage(partial_arg, param);
}

var partial_arg$1 = sessionStorage;

function useSessionStorage(param) {
  return _useStorage(partial_arg$1, param);
}

exports._useStorage = _useStorage;
exports.useLocalStorage = useLocalStorage;
exports.useSessionStorage = useSessionStorage;
/* partial_arg Not a pure module */
