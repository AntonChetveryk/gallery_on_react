import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Photo from "./Photo";
import { Modal } from "@material-ui/core";
import Slider from "../Slider";
import { fetchData } from "../../fetchData";

const PhotosContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;
export default class Photos extends React.Component {
  state = {
    photos: [],
    isLoading: false,
    isOpenModal: false,
    startIndex: 0,
  };

  onClickOpeningGallery = (event) => {
    const { photos } = this.state;
    const startIndexGallery = photos.findIndex(
      (photo) => photo.id === Number(event.target.id)
    );
    this.updateIsOpen(true);
    this.updateStartIndex(startIndexGallery);
  };

  updateStartIndex = (value) => {
    this.setState({ startIndex: value });
  };

  updateIsOpen = (value) => {
    this.setState({ isOpenModal: value });
  };

  onCloseGallery = () => {
    this.updateIsOpen(false);
    this.updateStartIndex(0);
  };

  componentDidMount() {
    const { albumId } = this.props.match.params;

    this.setState({ isLoading: true });

    fetchData(`https://jsonplaceholder.typicode.com/albums/${albumId}/photos`)
      .then((res) => {
        this.setState({ photos: res, isLoading: false });
      })
      .catch((error) => alert(error));
  }

  render() {
    const { photos, isLoading, isOpenModal, startIndex } = this.state;
    const { userId } = this.props.match.params;

    return (
      <div>
        <h1>Photos</h1>
        <Modal
          open={isOpenModal}
          onClose={this.onCloseGallery}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          <div className="slider-position">
            <Slider photos={photos} startIndex={startIndex} />
          </div>
        </Modal>

        <Link to={`/albums/${userId}`}>Назад</Link>

        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <PhotosContainer>
            {photos.map((photo) => (
              <Photo
                key={photo.id}
                photo={photo}
                onClickOpeningGallery={this.onClickOpeningGallery}
              />
            ))}
          </PhotosContainer>
        )}
      </div>
    );
  }
}
