open ReactRouter;
open Hooks;
open Belt;
[@bs.module] external uuidv4: unit => string = "uuid-random";

[@react.component]
let make = () => {
  let url = ReasonReactRouter.useUrl();
  let (pageId, _) = useSessionStorage(Constants.sessionPageId);

  switch (url.path) {
  | [] =>
    let pageId =
      pageId
      ->Option.flatMap(p => p == "" ? None : Some(p))
      ->Option.getWithDefault(uuidv4());
    let search = url.search;
    ReasonReactRouter.replace({j|/$(pageId)?$(search)|j});
    <div />;
  | [id]
      when
        switch (
          Js.Re.fromString(
            "[0-9a-fA-F]{8}\\-[0-9a-fA-F]{4}\\-[0-9a-fA-F]{4}\\-[0-9a-fA-F]{4}\\-[0-9a-fA-F]{12}",
          )
          ->Js.Re.exec_(id)
        ) {
        | Some(_) => true
        | None => false
        } =>
    <Board id />
  | ["profile"] => <Profile />
  | _ => <NotFound />
  | _ => <NotFound />
  };
};
[@react.component]
let make = ()=> {
   let url = ReasonReact.Router.useUrl();

  let { isLoading, error } = Auth0.useAuth0();

  // if (error) {
  //    <div>"Oops..."->React.string {error.message}->React.string</div>;
  // }

  // if (isLoading) {
  //    <Loading />;
  // }
switch(isLoading, error){
  | error =>Js.log(error);<div>"Oops..."->React.string</div>
  | isLoading => <Loading />
  |_ =>  <Router history={history}>
      <div id="app" className="d-flex flex-column h-100">
        <NavBar />
        <Container className="flex-grow-1 mt-5">
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/profile" component={Profile} />
            <Route path="/external-api" component={ExternalApi} />
          </Switch>
        </Container>
        <Footer />
      </div>
    </Router>
}



};
