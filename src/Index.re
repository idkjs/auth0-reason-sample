open Env;
let window = [%bs.raw "window"];

ReactDOMRe.renderToElementWithId(
  <Auth0 domain clientId audience redirectUri=window##location##origin>
    <App />
  </Auth0>,
  "root",
);
