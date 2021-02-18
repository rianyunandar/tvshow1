/* eslint-disable react-hooks/exhaustive-deps */
import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Image, ListGroup, Container, Card } from "react-bootstrap";

export class ShowDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      detail: {},
      loading: true
    };
  }

  componentDidMount() {
    let id = this.props.location.pathname.split("/")[2];
    console.log(id);
    fetch(`https://api.tvmaze.com/shows/${id}?embed=cast`)
      .then((response) => response.json())
      .then((details) => {
        this.setState({
          detail: details,
          loading: false
        });
      });
  }

  render() {
    return (
      <Container>
        {this.state.loading ? (
          <div>Loading...</div>
        ) : (
          <div>
            <Link className="btn btn-light my-3" to="/">
              Go Back
            </Link>
            <Row>
              <Col md={6}>
                <Image
                  className="ImageDetail"
                  src={this.state.detail.image ? this.state.detail.image.original : "/logo.png"}
                  alt={this.state.detail.name ? this.state.detail.name : "no info"}
                  fluid
                  rounded
                />
              </Col>
              <Col md={6}>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <h3>{this.state.detail.name ? this.state.detail.name : "no info"}</h3>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <h5>Rating: {this.state.detail.rating ? this.state.detail.rating.average : " no info"}</h5>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <b>Premiered:</b> {this.state.detail.premiered ? this.state.detail.premiered : "no info"}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <b>Genre: </b>{" "}
                    {this.state.detail.genres ? this.state.detail.genres.map((genre, id) => {
                      return <span key={id}>{genre + " "}</span>;
                    }) : "no info"}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <b>Language:</b> <span> </span>
                    {this.state.detail.language ? this.state.detail.language : "no info"}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <b>Rating:</b> {this.state.detail.rating ? this.state.detail.rating.average :"no inof"}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <b>Schedule:</b> {this.state.detail.schedule ? this.state.detail.schedule.time : "00:00"}{" "}
                    <span> </span>
                    Day:{" "}
                    {this.state.detail.schedule ? this.state.detail.schedule.days.map((day, id) => {
                      return <span key={id}>{day + ","}</span>;
                    }): "No info"}
                    <span> Timezone : </span>
                    {this.state.detail.network ? this.state.detail.network.country.timezone : "no info"}
                  </ListGroup.Item>
                </ListGroup>
              </Col>
            </Row>
            <Row>
              <Col md={12}>
                <ListGroup.Item>
                  <h3>Summary</h3>
                  {this.state.detail.summary ? this.state.detail.summary : "no data"}
                </ListGroup.Item>
              </Col>
            </Row>
            <Row>
              <Col md={12}>
                <h3>Cast</h3>
              </Col>
            </Row>
            <Row>
              {this.state.detail._embedded.cast.map((actor, id) => (
                <Col key={id} xs={6} sm={6} md={4} lg={3} xl={2}>
                  <Card className="p-3 rounded">
                    <Card.Img
                      className="ImageCard"
                      src={actor.person.image.medium}
                      variant="top"
                      alt={actor.person.name ? actor.person.name : "no data"}
                    />

                    <Card.Body>
                      <Card.Title as="div">{actor.person.name ? actor.person.name : "no data"}</Card.Title>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </div>
        )}
      </Container>
    );
  }
}

export default ShowDetail;
