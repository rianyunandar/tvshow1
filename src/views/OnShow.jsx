import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Image, ListGroup, Container,Card } from "react-bootstrap";

export class OnShow extends Component {

    constructor(props) {
        super(props);
        this.state = {
          onShow: [],
          loading: true,
       
        };
      }

      
      
    componentDidMount(){
       let today = new Date().toISOString().slice(0, 10)
        fetch(`http://api.tvmaze.com/schedule/web?date=${today}`)
        .then((response) => response.json())
        .then((results) => {
            this.setState({
                onShow: results,
                loading: false
            });
        })
    }
      render() {
        return (
        <Container>
            {this.state.loading ? (
          <div>Loading...</div>
        ) : (
            <div>
                      <Row>
        {
        this.state.onShow.map((show) => (
          <Col key={show.id} xs={6} sm={6} md={6} lg={4} xl={3}>
           
            <p>{show._embedded.show.name} <span> </span> {show.name}</p>
          </Col>
        ))}
      </Row>
            </div>
        )}
        </Container>
    )}
}


export default OnShow;
