'use strict';

var Curry = require("bs-platform/lib/js/curry.js");

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
          p,
          resolver.contents,
          rejecter.contents
        ];
}

function map(p, mapper) {
  return p.then(function (v) {
              return Promise.resolve(Curry._1(mapper, v));
            });
}

function flatMap(p, mapper) {
  return p.then(Curry.__1(mapper));
}

function $$catch(p, mapper) {
  return p.catch(Curry.__1(mapper));
}

function logOnRejection(p, logger) {
  return p.catch(function (err) {
              Curry._1(logger, err);
              var match = make(undefined);
              Curry._1(match[2], null);
              return match[0];
            });
}

function wrap(prim) {
  return Promise.resolve(prim);
}

function wait(p, waiter) {
  return map(p, Curry.__1(waiter));
}

function all(prim) {
  return Promise.all(prim);
}

function wrapOk(a) {
  return Promise.resolve({
              TAG: /* Ok */0,
              _0: a
            });
}

function wrapError(err) {
  return Promise.resolve({
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
                return Promise.resolve(v);
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
                return Promise.resolve(v);
              } else {
                return Curry._1(mapper, v._0);
              }
            });
}

function recover(p, recoverer) {
  return p.then(function (v) {
              if (v.TAG === /* Ok */0) {
                return Promise.resolve(v);
              } else {
                return Curry._1(recoverer, v._0);
              }
            });
}

var Result = {
  wrapOk: wrapOk,
  wrapError: wrapError,
  mapOk: mapOk,
  flatMapOk: flatMapOk,
  mapError: mapError,
  flatMapError: flatMapError,
  recover: recover
};

var Infix = {
  $less$$great: map,
  $great$great$eq: flatMap,
  $less$bang$great: logOnRejection,
  $less$$$great: mapOk,
  $less$bang$bang$great: mapError,
  $$$great$eq: flatMapOk,
  $bang$bang$great$eq: flatMapError,
  $neg$bang: $$catch,
  $neg$pipe: wait
};

var andThen = flatMap;

var let_ = flatMap;

exports.make = make;
exports.map = map;
exports.flatMap = flatMap;
exports.andThen = andThen;
exports.$$catch = $$catch;
exports.logOnRejection = logOnRejection;
exports.wrap = wrap;
exports.wait = wait;
exports.all = all;
exports.Result = Result;
exports.wrapOk = wrapOk;
exports.wrapError = wrapError;
exports.mapOk = mapOk;
exports.flatMapOk = flatMapOk;
exports.mapError = mapError;
exports.flatMapError = flatMapError;
exports.recover = recover;
exports.Infix = Infix;
exports.let_ = let_;
/* No side effect */
