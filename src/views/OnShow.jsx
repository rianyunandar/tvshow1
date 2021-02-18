import React, { Component } from "react";
import { Row, Container, Media, Image, Carousel, Col } from "react-bootstrap";
import ReactPaginate from "react-paginate";

export class OnShow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      topShow: [],
      onShow2: [],
      loading: true,
      perPage: 6,
      currentPage: 0,
      offset: 0
    };
    this.handlePageClick = this.handlePageClick.bind(this);
  }

  async receivedData() {
    try {
      let response1 = await fetch(`http://api.tvmaze.com/shows`);
      let response2 = await fetch(`https://api.tvmaze.com/schedule`);

      const json1 = await response1.json();

      let sorted = json1.sort(function (a, b) {
        return a.rating.average < b.rating.average
          ? 1
          : b.rating.average < a.rating.average
          ? -1
          : 0;
      });

      const slicejson1 = sorted.slice(0, 4);

      const json2 = await response2.json();
      const slicejson2 = json2.slice(
        this.state.offset,
        this.state.offset + this.state.perPage
      );

      this.setState({
        topShow: slicejson1,
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

    this.setState(
      {
        currentPage: selectedPage,
        offset: offset
      },
      () => {
        this.receivedData();
      }
    );
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
            <Row>
              <Col>
                <Carousel>
                  {this.state.topShow.map((item, i) => {
                    return (
                      <Carousel.Item key={i} interval={5000}>
                        <img
                          className=" w-100 CarouselImage"
                          src={item.image ? item.image.medium : "/logo.png"}
                          alt={item.name}
                        />
                        <img
                          className="d-block CarouselImage2"
                          src={item.image ? item.image.medium : "/logo.png"}
                          alt={item.name ? item.name : "TV"}
                        />
                        <div className="CaraouselHeader">
                          <h5>Best TV Show</h5>
                        </div>
                        {/* <Image  className='todayCard d-block abcd' src={item.image ? item.image.original :"/logo.png"}  alt="Generic placeholder" rounded/> */}

                        <Carousel.Caption>
                          <div className="CaraouselShadowBox CaraouselTitle">
                            <h3>{item.name ? item.name : "TV"}</h3>
                          </div>
                          <div className="CaraouselShadowBox">
                            <p>
                              {item.genres.map((genre, id) => {
                                return <span key={id}>{genre + " "}</span>;
                              })}
                            </p>
                          </div>
                        </Carousel.Caption>
                      </Carousel.Item>
                    );
                  })}
                </Carousel>
              </Col>
            </Row>
            <h3 className="headerTitle">TV Show Today </h3>
            <Row>
              <ul className="list-unstyled border">
                {this.state.onShow2.map((item, i) => {
                  return (
                    <Media as="li" key={i}>
                      <Image
                        className="todayCard"
                        src={
                          item.show.image ? item.show.image.medium : "/logo.png"
                        }
                        alt="Generic placeholder"
                        rounded
                      />
                      <Media.Body>
                        <h5>
                          {item.show.type ?item.show.type : "TV"}{" "}
                          <span>
                            {" "}
                            <i className="far fa-clock"></i>{" "}
                          </span>
                          {item.show.schedule ? item.show.schedule.time : "00:00"} <span> On </span>
                          {item.show.network ? item.show.network.name : "TV"} Channel
                        </h5>
                        <div>
                          <div
                            className="todaySummary"
                            dangerouslySetInnerHTML={{
                              __html: item.show.summary
                            }}
                          ></div>
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
              activeClassName={"active"}
            />
          </div>
        )}
      </Container>
    );
  }
}

export default OnShow;
