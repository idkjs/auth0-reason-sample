

import * as React from "react";

function Hero(Props) {
  return React.createElement("div", {
              className: "text-center hero my-5"
            }, React.createElement("img", {
                  className: "mb-3 app-logo",
                  alt: "React logo",
                  src: "../assets/logo.svg",
                  width: "120"
                }), React.createElement("h1", {
                  className: "mb-4"
                }, "React.js Sample Project"), React.createElement("p", {
                  className: "lead"
                }, "This is a sample application that demonstrates an authentication flow for\n      an SPA, using", React.createElement("a", {
                      href: "https://reactjs.org"
                    }, "React.js")));
}

var make = Hero;

export {
  make ,
  
}
/* react Not a pure module */
