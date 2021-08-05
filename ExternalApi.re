type state = {
  showResult: bool,
  apiMessage: string,
  error: option(string),
};
open Async;
type response;

[@bs.module]
external fetch: string => Promise.t(response) = "node-fetch";

[@bs.send]
external text: response => Promise.t(string) = "text";
let initialState = {showResult: false, apiMessage: "", error: None};
// open Config;
open BsReactstrap;
[@react.component]
let make = () => {
  let (state, setState) = React.useState(_ => initialState);

  let Auth0.{
        getAccessTokenSilently,
        loginWithPopup,
        getAccessTokenWithPopup,
        _,
      } =
    Auth0.useAuth0();
  let Config.{apiOrigin, audience, _} = Config.getConfig();
  let audience =
    switch (audience) {
    | Some(audience) => audience
    | None => ""
    };
  let url =
    switch (apiOrigin) {
    | Some(apiOrigin) => apiOrigin ++ "/api/external"
    | None => "http://localhost:3001" ++ "/api/external"
    };
  let options: Auth0.getTokenSilentlyOptions = {
    audience: Some(audience),
    scope: None,
    ignoreCache: None,
    redirect_uri: None,
    timeoutInSeconds: None,
  };
  // let login = code => {
  //   let%RePromise.Js token = getAccessTokenSilently(Some(options));
  //   let%RePromise.Js response =
  //     Fetch.fetchWithInit(
  //       url,
  //       Fetch.RequestInit.make(
  //         ~method_=Get,
  //         ~body=
  //           Fetch.BodyInit.make(
  //             Js.Json.stringify(
  //               Js.Json.object_(
  //                 Js.Dict.fromArray([|("code", Js.Json.string(code))|]),
  //               ),
  //             ),
  //           ),
  //         ~headers=
  //           Fetch.HeadersInit.make({
  //             "Authorization": token,
  //             "Content-Type": "application/json",
  //           }),
  //         ~mode=CORS,
  //         (),
  //       ),
  //     );
  // let p = getAccessTokenSilently(None)
//   let ( getAccessTokenSilently, resolve) = Promise.pending();
// Js.log(getAccessTokenSilently);
// let getToken = (): Js.Promise.t(string) =>getAccessTokenSilently;
// let token = getAccessTokenSilently
// ->Promise.map(s => s)
// ->Promise.resolved;
// let token:string = resolve()
// ->Promise.get(Js.log);

// resolve("Hello");
// Js.log(p);
// let () =
//   getAccessTokenSilently(None)
//   ->Promise.map(response => response)
//   ->Promise.get(body => Js.log(body));
//   let getStringAsync = () => {
//   getAccessTokenSilently(None)
//  ->Promise.flatMap(response => text(response));
// }
let x = token => Fetch.fetchWithInit(
          url,
          Fetch.RequestInit.make(
            ~method_=Get,
            ~headers=
              Fetch.HeadersInit.make({
                "Authorization": token,
                "Content-Type": "application/json",
              }),
            (),
          ),
        )
  ->Promise.Js.fromBsPromise
  ->Promise.Js.toResult
  ->Promise.map(response =>
      switch (response) {
      | Ok(response') =>
        if (Fetch.Response.ok(response')) {
           setState(_ => {...state, error: None});
          Ok();
        } else {
          Error();
        }
      | Error(error) =>
            setState(_ => {...state, error: Obj.magic(error)});
        // Js.log3("Error from ", endpoint, e);
        Error();
      }
    );
    let callApi = () => {
      let getToken = (): Js.Promise.t(string) =>getAccessTokenSilently(None);
  getToken()
      ->Promise.Js.fromBsPromise
      ->Promise.Js.toResult
      ->Promise.map(token =>
          switch (token) {
          | Ok(token) => expect(Obj.magic(x)) |> toBe("some initial data")
          | Error(x) => expect(Obj.magic(x)) |> toBe("some initial data")
          }
        )
      ->Promise.Js.toBsPromise
      let%RePromise.Js token = getAccessTokenSilently(Some(options));
      let%RePromise.Js response =
        Fetch.fetchWithInit(
          url,
          Fetch.RequestInit.make(
            ~method_=Get,
            ~headers=
              Fetch.HeadersInit.make({
                "Authorization": token,
                "Content-Type": "application/json",
              }),
            (),
          ),
        );
        open Belt;
         let%RePromise.Js json = Fetch.Response.json(Result.getExn(response));
  json
  ->Result.getExn
  ->Js.Json.decodeObject
  ->Option.getExn
  ->Js.Dict.unsafeGet("id")
  ->Js.Json.decodeString
  ->Option.getExn
  ->Promise.resolved;
      // Promise.resolved(response);
    };
    let callApi = () => {
      let%RePromise.Js token = getAccessTokenSilently(Some(options));
      let%RePromise.Js response =
        Fetch.fetchWithInit(
          url,
          Fetch.RequestInit.make(
            ~method_=Get,
            ~headers=
              Fetch.HeadersInit.make({
                "Authorization": token,
                "Content-Type": "application/json",
              }),
            (),
          ),
        );
        open Belt;
         let%RePromise.Js json = Fetch.Response.json(Result.getExn(response));
  json
  ->Result.getExn
  ->Js.Json.decodeObject
  ->Option.getExn
  ->Js.Dict.unsafeGet("id")
  ->Js.Json.decodeString
  ->Option.getExn
  ->Promise.resolved;
      // Promise.resolved(response);
    };

    let handle = (e, fn) => {
      ReactEvent.Synthetic.preventDefault(e);
      fn();
    };
    let handleConsent = () => {
      getAccessTokenWithPopup()
      |> Js.Promise.then_(_ => {
           setState(_ => {...state, error: None});
           Js.Promise.resolve();
         })
      |> Js.Promise.catch(error => {
           setState(_ => {...state, error: Obj.magic(error)});
           Js.Promise.reject(Obj.magic(error));
         })
      |> ignore;

      callApi();
    };

    let handleLoginAgain = () => {
      loginWithPopup()
      |> Js.Promise.then_(_ => {
           setState(_ => {...state, error: None});
           Js.Promise.resolve();
         })
      |> Js.Promise.catch(error => {
           setState(_ => {...state, error: Obj.magic(error)});
           Js.Promise.reject(Obj.magic(error));
         })
      |> ignore;

      callApi();
    };
    //   <>
    //     <div className="mb-5">
    //       {state.error == Some("consent_required")
    //          ? <Alert color="warning">
    //              "You need to ..."->React.string
    //              <a
    //                href="#/"
    //                className="alert-link"
    //                onClick={e => handle(e, handleConsent)}>
    //                "consent to get access to users api"->React.string
    //              </a>
    //            </Alert>
    //          : React.null}
    //       {state.error == Some("login_required")
    //          ? <Alert color="warning">
    //              "You need to ..."->React.string
    //              <a
    //                href="#/"
    //                className="alert-link"
    //                onClick={e => handle(e, handleLoginAgain)}>
    //                "log in again"->React.string
    //              </a>
    //            </Alert>
    //          : React.null}
    //       <h1> "External API"->React.string </h1>
    //       <p className="lead">
    //         "Ping an external API by clicking the button below."->React.string
    //       </p>
    //       <p>
    //         "This will call a local API on port 3001 that would have been started
    //           if you run <code>npm run dev</code>. An access token is sent as part
    //           of the request's `Authorization` header and the API will validate it
    //           using the API's audience value."
    //         ->React.string
    //       </p>
    //       {!audience
    //          ? <Alert color="warning">
    //              <p>
    //                "You can't call the API at the moment because your application does
    //               not have any configuration for <code>audience</code>, or it is
    //               using the default value of <code>YOUR_API_IDENTIFIER</code>. You
    //               might get this default value if you used the
    //                Download
    //                Sample

    //               feature of "
    //                ->React.string
    //                <a href="https://auth0.com/docs/quickstart/spa/react">
    //                  "the quickstart guide"->React.string
    //                </a>
    //                ", but have not set an API up in your Auth0 Tenant. You can find
    //               out more information on{"
    //                "}"->React.string
    //                <a href="https://auth0.com/docs/api">
    //                  "->React.string"->React.string
    //                </a>
    //                "in the
    //               Auth0 Docs."->React.string
    //              </p>
    //              <p>
    //                "The audience is the identifier of the API that you want to call
    //               (see{"
    //                "}"->React.string
    //                <a
    //                  href="https://auth0.com/docs/get-started/dashboard/tenant-settings#api-authorization-settings">
    //                  "API Authorization Settings"->React.string
    //                </a>
    //                "{"
    //                "}"->React.string
    //                " for more info)."->React.string
    //              </p>
    //              <p>
    //                "In this sample, you can configure the audience in a couple of
    //               ways:"
    //                ->React.string
    //              </p>
    //              <ul>
    //                <li>
    //                  "in the"->React.string
    //                  <code> "src/index.js"->React.string </code>
    //                  "file"->React.string
    //                </li>
    //                <li>
    //                  "by specifying it in the <code>auth_config.json</code> file (see
    //                 the <code>auth_config.json.example</code> file for an example of
    //                 where it should go)"
    //                  ->React.string
    //                </li>
    //              </ul>
    //              <p>
    //                "Once you have configured the value for"->React.string
    //                <code> "audience"->React.string </code>
    //                ",
    //               please restart the app and try to use the "
    //                Ping
    //                API
    //                " button below."->React.string
    //              </p>
    //            </Alert>
    //          : React.null}
    //       <Button
    //         color="primary" className="mt-5" onClick=callApi disabled={!audience}>
    //         "Ping API"->React.string
    //       </Button>
    //     </div>
    //     <div className="result-block-container">
    //       {state.showResult
    //          ? <div className="result-block" testid="api-result">
    //              <h6 className="muted"> "Result"->React.string </h6>
    //              <Highlight>
    //                <span>
    //                  {{
    //                     Utils.stringify(state.apiMessage);
    //                   }
    //                   ->React.string}
    //                </span>
    //              </Highlight>
    //            </div>
    //          : React.null}
    //     </div>
    //   </>;
    <div className="mb-5"> "External Api"->React.string </div>;
  };
  ();
};
