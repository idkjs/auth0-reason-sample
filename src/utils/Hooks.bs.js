

import * as Curry from "bs-platform/lib/es6/curry.js";
import * as React from "react";
import * as Belt_Option from "bs-platform/lib/es6/belt_Option.js";
import * as Caml_option from "bs-platform/lib/es6/caml_option.js";

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

export {
  _useStorage ,
  useLocalStorage ,
  useSessionStorage ,
  
}
/* partial_arg Not a pure module */
