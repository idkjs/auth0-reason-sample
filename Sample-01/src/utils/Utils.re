[@bs.val]
external json_stringify: ('a, Js.Nullable.t(unit), int) => string =
  "JSON.stringify";
let stringify = str => json_stringify(str, Js.Nullable.null, 2);
