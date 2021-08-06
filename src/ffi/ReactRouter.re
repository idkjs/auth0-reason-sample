module Router = {
  [@bs.module "react-router-dom"] [@react.component]
  external make: (~history: 'h=?, ~children: 'a) => React.element =
    "BrowserRouter";
};

module Route = {
  [@bs.module "react-router-dom"] [@react.component]
  external make: (~path: string=?,~exact:bool=?, ~component: 'a) => React.element = "Route";
};

module Switch = {
  [@bs.module "react-router-dom"] [@react.component]
  external make: (~children: 'a) => React.element = "Switch";
};

module Link = {
  [@bs.module "react-router-dom"] [@react.component]
  external make:
    (~className: string=?, ~_to: string, ~children: 'a) => React.element =
    "Link";
};
module NavLink = {
  [@bs.module "react-router-dom"] [@react.component]
  external make:
    (
      ~id: string=?,
      ~activeClassName: string=?,
      ~onClick: unit => unit=?,
      ~to_: string,
      ~children: 'a
    ) =>
    React.element =
    "NavLink";
};

type locationData = {
  hash: string,
  key: string,
  pathname: string,
  search: string,
};

[@bs.module "react-router-dom"]
external useLocation: unit => locationData = "useLocation";
