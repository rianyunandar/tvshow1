import React, { Component } from "react";
import { Row, Col, Container, Card } from "react-bootstrap";
import moment from "moment";

const idLocale = require("moment/locale/id");

moment.locale("id", idLocale);
export class OnShow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      onShow: [],
      onShow2: [],
      loading: true
    };
  }

  async componentDidMount() {
    let today = new Date().toISOString().slice(0, 10);
    try {
      const response = await fetch(
        `http://api.tvmaze.com/schedule/web?date=${today}&country=US`
      );
      const response2 = await fetch(`https://api.tvmaze.com/schedule`);
      const json = await response.json();
      const json2 = await response2.json();
      this.setState({
        onShow: json,
        onShow2: json2,
        loading: false
      });
    } catch (error) {
      alert(JSON.stringify(error.message));
    }
  }
  render() {
    return (
      <Container>
        {(console.log(this.state.onShow2), console.log(moment.locale()))}
        {this.state.loading ? (
          <div>Loading...</div>
        ) : (
          <div>
            <h3 className="headerTitle">TV Show Today </h3>  
            <Row>
              {this.state.onShow2.map((item, i) => {
                return (
                  <Col key={i} lg={3} md={4} sm={6} xs={12}>
                    <Card className='my-3 p-3 rounded'>
                    <Card.Img className='todayCard' 
                    src={item.show.image ? item.show.image.medium :"/logo.png"}
                    variant='top' />
                    <div>{item.show.name}</div>
                    <div>{item.show.schedule.time}</div>
                    </Card>
                  </Col>
                );
              })}
            </Row>
            <h3 className="headerTitle">Web/Streaming Today</h3>
            <Row>
              {this.state.onShow.map((show,id) => (
                <Col key={id} lg={3} md={4} sm={6} xs={12}>
                <Card className='my-3 p-3 rounded'>
                  <Card.Img className='todayCard' 
                  src={show._embedded.show.image ? show._embedded.show.image.medium : "/logo.png"}
                  variant='top' />
                    <Card.Body>
                      <Card.Title as='h5'>{show._embedded.show.name}</Card.Title>
                      <Card.Text as='h6'>Eps : {show.name}</Card.Text>
                      <Card.Text as='h6'>
                        {moment(show.airstamp).format("DD/MM/YYYY, hh:mm")}
                      </Card.Text>
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

export default OnShow;
