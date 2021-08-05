type auth_config = {
  apiOrigin: option(string),
  domain: string,
  clientId: string,
  audience: option(string),
};
// type configJson = {
//   domain: string,
//   clientId: string,
//   audience: option(string),
// };
[@bs.module] external configJson: Js.t('a) = "./auth_config.json";
// [@bs.module "/config.js"]
// external getConfig: unit => auth_config = "getConfig";

let getConfig = () => {
  // Configure the audience here. By default, it will take whatever is in the config
  // (specified by the `audience` key) unless it's the default value of "YOUR_API_IDENTIFIER" (which
  // is what you get sometimes by using the Auth0 sample download tool from the quickstart page, if you
  // don't have an API).
  // If this resolves to `null`, the API page changes to show some helpful info about what to do
  // with the audience.
  let audience =
    configJson##audience !== "YOUR_API_IDENTIFIER"
      ? configJson##audience : None;

  {apiOrigin:None,domain: configJson##domain, clientId: configJson##clientId, audience};
};
