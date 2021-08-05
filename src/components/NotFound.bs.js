

import * as React from "react";

function NotFound(Props) {
  return React.createElement("div", {
              className: "notfound"
            }, React.createElement("span", undefined, "NOT FOUND"));
}

var make = NotFound;

export {
  make ,
  
}
/* react Not a pure module */
