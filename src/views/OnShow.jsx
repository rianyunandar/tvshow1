import React, { Component } from "react";
import { Row, Col, Container, Card,Media,Image } from "react-bootstrap";
import moment from "moment";
import ReactPaginate from 'react-paginate';

const idLocale = require("moment/locale/id");

moment.locale("id", idLocale);
export class OnShow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      onShow: [],
      onShow2: [],
      loading: true,
      perPage: 4,
      currentPage: 0,
      offset: 0
    };
    this.handlePageClick = this
    .handlePageClick
    .bind(this);
  }

 
  async receivedData() {
    let today = new Date().toISOString().slice(0, 10);
    try {
      const response = await fetch(
        `http://api.tvmaze.com/schedule/web?date=${today}&country=US`
      );
      const response2 = await fetch(`https://api.tvmaze.com/schedule`);
      const json = await response.json()
      const json2 = await response2.json()
      const slicejson = json.slice(this.state.offset, this.state.offset + this.state.perPage)
      const slicejson2 = json2.slice(this.state.offset, this.state.offset + this.state.perPage)

      this.setState({
        onShow: slicejson,
        onShow2: slicejson2,
        loading: false
      });
    } catch (error) {
      alert(JSON.stringify(error.message));
    }
  }
  
  handlePageClick = (e) => {
    const selectedPage = e.selected;
    const offset = selectedPage * this.state.perPage;

    this.setState({
        currentPage: selectedPage,
        offset: offset
    }, () => {
        this.receivedData()
    });

};
  async componentDidMount() {
    this.receivedData();
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
                  <ul className="list-unstyled border">
                  {this.state.onShow2.map((item, i) => {
                return (
        <Media as="li" key={i}>
         
           <Image  className='todayCard' src={item.show.image ? item.show.image.medium :"/logo.png"}  alt="Generic placeholder" rounded/>
          <Media.Body>
            <h5>{item.show.name} <span>  </span>{item.show.schedule.time}</h5>
            <div>
            <div dangerouslySetInnerHTML={ { __html: item.show.summary } }></div>
            </div>           
          </Media.Body>
        </Media>
           );
          })}
        </ul> 
        <ReactPaginate
                    previousLabel={"prev"}
                    nextLabel={"next"}
                    breakLabel={"..."}
                    breakClassName={"break-me"}
                    pageCount={this.state.pageCount}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={this.handlePageClick}
                    containerClassName={"pagination"}
                    subContainerClassName={"pages pagination"}
                    activeClassName={"active"}/>

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
