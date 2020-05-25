import React from "react";
import { Card } from "react-bootstrap";

function Results(props) {
  return (
    <div>
      <Card style={{ width: "18rem" }}>
        <Card.Img variant="top" src={props.display.image_background} />
        <Card.Body>
          <Card.Title>{props.display.name}</Card.Title>
        </Card.Body>
      </Card>
    </div>
  );
}

export default Results;
