type icon;
[@bs.module "@fortawesome/react-fontawesome"][@react.component]
external make:
    (
      ~icon: icon,
      ~className: option(string)=?
    ) => React.element = "FontAwesomeIcon";
// [@bs.module "@fortawesome/react-fontawesome"] external reactClass: ReasonReact.reactClass = "FontAwesomeIcon";

// [@bs.obj]
// external makeProps:
//     (
//         ~icon: array(string),
//         ~id: string=?,
//         ~className: string=?,
//         ~style: ReactDOMRe.Style.t=?,
//         ~size: string=?,
//         ~fixedWidth: bool=?,
//         unit
//     ) => _ = "";
