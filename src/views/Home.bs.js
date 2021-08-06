'use strict';

var React = require("react");
var Hero$Auth0ReasonSample = require("../components/Hero.bs.js");
var Content$Auth0ReasonSample = require("../components/Content.bs.js");

function Home(Props) {
  return React.createElement(React.Fragment, undefined, React.createElement(Hero$Auth0ReasonSample.make, {}), React.createElement("hr", undefined), React.createElement(Content$Auth0ReasonSample.make, {}));
}

var make = Home;

exports.make = make;
/* react Not a pure module */
