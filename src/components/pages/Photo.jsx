import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  border: 1px solid black;
  margin: 20px;
  padding: 10px;
  width: 200px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  h3 {
    font-size: 12px;
  }
`;

export default class Photo extends React.Component {
  render() {
    const { photo, onClickOpeningGallery } = this.props;

    return (
      <>
        <Wrapper>
          <h3>{photo.title}</h3>
          <img
            src={photo.thumbnailUrl}
            alt="img"
            id={photo.id}
            onClick={onClickOpeningGallery}
          />
        </Wrapper>
      </>
    );
  }
}
