open Belt;

let redirectUrl = Constants.clientUrl ++ "/oauth/callback";
let login = code => {
  let%RePromise.Js response =
    Fetch.fetchWithInit(
      Constants.serverUrl ++ "/login",
      Fetch.RequestInit.make(
        ~method_=Post,
        ~body=
          Fetch.BodyInit.make(
            Js.Json.stringify(
              Js.Json.object_(
                Js.Dict.fromArray([|("code", Js.Json.string(code))|]),
              ),
            ),
          ),
        ~headers=Fetch.HeadersInit.make({"Content-Type": "application/json"}),
        ~mode=CORS,
        (),
      ),
    );
  let%RePromise.Js json = Fetch.Response.json(Result.getExn(response));
  let jsonDict = json->Result.getExn->Js.Json.decodeObject->Option.getExn;
  let sessionId =
    jsonDict
    ->Js.Dict.unsafeGet("sessionId")
    ->Js.Json.decodeString
    ->Option.getExn;
  Dom.Storage.(localStorage |> setItem("sessionId", sessionId));
  let accessToken =
    jsonDict
    ->Js.Dict.unsafeGet("accessToken")
    ->Js.Json.decodeString
    ->Option.getExn;
  let userId =
    jsonDict
    ->Js.Dict.unsafeGet("userId")
    ->Js.Json.decodeString
    ->Option.getExn;
  let anonymous =
    jsonDict
    ->Js.Dict.unsafeGet("anonymous")
    ->Js.Json.decodeBoolean
    ->Option.getExn;
  UserStore.login(sessionId, accessToken, userId, anonymous);
  Promise.resolved(accessToken);
};

let logout = () => {
  let sessionId = UserStore.getSessionId();
  let _ =
    switch (sessionId) {
    | Some(sessionId) =>
      let%RePromise.Js _response =
        Fetch.fetchWithInit(
          Constants.serverUrl ++ "/logout",
          Fetch.RequestInit.make(
            ~method_=Post,
            ~headers=Fetch.HeadersInit.make({"Authorization": sessionId}),
            ~mode=CORS,
            (),
          ),
        );
      Promise.resolved();
    | None => Promise.resolved()
    };
  Dom.Storage.(localStorage |> removeItem("sessionId"));
  UserStore.logout();
};

let fetchUser = () => {
  switch (UserStore.getSessionId()) {
  | Some(sessionId) =>
    let%RePromise.Js response =
      Fetch.fetchWithInit(
        Constants.serverUrl ++ "/user",
        Fetch.RequestInit.make(
          ~method_=Get,
          ~headers=Fetch.HeadersInit.make({"Authorization": sessionId}),
          ~mode=CORS,
          (),
        ),
      );
    switch (response) {
    | Ok(response) =>
      let status = Fetch.Response.status(response);
      if (status == 200) {
        let%RePromise.Js json = Fetch.Response.json(response);
        let json = Result.getExn(json);
        open Json.Decode;
        let userId = json |> field("userId", string);
        let accessToken = json |> field("accessToken", string);
        let anonymous = json |> field("anonymous", bool);
        UserStore.updateUser({id: userId, accessToken, anonymous});
        Promise.resolved();
      } else {
        UserStore.fetchFail();
        Promise.resolved();
      };
    | Error(_) =>
      UserStore.fetchFail();
      Promise.resolved();
    };
  | None =>
    UserStore.fetchFail();
    Promise.resolved();
  };
};
