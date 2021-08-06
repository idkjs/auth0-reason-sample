open ReactRouter;
open BsReactstrap;
// open Hooks;
// open Belt;
[@bs.module "history/index"]
external createBrowserHistory: unit=>unit =
  "createBrowserHistory";

let history = createBrowserHistory();
[%bs.raw {|require('./App.css')|}];
InitFontAwesome.init();
[@bs.module] external uuidv4: unit => string = "uuid-random";
let raiseErrorAndReturn = msg => Js.Exn.raiseError(msg);
[@react.component]
let make = () => {
  let {isLoading, error} = Auth0.useAuth0();
  let err =
    switch (error) {
    | Some(_error) => true
    | None => false
    };
  let oops: string => React.element =
    msg => {
      <div>
        {{
           "Oops..." ++ msg;
         }
         ->React.string}
      </div>;
    };

  let loading = () => <Loading />;
  if (err) {
    let error = error->Obj.magic;
    raiseErrorAndReturn(error##message)->ignore;
    oops(error##message)->ignore;
  };
  if (isLoading) {
    loading()->ignore;
  };
  <Router history>
    <div id="app" className="d-flex flex-column h-100">
      <NavBar />
      <Container className="flex-grow-1 mt-5">
        <Switch>
          <Route path="/" exact=true component=Home.make />
          <Route path="/profile" component=Profile.make />
          <Route path="/external-api" component=ExternalApi.make />
        </Switch>
      </Container>
      <Footer />
    </div>
  </Router>;
};
