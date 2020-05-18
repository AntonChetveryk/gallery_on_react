import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Photo from "./Photo";
import { Modal } from "@material-ui/core";
import Slider from "../Slider";

const PhotosContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;
export default class Photos extends React.Component {
  state = {
    photos: [],
    isLoading: false,
    isOpen: false,
  };

  setIsOpen = () => {
    this.setState((state) => {
      return { isOpen: !state.isOpen };
    });
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
    const { photos, isLoading, isOpen } = this.state;
    const { userId } = this.props.match.params;

    return (
      <div>
        <h1>Photos</h1>
        <Modal
          open={isOpen}
          onClose={this.setIsOpen}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          <div className="slider-position">
            <Slider photos={photos} />
          </div>
        </Modal>

        <Link to={`/albums/${userId}`}>Назад</Link>

        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <PhotosContainer>
            {photos.map((photo) => (
              <Photo key={photo.id} photo={photo} setIsOpen={this.setIsOpen} />
            ))}
          </PhotosContainer>
        )}
      </div>
    );
  }
}
