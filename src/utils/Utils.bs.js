'use strict';


function stringify(str) {
  return JSON.stringify(str, null, 2);
}

exports.stringify = stringify;
/* No side effect */
