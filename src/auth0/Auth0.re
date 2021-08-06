type user = {
  name: string,
  email: string,
  picture: string,
};

type getTokenSilentlyOptions = {
  audience: option(string),
  scope: option(string),
  ignoreCache: option(bool),
  redirect_uri: option(string),
  timeoutInSeconds: option(int),
};

type idToken = {__raw: string};

type t = {
  loginWithRedirect: unit => Js.Promise.t(unit),
  loginWithPopup: unit => Js.Promise.t(unit),
  getAccessTokenWithPopup: unit => Js.Promise.t(unit),
  isAuthenticated: bool,
  isLoading: bool,
  error: option(Js.Exn.t),
  logout: (~returnTo: string=?) => unit,
  user,
  getAccessTokenSilently: option(getTokenSilentlyOptions) => Js.Promise.t(string),
  getIdTokenClaims: unit => Js.Promise.t(idToken),
};

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

[@bs.module "@auth0/auth0-react"] external useAuth0: unit => t = "useAuth0";
