import React, { Component } from "react";
import { Row, Col, Container,Media,Image } from "react-bootstrap";
import moment from "moment";
import ReactPaginate from 'react-paginate';

const idLocale = require("moment/locale/id");

moment.locale("id", idLocale);
export class OnShow extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
    try {
     
      const response2 = await fetch(`https://api.tvmaze.com/schedule`);
      const json2 = await response2.json()
      const slicejson2 = json2.slice(this.state.offset, this.state.offset + this.state.perPage)

      this.setState({
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
        {this.state.loading ? (
          <div>Loading...</div>
        ) : (
                <div>
                  <h3 className="headerTitle">TV Show Today </h3> 
                  <Row>
                  <ul className="list-unstyled border">
                    
                  {this.state.onShow2.map((item, i) => {
                return (
        <Media as="li"key={i} >
           <Image  className='todayCard' src={item.show.image ? item.show.image.medium :"/logo.png"}  alt="Generic placeholder" rounded/>
          <Media.Body>
            <h5>{item.show.type} <span>  <i class="far fa-clock"></i> </span>{item.show.schedule.time} <span> On </span>{item.show.network.name} Channel</h5>
            <div>
            <div className='todaySummary' dangerouslySetInnerHTML={ { __html: item.show.summary } }></div>
            </div>           
          </Media.Body>
        </Media>
           );
          })}
        </ul> 
        </Row>
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

         </div>
        )}
      </Container>
    );
  }
}

export default OnShow;
