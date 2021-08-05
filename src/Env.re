[@bs.val] external domain: string = "process.env.AUTH0_DOMAIN";
[@bs.val] external clientId: string = "process.env.AUTH0_CLIENT_ID";
[@bs.val] external audience: string = "process.env.AUTH0_AUDIENCE";
[@bs.val] external apiUrl: string = "process.env.API_URL";
Js.log4(domain, clientId, audience, apiUrl)
