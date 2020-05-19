import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { getData } from "../../getDataFunc";

import Album from "./Album";

const AlbumsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export default class Albums extends React.Component {
  state = {
    albums: [],
    isLoading: false,
  };

  componentDidMount() {
    const { userId } = this.props.match.params;

    this.setState({ isLoading: true });

    getData("https://jsonplaceholder.typicode.com/albums")
      .then((res) => res.filter((item) => item.userId === +userId))
      .then((res) => this.setState({ albums: res, isLoading: false }))
      .catch((error) => alert(error));
  }
  render() {
    const { albums, isLoading } = this.state;
    const { userId } = this.props.match.params;

    return (
      <div>
        <h1>Albums</h1>
        <Link to={`/`}>Назад</Link>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <AlbumsContainer>
            {albums.map((album) => (
              <Album album={album} userId={userId} key={album.id} />
            ))}
          </AlbumsContainer>
        )}
      </div>
    );
  }
}
