'use strict';

var React = require("react");

function Footer(Props) {
  return React.createElement("footer", {
              className: "bg-light p-3 text-center"
            }, React.createElement("div", {
                  className: "logo"
                }), React.createElement("p", undefined, "Sample project provided by ", React.createElement("a", {
                      href: "https://auth0.com"
                    }, "Auth0")));
}

var make = Footer;

exports.make = make;
/* react Not a pure module */
