type auth_config = {
  apiOrigin: string,
  domain: string,
  clientId: string,
  audience: option(string),
};

[@bs.module "/config.js"]
external getConfig: unit => auth_config = "getConfig";
