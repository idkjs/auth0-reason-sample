

import * as Curry from "bs-platform/lib/es6/curry.js";
import * as Belt_Option from "bs-platform/lib/es6/belt_Option.js";
import * as Caml_option from "bs-platform/lib/es6/caml_option.js";
import * as Restorative from "restorative/src/Restorative.bs.js";

var sessionId = localStorage.getItem("sessionId");

var sessionId$1 = sessionId === null ? undefined : Caml_option.some(sessionId);

var api = Restorative.createStore({
      sessionId: sessionId$1,
      user: undefined,
      hasFetched: false
    }, (function (state, action) {
        if (typeof action === "number") {
          if (action === /* Logout */0) {
            return {
                    sessionId: undefined,
                    user: undefined,
                    hasFetched: state.hasFetched
                  };
          } else {
            return {
                    sessionId: state.sessionId,
                    user: undefined,
                    hasFetched: true
                  };
          }
        }
        switch (action.TAG | 0) {
          case /* Login */0 :
              return {
                      sessionId: action._0,
                      user: {
                        id: action._2,
                        accessToken: action._1,
                        anonymous: action._3
                      },
                      hasFetched: true
                    };
          case /* UpdateUser */1 :
              return {
                      sessionId: state.sessionId,
                      user: action._0,
                      hasFetched: true
                    };
          case /* SetAnonymous */2 :
              var anonymous = action._0;
              return {
                      sessionId: state.sessionId,
                      user: Belt_Option.map(state.user, (function (user) {
                              return {
                                      id: user.id,
                                      accessToken: user.accessToken,
                                      anonymous: anonymous
                                    };
                            })),
                      hasFetched: state.hasFetched
                    };
          
        }
      }));

function getSessionId(param) {
  return Curry._1(api.getState, undefined).sessionId;
}

function useHasFetched(param) {
  return Curry._3(api.useStoreWithSelector, (function (state) {
                return state.hasFetched;
              }), undefined, undefined);
}

function useUser(param) {
  return Curry._3(api.useStoreWithSelector, (function (state) {
                return state.user;
              }), undefined, undefined);
}

function getUser(param) {
  return Curry._1(api.getState, undefined).user;
}

function login(sessionId, accessToken, userId, anonymous) {
  return Curry._1(api.dispatch, {
              TAG: /* Login */0,
              _0: sessionId,
              _1: accessToken,
              _2: userId,
              _3: anonymous
            });
}

function logout(param) {
  return Curry._1(api.dispatch, /* Logout */0);
}

function updateUser(user) {
  return Curry._1(api.dispatch, {
              TAG: /* UpdateUser */1,
              _0: user
            });
}

function setAnonymous(anonymous) {
  return Curry._1(api.dispatch, {
              TAG: /* SetAnonymous */2,
              _0: anonymous
            });
}

function fetchFail(param) {
  return Curry._1(api.dispatch, /* FetchFail */1);
}

export {
  sessionId$1 as sessionId,
  api ,
  getSessionId ,
  useHasFetched ,
  useUser ,
  getUser ,
  login ,
  logout ,
  updateUser ,
  setAnonymous ,
  fetchFail ,
  
}
/* sessionId Not a pure module */
