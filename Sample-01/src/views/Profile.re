open BsReactstrap;

[@bs.val]
external json_stringify: ('a, Js.Nullable.t(unit), int) => string =
  "JSON.stringify";
let stringify = str => json_stringify(str, Js.Nullable.null, 2);
[@react.component]
let make = () => {
  let {user} = Auth0.useAuth0();

  <Container className="mb-5">
    <Row
      className="align-items-center profile-header mb-5 text-center text-md-left">
      <Col md=2>
        <img
          src={user.picture}
          alt="Profile"
          className="rounded-circle img-fluid profile-picture mb-3 mb-md-0"
        />
      </Col>
      <Col md=true>
        <h2> {user.name}->React.string </h2>
        <p className="lead text-muted"> {user.email}->React.string </p>
      </Col>
    </Row>
    <Row>
      <Highlight>
        {{
           stringify(user);
         }
         ->React.string}
      </Highlight>
    </Row>
  </Container>;
};
