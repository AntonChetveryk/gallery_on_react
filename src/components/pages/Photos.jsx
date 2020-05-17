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
    isLoading: false,
  };

  componentDidMount() {
    const { albumId } = this.props.match.params;

    this.setState({ isLoading: true });

    fetch("https://jsonplaceholder.typicode.com/photos")
      .then((res) => res.json())
      .then((res) => res.filter((item) => item.albumId === +albumId))
      .then((res) => this.setState({ photos: res, isLoading: false }));
  }

  render() {
    const { photos, isLoading } = this.state;
    const { userId } = this.props.match.params;

    return (
      <div>
        <h1>Photos</h1>
        <Link to={`/albums/${userId}`}>Назад</Link>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <PhotosContainer>
            {photos.map((photo) => (
              <Photo key={photo.id} photo={photo} />
            ))}
          </PhotosContainer>
        )}
      </div>
    );
  }
}
