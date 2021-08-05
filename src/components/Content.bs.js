

import * as React from "react";
import * as Belt_Array from "bs-platform/lib/es6/belt_Array.js";
import * as Reactstrap from "reactstrap";
import * as ContentData$Auth0ReasonSample from "../utils/ContentData.bs.js";
import * as ReactFontawesome from "@fortawesome/react-fontawesome";
import * as FreeSolidSvgIcons from "@fortawesome/free-solid-svg-icons";

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

export {
  Col ,
  Row ,
  make ,
  
}
/* react Not a pure module */
