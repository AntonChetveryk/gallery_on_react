import React from "react";
import styled from "styled-components";
import { Popover, PopoverBody } from "reactstrap";

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

export default class Photos extends React.Component {
  state = {
    popoverOpen: false,
  };

  toggle = () => {
    this.setState((state) => {
      return { popoverOpen: !state.popoverOpen };
    });
  };

  render() {
    const { photo } = this.props;
    const { popoverOpen } = this.state;

    return (
      <>
        <Wrapper>
          <h3>{photo.title}</h3>
          <img src={photo.thumbnailUrl} alt="img" id={"Popover-" + photo.id} />

          <Popover
            isOpen={popoverOpen}
            target={"Popover-" + photo.id}
            toggle={this.toggle}
            placement="bottom"
          >
            <PopoverBody>
              <img src={photo.url} alt="img" onClick={this.toggle} />
            </PopoverBody>
          </Popover>
        </Wrapper>
      </>
    );
  }
}
