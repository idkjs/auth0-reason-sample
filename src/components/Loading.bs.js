'use strict';

var React = require("react");

function Loading(Props) {
  return React.createElement("div", {
              className: "spinner"
            }, React.createElement("img", {
                  alt: "Loading",
                  src: "../assets/loading.svg"
                }));
}

var make = Loading;

exports.make = make;
/* react Not a pure module */
