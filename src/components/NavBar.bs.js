

import * as Curry from "bs-platform/lib/es6/curry.js";
import * as React from "react";
import * as Reactstrap from "reactstrap";
import * as ReactRouterDom from "react-router-dom";
import * as Auth0React from "@auth0/auth0-react";
import * as ReactFontawesome from "@fortawesome/react-fontawesome";
import * as FreeSolidSvgIcons from "@fortawesome/free-solid-svg-icons";

function NavBar(Props) {
  var match = React.useState(function () {
        return false;
      });
  var setIsOpen = match[1];
  var match$1 = Auth0React.useAuth0();
  var user = match$1.user;
  var logout = match$1.logout;
  var isAuthenticated = match$1.isAuthenticated;
  var loginWithRedirect = match$1.loginWithRedirect;
  var toggle = function (param) {
    return Curry._1(setIsOpen, (function (isOpen) {
                  return !isOpen;
                }));
  };
  var style = {
    minHeight: "170px"
  };
  return React.createElement("div", {
              className: "nav-container"
            }, React.createElement(Reactstrap.Navbar, {
                  light: true,
                  color: "light",
                  expand: "md",
                  children: React.createElement(Reactstrap.Container, {
                        children: null
                      }, React.createElement(Reactstrap.NavbarBrand, {
                            className: "logo"
                          }), React.createElement(Reactstrap.NavbarToggler, {
                            onClick: toggle
                          }), React.createElement(Reactstrap.Collapse, {
                            isOpen: match[0],
                            navbar: true,
                            children: null
                          }, React.createElement(Reactstrap.Nav, {
                                navbar: true,
                                className: "mr-auto",
                                children: null
                              }, React.createElement(Reactstrap.NavItem, {
                                    children: React.createElement(Reactstrap.NavLink, {
                                          tag: ReactRouterDom.NavLink,
                                          to_: "/",
                                          exact: true,
                                          activeClassName: "router-link-exact-active",
                                          children: "Home"
                                        })
                                  }), isAuthenticated ? React.createElement(Reactstrap.NavItem, {
                                      children: React.createElement(Reactstrap.NavLink, {
                                            tag: ReactRouterDom.NavLink,
                                            to_: "/external-api",
                                            exact: true,
                                            activeClassName: "router-link-exact-active",
                                            children: "External API"
                                          })
                                    }) : null), React.createElement(Reactstrap.Nav, {
                                className: "d-none d-md-block",
                                children: null
                              }, isAuthenticated ? null : React.createElement(Reactstrap.NavItem, {
                                      children: React.createElement(Reactstrap.Button, {
                                            color: "primary",
                                            id: "qsLoginBtn",
                                            onClick: (function (param) {
                                                return Curry._1(loginWithRedirect, undefined);
                                              }),
                                            className: "btn-margin",
                                            children: "Log in"
                                          })
                                    }), isAuthenticated ? React.createElement(Reactstrap.UncontrolledCarousel, {
                                      nav: true,
                                      inNavbar: true,
                                      children: null
                                    }, React.createElement(Reactstrap.DropdownToggle, {
                                          id: "profileDropDown",
                                          caret: true,
                                          nav: true,
                                          children: React.createElement("img", {
                                                className: "nav-user-profile rounded-circle",
                                                alt: "Profile",
                                                src: user.picture,
                                                width: "50"
                                              })
                                        }), React.createElement(Reactstrap.DropdownMenu, {
                                          children: null
                                        }, React.createElement(Reactstrap.DropdownItem, {
                                              header: true,
                                              children: user.name
                                            }), React.createElement(Reactstrap.DropdownItem, {
                                              tag: ReactRouterDom.NavLink,
                                              to_: "/profile",
                                              className: "dropdown-profile",
                                              activeClassName: "router-link-exact-active",
                                              children: null
                                            }, React.createElement(ReactFontawesome.FontAwesomeIcon, {
                                                  icon: FreeSolidSvgIcons.faUser,
                                                  className: "mr-3"
                                                }), "Profile"), React.createElement(Reactstrap.DropdownItem, {
                                              id: "qsLogoutBtn",
                                              onClick: (function (param) {
                                                  return Curry._1(logout, window.location.origin);
                                                }),
                                              children: null
                                            }, React.createElement(ReactFontawesome.FontAwesomeIcon, {
                                                  icon: FreeSolidSvgIcons.faPowerOff,
                                                  className: "mr-3"
                                                }), "Log\n                      out"))) : null), isAuthenticated ? null : React.createElement(Reactstrap.Nav, {
                                  navbar: true,
                                  className: "d-md-none",
                                  children: React.createElement(Reactstrap.NavItem, {
                                        children: React.createElement(Reactstrap.Button, {
                                              block: true,
                                              color: "primary",
                                              id: "qsLoginBtn",
                                              onClick: (function (param) {
                                                  return Curry._1(loginWithRedirect, undefined);
                                                }),
                                              children: "Log in"
                                            })
                                      })
                                }), isAuthenticated ? React.createElement(Reactstrap.Nav, {
                                  navbar: true,
                                  className: "d-md-none justify-content-between",
                                  style: style,
                                  children: null
                                }, React.createElement(Reactstrap.NavItem, {
                                      children: React.createElement("span", {
                                            className: "user-info"
                                          }, React.createElement("img", {
                                                className: "nav-user-profile d-inline-block rounded-circle mr-3",
                                                alt: "Profile",
                                                src: user.picture,
                                                width: "50"
                                              }), React.createElement("h6", {
                                                className: "d-inline-block"
                                              }, user.name))
                                    }), React.createElement(Reactstrap.NavItem, {
                                      children: null
                                    }, React.createElement(ReactFontawesome.FontAwesomeIcon, {
                                          icon: FreeSolidSvgIcons.faUser,
                                          className: "mr-3"
                                        }), React.createElement(ReactRouterDom.NavLink, {
                                          activeClassName: "router-link-exact-active",
                                          to_: "/profile",
                                          children: "Profile"
                                        })), React.createElement(Reactstrap.NavItem, {
                                      children: null
                                    }, React.createElement(ReactFontawesome.FontAwesomeIcon, {
                                          icon: FreeSolidSvgIcons.faPowerOff,
                                          className: "mr-3"
                                        }), React.createElement(ReactRouterDom.NavLink, {
                                          id: "qsLogoutBtn",
                                          onClick: (function (param) {
                                              return Curry._1(logout, window.location.origin);
                                            }),
                                          to_: "#",
                                          children: "Log out"
                                        }))) : null))
                }));
}

var RouterNavLink;

var make = NavBar;

export {
  RouterNavLink ,
  make ,
  
}
/* react Not a pure module */
