import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import Photo from "./Photo";

const PhotosContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;
export default class Photos extends React.Component {
  state = {
    photos: [],
  };

  componentDidMount() {
    const { albumId } = this.props.match.params;

    fetch("https://jsonplaceholder.typicode.com/photos")
      .then((res) => res.json())
      .then((res) => res.filter((item) => item.albumId === +albumId))
      .then((res) => this.setState({ photos: res }));
  }

  render() {
    const { photos } = this.state;
    const { userId } = this.props.match.params;

    return (
      <div>
        <h1>Photos</h1>
        <Link to={`/albums/${userId}`}>Назад</Link>
        <PhotosContainer>
          {photos.map((photo) => (
            <Photo key={photo.id} photo={photo} />
          ))}
        </PhotosContainer>
      </div>
    );
  }
}
