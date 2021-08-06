'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Bluebird = require("bluebird");
var Caml_option = require("bs-platform/lib/js/caml_option.js");
var Caml_exceptions = require("bs-platform/lib/js/caml_exceptions.js");

global.Promise = require('bluebird')
;

Promise.config({ warnings: false})
;

function toJs(prim) {
  return prim;
}

var Bluebird$1 = {
  toJs: toJs
};

function make(param) {
  var resolver = {
    contents: (function (prim) {
        
      })
  };
  var rejecter = {
    contents: (function (prim) {
        
      })
  };
  var p = new Promise((function (resolve, reject) {
          resolver.contents = (function (a) {
              return resolve(a);
            });
          rejecter.contents = (function (a) {
              return reject(a);
            });
          
        }));
  return [
          Bluebird.resolve(p),
          resolver.contents,
          rejecter.contents
        ];
}

function makeWithCallback(param) {
  var match = make(undefined);
  var reject = match[2];
  var resolve = match[1];
  var isFalsy = (function(a){return a ? true : false});
  var callback = function (err, result) {
    if (isFalsy(err)) {
      return Curry._1(reject, err);
    } else {
      return Curry._1(resolve, result);
    }
  };
  return [
          match[0],
          callback
        ];
}

function fromCallback(fn) {
  var match = makeWithCallback(undefined);
  Curry._1(fn, match[1]);
  return match[0];
}

function resolved(prim) {
  return Bluebird.resolve(prim);
}

function map(p, mapper) {
  return p.then(function (v) {
              return Bluebird.resolve(Curry._1(mapper, v));
            });
}

function tap(prim, prim$1) {
  return prim.tap(prim$1);
}

function tapCatch(prim, prim$1) {
  return prim.tapCatch(prim$1);
}

function flatMap(p, mapper) {
  return p.then(Curry.__1(mapper));
}

var PromiseRejected = /* @__PURE__ */Caml_exceptions.create("Pom-Auth0ReasonSample.PromiseRejected");

function recover(p, mapper) {
  return p.catch(function (e) {
              return Bluebird.resolve(Curry._1(mapper, e));
            });
}

function $$catch(p, mapper) {
  return p.catch(mapper);
}

function onError(p, effect) {
  return p.catch(function (err) {
              Curry._1(effect, err);
              throw {
                    RE_EXN_ID: PromiseRejected,
                    Error: new Error()
                  };
            });
}

function wait(p, waiter) {
  return map(p, Curry.__1(waiter));
}

function all(prim) {
  return Bluebird.all(prim);
}

function wrapOk(a) {
  return Bluebird.resolve({
              TAG: /* Ok */0,
              _0: a
            });
}

function wrapError(err) {
  return Bluebird.resolve({
              TAG: /* Error */1,
              _0: err
            });
}

function mapOk(p, mapper) {
  return map(p, (function (a) {
                if (a.TAG === /* Ok */0) {
                  return {
                          TAG: /* Ok */0,
                          _0: Curry._1(mapper, a._0)
                        };
                } else {
                  return a;
                }
              }));
}

function flatMapOk(p, mapper) {
  return p.then(function (v) {
              if (v.TAG === /* Ok */0) {
                return Curry._1(mapper, v._0);
              } else {
                return Bluebird.resolve(v);
              }
            });
}

function mapError(p, mapper) {
  return map(p, (function (r) {
                if (r.TAG === /* Ok */0) {
                  return r;
                } else {
                  return {
                          TAG: /* Error */1,
                          _0: Curry._1(mapper, r._0)
                        };
                }
              }));
}

function flatMapError(p, mapper) {
  return p.then(function (v) {
              if (v.TAG === /* Ok */0) {
                return Bluebird.resolve(v);
              } else {
                return Curry._1(mapper, v._0);
              }
            });
}

function recover$1(p, recoverer) {
  return p.then(function (v) {
              if (v.TAG === /* Ok */0) {
                return Bluebird.resolve(v);
              } else {
                return Curry._1(recoverer, v._0);
              }
            });
}

var WithError = {
  wrapOk: wrapOk,
  wrapError: wrapError,
  mapOk: mapOk,
  flatMapOk: flatMapOk,
  mapError: mapError,
  flatMapError: flatMapError,
  recover: recover$1
};

function fromJsPromise(prim) {
  return Bluebird.resolve(prim);
}

function optionify(p) {
  return map(p, (function (a) {
                return Caml_option.some(a);
              }));
}

var Infix = {
  $less$$great: map,
  $great$great$eq: flatMap,
  $less$bang$great: tapCatch
};

var Wrap = {
  let_: map
};

function let_(p, cb) {
  return p.then(Curry.__1(cb));
}

var AsJS = {
  let_: let_
};

function let_$1(p, cb) {
  p.then(Curry.__1(cb));
  
}

function let_$2(p, cb) {
  map(p, cb);
  
}

var Wrap$1 = {
  let_: let_$2
};

var Effect = {
  let_: let_$1,
  Wrap: Wrap$1
};

var toJsPromise = toJs;

var $less$$great = map;

var $great$great$eq = flatMap;

var $less$bang$great = tapCatch;

var let_$3 = flatMap;

exports.Bluebird = Bluebird$1;
exports.make = make;
exports.makeWithCallback = makeWithCallback;
exports.fromCallback = fromCallback;
exports.resolved = resolved;
exports.map = map;
exports.tap = tap;
exports.tapCatch = tapCatch;
exports.flatMap = flatMap;
exports.PromiseRejected = PromiseRejected;
exports.recover = recover;
exports.$$catch = $$catch;
exports.onError = onError;
exports.wait = wait;
exports.all = all;
exports.WithError = WithError;
exports.fromJsPromise = fromJsPromise;
exports.toJsPromise = toJsPromise;
exports.optionify = optionify;
exports.Infix = Infix;
exports.$less$$great = $less$$great;
exports.$great$great$eq = $great$great$eq;
exports.$less$bang$great = $less$bang$great;
exports.let_ = let_$3;
exports.Wrap = Wrap;
exports.AsJS = AsJS;
exports.Effect = Effect;
/*  Not a pure module */
