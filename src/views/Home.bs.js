

import * as React from "react";
import * as Hero$Auth0ReasonSample from "../components/Hero.bs.js";
import * as Content$Auth0ReasonSample from "../components/Content.bs.js";

function Home(Props) {
  return React.createElement(React.Fragment, undefined, React.createElement(Hero$Auth0ReasonSample.make, {}), React.createElement("hr", undefined), React.createElement(Content$Auth0ReasonSample.make, {}));
}

var make = Home;

export {
  make ,
  
}
/* react Not a pure module */
