

import * as Curry from "bs-platform/lib/es6/curry.js";
import * as $$Promise from "reason-promise/src/js/promise.bs.js";
import * as Belt_Result from "bs-platform/lib/es6/belt_Result.js";

var Wrap = {
  let_: $$Promise.map
};

function let_(bsPromise, cb) {
  var promise = $$Promise.Js.toResult($$Promise.Js.fromBsPromise(bsPromise));
  return $$Promise.flatMap(promise, cb);
}

var Js = {
  let_: let_
};

function let_$1(bsPromise, cb) {
  var promise = $$Promise.Js.toResult($$Promise.Js.fromBsPromise(bsPromise));
  return $$Promise.flatMap(promise, (function (result) {
                return Curry._1(cb, Belt_Result.getExn(result));
              }));
}

var JsExn = {
  let_: let_$1
};

var let_$2 = $$Promise.flatMap;

export {
  let_$2 as let_,
  Wrap ,
  Js ,
  JsExn ,
  
}
/* Promise Not a pure module */
