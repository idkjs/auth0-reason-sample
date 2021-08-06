'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var $$Promise = require("reason-promise/src/js/promise.bs.js");
var Belt_Result = require("bs-platform/lib/js/belt_Result.js");

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

exports.let_ = let_$2;
exports.Wrap = Wrap;
exports.Js = Js;
exports.JsExn = JsExn;
/* Promise Not a pure module */
