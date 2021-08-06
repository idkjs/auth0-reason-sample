'use strict';


function toString(err) {
  if (err) {
    return "" + err._0 + " error";
  } else {
    return "Unknown error";
  }
}

exports.toString = toString;
/* No side effect */
