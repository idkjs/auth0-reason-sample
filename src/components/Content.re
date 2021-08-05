module Col = BsReactstrap.Col;
module Row = BsReactstrap.Row;
open ContentData;
[@react.component]
let make = () => {
  <div className="next-steps my-5">
    <h2 className="my-5 text-center"> "What can I do next?"->React.string </h2>
    <Row className="d-flex justify-content-between">
      {Belt.Array.mapWithIndex(contentData, (i, col) => {
         <Col key={string_of_int(i)} md=5 className="mb-4">
           <h6 className="mb-3">
             <a href={col.link}>
               <FontAwesomeIcon icon=SolidIcons.faLink className="mr-2" />
               {col.title}->React.string
             </a>
           </h6>
           <p> {col.description}->React.string </p>
         </Col>
       })
       ->React.array}
    </Row>
  </div>;
};
