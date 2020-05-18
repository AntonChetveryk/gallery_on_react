import React from "react";
import { Link } from "react-router-dom";
import AlbumPhoto from "../../img/Album.jpg";

import styled from "styled-components";

const Wrapper = styled.div`
  border: 1px solid black;
  margin: 20px;
  width: 200px;
  font-size: 12px;
  text-align: center;
`;

export default class Album extends React.Component {
  state = { numberOfPhotos: 0 };

  componentDidMount() {
    const { album } = this.props;
    fetch("https://jsonplaceholder.typicode.com/photos")
      .then((res) => res.json())
      .then((res) => res.filter((photo) => photo.albumId === album.id))
      .then((res) => this.setState({ numberOfPhotos: res.length }));
  }

  render() {
    const { album, userId } = this.props;
    const { numberOfPhotos } = this.state;
    return (
      <Wrapper key={album.id}>
        <Link to={`/albums/${userId}/photos/${album.id}`}>
          <div
            className="d-flex flex-column justify-content-between"
            style={{ height: "100%" }}
          >
            <div>
              <p>{album.title}</p>
            </div>
            <div className="mt-auto">
              <img src={AlbumPhoto} alt="AlbumPhoto" width="100%" />
              <span>photos: {numberOfPhotos}</span>
            </div>
          </div>
        </Link>
      </Wrapper>
    );
  }
}
