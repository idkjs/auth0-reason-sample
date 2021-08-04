// [@bs.module "react-router-dom"] external history: string = "history";
module History = {
  type t;
  module Location = {
    type t;
    [@bs.get] external pathname: t => string = "pathname";
    [@bs.get] external search: t => string = "search";
    [@bs.get] external hash: t => string = "hash";
    [@bs.get] [@bs.return null_undefined_to_opt]
    external key: t => option(string) = "key";
  };
  type action = [ | `PUSH | `REPLACE | `POP];
  [@bs.get] external length: t => int = "length";
  [@bs.get] external action: t => action = "action";
  [@bs.get] external location: t => string = "location";
  [@bs.send] external listen: (t, Location.t, action, unit) => unit = "listen";
  /* TODO: state typing */
  module State = {
    type t;
  };
  [@bs.send] external push: (t, string, list(State.t)) => unit = "push";
  [@bs.send] external replace: (t, string, list(State.t)) => unit = "replace";
  [@bs.send] external go: (t, int) => unit = "go";
  [@bs.send] external goBack: t => unit = "goBack";
  [@bs.send] external goForward: t => unit = "goForward";
};

type getUserConfirmation = (string, bool) => unit;

type browserHistoryOpt = {
  basename: string,
  forceRefresh: bool,
  keyLength: int,
  getUserConfirmation,
};

[@bs.module]
external createBrowserHistory: browserHistoryOpt => History.t =
  "createBrowserHistory";


type memoryHistoryOpt = {
  initialEntries: list(string),
  initialIndex: int,
  keyLength: int,
};

[@bs.module]
external createMemoryHistory: memoryHistoryOpt => History.t =
  "createMemoryHistory";


type hashHistoryOpt = {
  basename: string,
  hashType: string,
  getUserConfirmation,
};

[@bs.module]
external createHashHistory: hashHistoryOpt => History.t = "createHashHistory";
