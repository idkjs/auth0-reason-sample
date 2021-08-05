// open ReactRouter;
open BsReactstrap;
open Hooks;
open Belt;
[@bs.module] external uuidv4: unit => string = "uuid-random";
let raiseErrorAndReturn = msg => Js.Exn.raiseError(msg);
[@react.component]
let make = () => {
  let url = ReasonReactRouter.useUrl();
  let (pageId, _) = useSessionStorage(Constants.sessionPageId);
  let {isLoading, error, user} = Auth0.useAuth0();

  // if (error) {
  //   //  <div>"Oops..."->React.string {error.message}->React.string</div>;
  //   Js.log(error)
  // }

  // if (isLoading) {
  //    <Loading />;
  // }
  //   React.useEffect0(() => {
  // switch (isLoading, error) {
  //   | (_, error) =>
  //     let error = error->Obj.magic;
  //     raiseErrorAndReturn(error##message)->ignore;
  //     <div>
  //       "Oops..."->React.string
  //       {{
  //          error##message;
  //        }
  //        ->React.string}
  //     </div>;

  //   | (isLoading, _) => <Loading />
  // }

  //   })
  switch (isLoading, error, user) {
  | (_isLoading, _, _) => <Loading />
  | (_, _, _user) =>
    <div id="app" className="d-flex flex-column h-100">
      <NavBar />
      <Container className="flex-grow-1 mt-5">
        {switch (url.path) {
         | [] =>
           let pageId =
             pageId
             ->Option.flatMap(p => p == "" ? None : Some(p))
             ->Option.getWithDefault(uuidv4());
           let search = url.search;
           ReasonReactRouter.replace({j|/$(pageId)?$(search)|j});
           <div />;

         | ["profile"] => <Profile />
         | ["/"] => <Home />
         | _ => <NotFound />
         }}
      </Container>
      <Footer />
    </div>
  | (_, error, _) =>
    let error = error->Obj.magic;
    raiseErrorAndReturn(error##message)->ignore;
    <div>
      "Oops..."->React.string
      {{
         error##message;
       }
       ->React.string}
    </div>;
  };
};
