open BsReactstrap;
module RouterNavLink = ReactRouter.NavLink;
[@bs.val] external crm_url: string = "window.location.origin";
[@react.component]
let make = () => {
  let (isOpen, setIsOpen) = React.useState(_=>false);
  let {
    user,
    isAuthenticated,
    loginWithRedirect,
    logout,
  } = Auth0.useAuth0();
  let toggle = () => setIsOpen(isOpen => !isOpen);

  let logoutWithRedirect = () =>{
    logout(
      ~returnTo=crm_url,
    )};


let style = ReactDOMRe.Style.make(
    ~minHeight = "170px",
    ()
);
    <div className="nav-container">
      <Navbar color="light" light=true expand="md">
        <Container>
          <NavbarBrand className="logo" />
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar=true>
            <Nav className="mr-auto" navbar=true>
              <NavItem>
                <NavLink
                  tag={RouterNavLink.make}
                  to_="/"
                  exact=true
                  activeClassName="router-link-exact-active"
                >
                  "Home"->React.string
                </NavLink>
              </NavItem>
              {isAuthenticated ? (
                <NavItem>
                  <NavLink
                    tag={RouterNavLink.make}
                    to_="/external-api"
                    exact=true
                    activeClassName="router-link-exact-active"
                  >
                    "External API"->React.string
                  </NavLink>
                </NavItem>
              ): React.null}
            </Nav>
            <Nav className="d-none d-md-block">
              {!isAuthenticated ? (
                <NavItem>
                  <Button
                    id="qsLoginBtn"
                    color="primary"
                    className="btn-margin"
                    onClick={() => loginWithRedirect()}
                  >
                    "Log in"->React.string
                  </Button>
                </NavItem>
              ):React.null}
              {isAuthenticated ? (
                <UncontrolledDropdown nav=true inNavbar=true>
                  <DropdownToggle nav=true caret=true id="profileDropDown">
                    <img
                      src={user.picture}
                      alt="Profile"
                      className="nav-user-profile rounded-circle"
                      width="50"
                    />
                  </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem header=true>{user.name}->React.string</DropdownItem>
                    <DropdownItem
                      tag={RouterNavLink.make}
                      to_="/profile"
                      className="dropdown-profile"
                      activeClassName="router-link-exact-active"
                    >
                      <FontAwesomeIcon icon=SolidIcons.faUser className="mr-3" /> "Profile"->React.string
                    </DropdownItem>
                    <DropdownItem
                      id="qsLogoutBtn"
                      onClick={() => logoutWithRedirect()}
                    >
                      <FontAwesomeIcon icon=SolidIcons.faPowerOff className="mr-3" /> "Log
                      out"->React.string
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              ):React.null}
            </Nav>
            {!isAuthenticated ? (
              <Nav className="d-md-none" navbar=true>
                <NavItem>
                  <Button
                    id="qsLoginBtn"
                    color="primary"
                    block=true
                    onClick={() => loginWithRedirect()}
                  >
                    "Log in"->React.string
                  </Button>
                </NavItem>
              </Nav>
            ):React.null}
            {isAuthenticated ? (
              <Nav
                className="d-md-none justify-content-between"
                navbar=true
                style

              >
                <NavItem>
                  <span className="user-info">
                    <img
                      src={user.picture}
                      alt="Profile"
                      className="nav-user-profile d-inline-block rounded-circle mr-3"
                      width="50"
                    />
                    <h6 className="d-inline-block">{user.name}->React.string</h6>
                  </span>
                </NavItem>
                <NavItem>
                  <FontAwesomeIcon icon=SolidIcons.faUser className="mr-3" />
                  <RouterNavLink
                    to_="/profile"
                    activeClassName="router-link-exact-active"
                  >
                    "Profile"->React.string
                  </RouterNavLink>
                </NavItem>
                <NavItem>
                  <FontAwesomeIcon icon=SolidIcons.faPowerOff className="mr-3" />
                  <RouterNavLink
                    to_="#"
                    id="qsLogoutBtn"
                    onClick={() => logoutWithRedirect()}
                  >
                    "Log out"->React.string
                  </RouterNavLink>
                </NavItem>
              </Nav>
            ):React.null}
          </Collapse>
        </Container>
      </Navbar>
    </div>
};
