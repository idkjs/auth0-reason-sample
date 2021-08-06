'use strict';

var React = require("react");
var Belt_Array = require("bs-platform/lib/js/belt_Array.js");
var Reactstrap = require("reactstrap");
var ContentData$Auth0ReasonSample = require("../utils/ContentData.bs.js");
var ReactFontawesome = require("@fortawesome/react-fontawesome");
var FreeSolidSvgIcons = require("@fortawesome/free-solid-svg-icons");

function Content(Props) {
  return React.createElement("div", {
              className: "next-steps my-5"
            }, React.createElement("h2", {
                  className: "my-5 text-center"
                }, "What can I do next?"), React.createElement(Reactstrap.Row, {
                  className: "d-flex justify-content-between",
                  children: Belt_Array.mapWithIndex(ContentData$Auth0ReasonSample.contentData, (function (i, col) {
                          return React.createElement(Reactstrap.Col, {
                                      md: 5,
                                      className: "mb-4",
                                      children: null,
                                      key: String(i)
                                    }, React.createElement("h6", {
                                          className: "mb-3"
                                        }, React.createElement("a", {
                                              href: col.link
                                            }, React.createElement(ReactFontawesome.FontAwesomeIcon, {
                                                  icon: FreeSolidSvgIcons.faLink,
                                                  className: "mr-2"
                                                }), col.title)), React.createElement("p", undefined, col.description));
                        }))
                }));
}

var Col;

var Row;

var make = Content;

exports.Col = Col;
exports.Row = Row;
exports.make = make;
/* react Not a pure module */
