import React from "react";
import { Link } from "react-router-dom";

import styled from "styled-components";

const Wrapper = styled.div`
  border: 1px solid black;
  margin: 20px;
  padding: 10px;
  width: 200px;
  font-size: 12px;
`;

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

    fetch("https://jsonplaceholder.typicode.com/albums")
      .then((res) => res.json())
      .then((res) => res.filter((item) => item.userId === +userId))
      .then((res) => this.setState({ albums: res, isLoading: false }));
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
              <Wrapper key={album.id}>
                <Link to={`/albums/${userId}/photos/${album.id}`}>
                  {album.title}
                </Link>
              </Wrapper>
            ))}
          </AlbumsContainer>
        )}
      </div>
    );
  }
}
