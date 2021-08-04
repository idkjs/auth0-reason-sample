type state = {
  showResult: bool,
  apiMessage: string,
  error: option(string),
};

let initialState = {showResult: false, apiMessage: "", error: None};
open Config;
open BsReactstrap;
[@react.component]
let make = () => {
  let {apiOrigin: "http://localhost:3001", audience} = getConfig();

  let (state, setState) = React.useState(_ => initialState);

  let Auth0.{getAccessTokenSilently, loginWithPopup, getAccessTokenWithPopup} =
    Auth0.useAuth0();
  let callApi = () => ();
  //  let callApi = () => {
  //     try {
  //       let token = getAccessTokenSilently();

  //       let response = await fetch(`${apiOrigin}/api/external`, {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       });

  //       let responseData = await response.json();

  //       setState(_=>{
  //         ...state,
  //         showResult: true,
  //         apiMessage: responseData,
  //       });
  //     } catch (error) {
  //       setState({
  //         ...state,
  //         error: error.error,
  //       });
  //     }
  //   };
  let me = () => {
    let token = getAccessTokenSilently;
    let authorization = "Bearer" ++ token|>Js.Promise.resolve;
    Js.Promise.(
      Fetch.fetchWithInit(
        {j|${apiOrigin}/api/external|j},
        Fetch.RequestInit.make(
          ~method_=Get,
          ~headers=
            Fetch.HeadersInit.make({
              "Authorization": authorization,
              "Content-Type": "application/json",
            }),
          (),
        ),
      )
      |> then_(Fetch.Response.json)
      |> then_(json =>
           json
           |> Json.Decode.(at(["data"], Decode.user))
           |> (
             user => {
               saveToStorage("user_role", user.role);
               resolve();
             }
           )
         )
      |> ignore
    );
  };
  // let callApi = ()=>{
  //    Js.Promise.make((~resolve, ~reject) => {
  //      let token = getAccessTokenSilently();
  //       ignore(
  //         token
  //         |> Js.Promise.then_(_ => {
  //              setState(_ => {...state, error: None});
  //              Js.Promise.resolve();
  //            })
  //         |> Js.Promise.catch(error => {
  //              setState(_ => {...state, error: Obj.magic(error)});
  //              Js.Promise.reject(Obj.magic(error));
  //            }),
  //       )
  //     });
  // }
  let handle = (e, fn) => {
    ReactEvent.Synthetic.preventDefault(e);
    fn();
  };
  let handleConsent = () => {
    Js.Promise.make((~resolve, ~reject) => {
      ignore(
        getAccessTokenWithPopup()
        |> Js.Promise.then_(_ => {
             setState(_ => {...state, error: None});
             Js.Promise.resolve();
           })
        |> Js.Promise.catch(error => {
             setState(_ => {...state, error: Obj.magic(error)});
             Js.Promise.reject(Obj.magic(error));
           }),
      )
    });

    // Js.Promise.resolve(callApi());
    callApi();
  };

  let handleLoginAgain = () => {
    Js.Promise.make((~resolve, ~reject) => {
      ignore(
        loginWithPopup()
        |> Js.Promise.then_(_ => {
             setState(_ => {...state, error: None});
             Js.Promise.resolve();
           })
        |> Js.Promise.catch(error => {
             setState(_ => {...state, error: Obj.magic(error)});
             Js.Promise.reject(Obj.magic(error));
           }),
      )
    });

    callApi();
  };
  <>
    <div className="mb-5">
      {state.error == Some("consent_required")
         ? <Alert color="warning">
             "You need to ..."->React.string
             <a
               href="#/"
               className="alert-link"
               onClick={e => handle(e, handleConsent)}>
               "consent to get access to users api"->React.string
             </a>
           </Alert>
         : React.null}
      {state.error == Some("login_required")
         ? <Alert color="warning">
             "You need to ..."->React.string
             <a
               href="#/"
               className="alert-link"
               onClick={e => handle(e, handleLoginAgain)}>
               "log in again"->React.string
             </a>
           </Alert>
         : React.null}
      <h1> "External API"->React.string </h1>
      <p className="lead">
        "Ping an external API by clicking the button below."->React.string
      </p>
      <p>
        "This will call a local API on port 3001 that would have been started
          if you run <code>npm run dev</code>. An access token is sent as part
          of the request's `Authorization` header and the API will validate it
          using the API's audience value."
        ->React.string
      </p>
      {!audience
         ? <Alert color="warning">
             <p>
               "You can't call the API at the moment because your application does
              not have any configuration for <code>audience</code>, or it is
              using the default value of <code>YOUR_API_IDENTIFIER</code>. You
              might get this default value if you used the
               Download
               Sample

              feature of "
               ->React.string
               <a href="https://auth0.com/docs/quickstart/spa/react">
                 "the quickstart guide"->React.string
               </a>
               ", but have not set an API up in your Auth0 Tenant. You can find
              out more information on{"
               "}"->React.string
               <a href="https://auth0.com/docs/api">
                 "->React.string"->React.string
               </a>
               "in the
              Auth0 Docs."->React.string
             </p>
             <p>
               "The audience is the identifier of the API that you want to call
              (see{"
               "}"->React.string
               <a
                 href="https://auth0.com/docs/get-started/dashboard/tenant-settings#api-authorization-settings">
                 "API Authorization Settings"->React.string
               </a>
               "{"
               "}"->React.string
               " for more info)."->React.string
             </p>
             <p>
               "In this sample, you can configure the audience in a couple of
              ways:"
               ->React.string
             </p>
             <ul>
               <li>
                 "in the"->React.string
                 <code> "src/index.js"->React.string </code>
                 "file"->React.string
               </li>
               <li>
                 "by specifying it in the <code>auth_config.json</code> file (see
                the <code>auth_config.json.example</code> file for an example of
                where it should go)"
                 ->React.string
               </li>
             </ul>
             <p>
               "Once you have configured the value for"->React.string
               <code> "audience"->React.string </code>
               ",
              please restart the app and try to use the "
               Ping
               API
               " button below."->React.string
             </p>
           </Alert>
         : React.null}
      <Button
        color="primary" className="mt-5" onClick=callApi disabled={!audience}>
        "Ping API"->React.string
      </Button>
    </div>
    <div className="result-block-container">
      {state.showResult
         ? <div className="result-block" testid="api-result">
             <h6 className="muted"> "Result"->React.string </h6>
             <Highlight>
               <span>
                 {{
                    Utils.stringify(state.apiMessage);
                  }
                  ->React.string}
               </span>
             </Highlight>
           </div>
         : React.null}
    </div>
  </>;
};
