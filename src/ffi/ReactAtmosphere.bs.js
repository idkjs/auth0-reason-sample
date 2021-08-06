'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Js_option = require("bs-platform/lib/js/js_option.js");
var Caml_option = require("bs-platform/lib/js/caml_option.js");
var ReactAtmosphere = require("react-atmosphere");

function layerStateToJs(param) {
  return param + 0 | 0;
}

function layerStateFromJs(param) {
  if (param <= 1 && 0 <= param) {
    return param - 0 | 0;
  }
  
}

function layerRenderToLayerRenderJs(render, param) {
  return Curry._1(render, {
              state: Js_option.getExn(layerStateFromJs(param.state)),
              completeTransitionExit: param.completeTransitionExit
            });
}

function makeProps(render, transitionExit, key, param) {
  var tmp = {
    render: (function (param) {
        return layerRenderToLayerRenderJs(render, param);
      })
  };
  if (transitionExit !== undefined) {
    tmp.transitionExit = Caml_option.valFromOption(transitionExit);
  }
  if (key !== undefined) {
    tmp.key = Caml_option.valFromOption(key);
  }
  return tmp;
}

var Layer = {
  makeProps: makeProps
};

var LayerContainer = {};

var Options = {};

var State = {};

var Popper = {
  Options: Options,
  State: State
};

function makeProps$1(id, reference, render, onOutsideClick, options, transitionExit, key, param) {
  var tmp = {
    reference: reference,
    render: (function (param) {
        return Curry._1(render, {
                    state: Js_option.getExn(layerStateFromJs(param.state)),
                    completeTransitionExit: param.completeTransitionExit,
                    popperState: param.popperState
                  });
      })
  };
  if (id !== undefined) {
    tmp.id = Caml_option.valFromOption(id);
  }
  if (onOutsideClick !== undefined) {
    tmp.onOutsideClick = Caml_option.valFromOption(onOutsideClick);
  }
  if (options !== undefined) {
    tmp.options = Caml_option.valFromOption(options);
  }
  if (transitionExit !== undefined) {
    tmp.transitionExit = Caml_option.valFromOption(transitionExit);
  }
  if (key !== undefined) {
    tmp.key = Caml_option.valFromOption(key);
  }
  return tmp;
}

var PopperLayer = {
  makeProps: makeProps$1
};

var Tooltip = {};

function makeProps$2(render, state, completeTransitionExit, onBackdropClick, key, param) {
  var tmp = {
    render: (function (param) {
        return Curry._1(render, {
                    state: Js_option.getExn(layerStateFromJs(param.state))
                  });
      }),
    state: state + 0 | 0,
    completeTransitionExit: completeTransitionExit
  };
  if (onBackdropClick !== undefined) {
    tmp.onBackdropClick = Caml_option.valFromOption(onBackdropClick);
  }
  if (key !== undefined) {
    tmp.key = Caml_option.valFromOption(key);
  }
  return tmp;
}

var Layer$1 = {
  makeProps: makeProps$2
};

function makeProps$3(render, onBackdropClick, key, param) {
  var tmp = {
    render: (function (param) {
        return Curry._1(render, {
                    state: Js_option.getExn(layerStateFromJs(param.state))
                  });
      })
  };
  if (onBackdropClick !== undefined) {
    tmp.onBackdropClick = Caml_option.valFromOption(onBackdropClick);
  }
  if (key !== undefined) {
    tmp.key = Caml_option.valFromOption(key);
  }
  return tmp;
}

var Dialog = {
  Layer: Layer$1,
  makeProps: makeProps$3
};

function pushLayer(render) {
  return ReactAtmosphere.LayerAPI.pushLayer(function (param) {
              return layerRenderToLayerRenderJs(render, param);
            });
}

function updateLayer(key, render) {
  ReactAtmosphere.LayerAPI.updateLayer(key, (function (param) {
          return layerRenderToLayerRenderJs(render, param);
        }));
  
}

var API = {
  pushLayer: pushLayer,
  updateLayer: updateLayer
};

exports.layerStateToJs = layerStateToJs;
exports.layerStateFromJs = layerStateFromJs;
exports.layerRenderToLayerRenderJs = layerRenderToLayerRenderJs;
exports.Layer = Layer;
exports.LayerContainer = LayerContainer;
exports.Popper = Popper;
exports.PopperLayer = PopperLayer;
exports.Tooltip = Tooltip;
exports.Dialog = Dialog;
exports.API = API;
/* react-atmosphere Not a pure module */
