'use strict';

var $$Promise = require("reason-promise/src/js/promise.bs.js");
var NodeFetch = require("node-fetch");

$$Promise.get($$Promise.flatMap(NodeFetch("https://raw.githubusercontent.com/aantron/promise/master/README.md"), (function (response) {
            return response.text();
          })), (function (body) {
        console.log(body);
        
      }));

/*  Not a pure module */
