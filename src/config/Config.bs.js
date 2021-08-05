

import * as Auth_configJson from "./auth_config.json";

var configJson = Auth_configJson;

function getConfig(param) {
  var audience = configJson.audience !== "YOUR_API_IDENTIFIER" ? configJson.audience : undefined;
  return {
          apiOrigin: undefined,
          domain: configJson.domain,
          clientId: configJson.clientId,
          audience: audience
        };
}

export {
  configJson ,
  getConfig ,
  
}
/* configJson Not a pure module */
