import React from "react";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";

const ShowCard = ({ show }) => {
  return (
    <Card className="my-3 p-3 rounded">
      <Link to={`/show/${show.id}`}>
        <Card.Img className="ImageCard" src={show.image? show.image.medium : "/logo.png"} variant="top" />
      </Link>

      <Card.Body>
        <Link to={`/show/${show.id}`}>
          <Card.Title as="div">
            <strong>{show.name?show.name:"TV Show"}</strong>
          </Card.Title>
        </Link>
        <Card.Text as="h6">Rating : {show.rating?show.rating.average : "0"}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default ShowCard;
