

import * as React from "react";

function Loading(Props) {
  return React.createElement("div", {
              className: "spinner"
            }, React.createElement("img", {
                  alt: "Loading",
                  src: "../assets/loading.svg"
                }));
}

var make = Loading;

export {
  make ,
  
}
/* react Not a pure module */
