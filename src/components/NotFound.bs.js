'use strict';

var React = require("react");

function NotFound(Props) {
  return React.createElement("div", {
              className: "notfound"
            }, React.createElement("span", undefined, "NOT FOUND"));
}

var make = NotFound;

exports.make = make;
/* react Not a pure module */
