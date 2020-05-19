import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Photo from "./Photo";
import { Modal } from "@material-ui/core";
import Slider from "../Slider";
import { getData } from "../../getDataFunc";

const PhotosContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;
export default class Photos extends React.Component {
  state = {
    photos: [],
    isLoading: false,
    isOpen: false,
    startIndex: 0,
  };

  setIsOpen = (event) => {
    const { target } = event;
    const { photos } = this.state;
    const idexOfElement = photos.findIndex((photo) => photo.id === +target.id);
    this.setState((state) => {
      return { isOpen: !state.isOpen, startIndex: idexOfElement };
    });
  };

  componentDidMount() {
    const { albumId } = this.props.match.params;

    this.setState({ isLoading: true });

    getData("https://jsonplaceholder.typicode.com/photos")
      .then((res) => res.filter((item) => item.albumId === +albumId))
      .then((res) => this.setState({ photos: res, isLoading: false }))
      .catch((error) => alert(error));
  }

  render() {
    const { photos, isLoading, isOpen, startIndex } = this.state;
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
            <Slider photos={photos} startIndex={startIndex} />
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
