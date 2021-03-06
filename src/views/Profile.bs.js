'use strict';

var React = require("react");
var Reactstrap = require("reactstrap");
var Auth0React = require("@auth0/auth0-react");
var Highlight$Auth0ReasonSample = require("../components/Highlight.bs.js");

function stringify(str) {
  return JSON.stringify(str, null, 2);
}

function Profile(Props) {
  var match = Auth0React.useAuth0();
  var user = match.user;
  return React.createElement(Reactstrap.Container, {
              className: "mb-5",
              children: null
            }, React.createElement(Reactstrap.Row, {
                  className: "align-items-center profile-header mb-5 text-center text-md-left",
                  children: null
                }, React.createElement(Reactstrap.Col, {
                      md: 2,
                      children: React.createElement("img", {
                            className: "rounded-circle img-fluid profile-picture mb-3 mb-md-0",
                            alt: "Profile",
                            src: user.picture
                          })
                    }), React.createElement(Reactstrap.Col, {
                      md: true,
                      children: null
                    }, React.createElement("h2", undefined, user.name), React.createElement("p", {
                          className: "lead text-muted"
                        }, user.email))), React.createElement(Reactstrap.Row, {
                  children: React.createElement(Highlight$Auth0ReasonSample.make, {
                        children: JSON.stringify(user, null, 2)
                      })
                }));
}

var make = Profile;

exports.stringify = stringify;
exports.make = make;
/* react Not a pure module */
