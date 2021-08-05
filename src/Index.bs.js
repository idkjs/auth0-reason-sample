

import * as React from "react";
import * as ReactDOMRe from "reason-react/src/legacy/ReactDOMRe.bs.js";
import * as Auth0React from "@auth0/auth0-react";
import * as App$Auth0ReasonSample from "./App.bs.js";

var $$window = window;

ReactDOMRe.renderToElementWithId(React.createElement(Auth0React.Auth0Provider, {
          domain: process.env.AUTH0_DOMAIN,
          clientId: process.env.AUTH0_CLIENT_ID,
          redirectUri: $$window.location.origin,
          audience: process.env.AUTH0_AUDIENCE,
          children: React.createElement(App$Auth0ReasonSample.make, {})
        }), "root");

export {
  $$window ,
  
}
/* window Not a pure module */
