/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { Row, Col, Container, Button } from "react-bootstrap";
import Show from "../components/Show/ShowCard";
import ReactPaginate from "react-paginate";
import axios from "axios";

const Shows = () => {
  const [shows, setShows] = useState([]);
  const [offset, setOffset] = useState(0);
  const [perPage] = useState(12);
  const [pageCount, setPageCount] = useState(0);
  const [search, setSearch] = useState("");

  const handlePageClick = (e) => {
    const selectedPage = e.selected;
    setOffset(selectedPage + 1);
  };

  const getData = async () => {
    const { data } = await axios.get("https://api.tvmaze.com/shows", { crossDomain: true });
    const slice = data.slice(offset, offset + perPage);
    setShows(slice);
    setPageCount(Math.ceil(data.length / perPage));
  };

  const submitSearch = async (e) => {
    e.preventDefault();
    searchHandler();
  };
  const searchHandler = async () => {
    try {
      await axios.get(`https://api.tvmaze.com/shows`).then((res) => {
        let filteredShow = res.data.filter(
          (o) =>
            o.name.toLowerCase().includes(search.toLowerCase()) ||
            o.status.toString().toLowerCase().includes(search.toLowerCase()) ||
            o.language.toString().toLowerCase().includes(search.toLowerCase())
        );
        const slice = [...filteredShow].slice(offset, offset + perPage);
        setShows(slice);
        setPageCount(Math.ceil(filteredShow.length / perPage));
      });
    } catch (error) {
      alert(JSON.stringify(error.message));
    }
  };
  const handleChangeSearch = (e) => {
    setSearch(e.target.value);
    searchHandler();
  };

  useEffect(() => {
    getData();
  }, [offset]);

  return (
    <Container>
      <h1>All Shows</h1>
      <Row>
        <Col xs={12}>
          <form onSubmit={submitSearch}>
            <input
              type="text"
              value={search}
              placeholder="Name/Status/Language"
              onChange={handleChangeSearch}
              style={{ width: "90%", marginTop: "20px" }}
            />
            <span> </span>
            <Button variant="dark" size="sm">
              search
            </Button>
          </form>
        </Col>
      </Row>

      <Row>
        {shows.map((show) => (
          <Col key={show.id} xs={6} sm={6} md={6} lg={4} xl={3}>
            <Show show={show} />
            {/* <p>{show.name}</p> */}
          </Col>
        ))}
      </Row>
      <Row>
        <ReactPaginate
          previousLabel={"prev"}
          nextLabel={"next"}
          breakLabel={"..."}
          breakClassName={"break-me"}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={4}
          onPageChange={handlePageClick}
          containerClassName={"pagination"}
          subContainerClassName={"pages pagination"}
          activeClassName={"active"}
        />
      </Row>
    </Container>
  );
};

export default Shows;
