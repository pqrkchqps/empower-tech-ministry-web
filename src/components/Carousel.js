import React, { Component, Children, cloneElement } from "react";
import styled from "styled-components";

export const CarouselContainer = styled.div`
  display: flex;
  transition: ${(props) => (props.sliding ? "none" : "transform 1s ease")};
  transform: ${(props) => {
    if (!props.sliding) return "translateX(-100%))";
    if (props.direction === "prev") return "translateX(-100%)";
    if (props.direction === "next") return "translateX(100%)";
    return "translateX(0%)";
  }};
`;

export const Wrapper = styled.div`
  width: 100%;
  overflow: hidden;
`;

export const CarouselSlot = styled.div`
  flex: 1 0 100%;
  flex-basis: 100%;
  order: ${(props) => props.order};
`;

class Carousel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      position: 0,
      direction: props.children.length === 2 ? "prev" : "next",
      sliding: false,
    };
  }

  getOrder(itemIndex) {
    const { position } = this.state;
    const { children } = this.props;
    const numItems = children.length;

    if (numItems === 2) return itemIndex;

    if (itemIndex - position < 0)
      return numItems - Math.abs(itemIndex - position);
    return itemIndex - position;
  }

  doSliding = (direction, position) => {
    this.setState({
      sliding: true,
      direction,
      position,
    });

    setTimeout(() => {
      this.setState({
        sliding: false,
      });
    }, 50);
  };

  nextSlide = () => {
    const { position } = this.state;
    const { children } = this.props;
    const numItems = children.length;

    if (numItems === 2 && position === 1) return;

    this.doSliding("next", position === numItems - 1 ? 0 : position + 1);
  };

  prevSlide = () => {
    const { position } = this.state;
    const { children } = this.props;
    const numItems = children.length;

    if (numItems === 2 && position === 0) return;

    this.doSliding("prev", position === 0 ? numItems - 1 : position - 1);
  };

  render() {
    const { children } = this.props;
    const { sliding, direction, position } = this.state;

    const childrenWithProps = Children.map(children, (child) =>
      cloneElement(child, {
        numSlides: children.length || 1,
      })
    );

    return (
      <div>
        <Wrapper>
          <CarouselContainer
            sliding={sliding}
            direction={direction}
            numSlides={childrenWithProps.length}
          >
            {childrenWithProps.map((child, index) => (
              <CarouselSlot
                key={index}
                order={this.getOrder(index)}
                numSlides={childrenWithProps.length}
                position={position}
              >
                {child}
              </CarouselSlot>
            ))}
          </CarouselContainer>
        </Wrapper>
        <button onClick={() => this.prevSlide()}>Prev</button>
        <button onClick={() => this.nextSlide()}>Next</button>
      </div>
    );
  }
}

export default Carousel;
