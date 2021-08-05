

import * as Curry from "bs-platform/lib/es6/curry.js";
import * as Js_exn from "bs-platform/lib/es6/js_exn.js";

global.Promise = require('bluebird')
;

Promise.config({
  warnings: false
})
;

function let_(p, cb) {
  return p.then(Curry.__1(cb));
}

function mapAsync(p, cb) {
  return p.then(function (a) {
              return Promise.resolve(Curry._1(cb, a));
            });
}

function async(a) {
  return Promise.resolve(a);
}

function catchAsync(p, cb) {
  return p.catch(Curry.__1(cb));
}

function asyncFromResult(result) {
  return mapAsync(Promise.resolve(result), (function (a) {
                if (a.TAG === /* Ok */0) {
                  return a._0;
                } else {
                  return Js_exn.raiseError(a._0);
                }
              }));
}

function attemptMapAsync(promise, attempter) {
  return mapAsync(promise, (function (a) {
                var b = Curry._1(attempter, a);
                if (b.TAG === /* Ok */0) {
                  return b._0;
                } else {
                  return Js_exn.raiseError(b._0);
                }
              }));
}

export {
  let_ ,
  mapAsync ,
  async ,
  catchAsync ,
  asyncFromResult ,
  attemptMapAsync ,
  
}
/*  Not a pure module */
