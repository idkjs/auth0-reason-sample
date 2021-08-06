[@bs.module "@auth0/auth0-react"] [@react.component]
external make:
  (
    ~domain: string,
    ~clientId: string,
    ~redirectUri: string,
    // ~scope: string,
    ~audience: string,
    // ~onRedirectCallback: (~returnTo: string) => unit,
    ~children: React.element
  ) =>
  React.element =
  "Auth0Provider";
