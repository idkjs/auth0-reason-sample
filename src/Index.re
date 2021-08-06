open Env;
[%bs.raw {|require('./index.css')|}];
let window = [%bs.raw "window"];
Js.log4(domain,clientId,audience,window##location##origin)
ReactDOMRe.renderToElementWithId(
  <Auth0Provider domain clientId audience redirectUri=window##location##origin>
    <App />
  </Auth0Provider>,
  "root",
);

%bs.raw
{|
if (
    "serviceWorker" in navigator &&
    !window.location.host.startsWith("localhost")
) {
    navigator.serviceWorker.register("/sw.js");
}
|};
