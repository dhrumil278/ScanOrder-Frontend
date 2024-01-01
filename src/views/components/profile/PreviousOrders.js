import React from 'react';
import { useState } from 'react';
import { Code } from 'react-feather';
import {
  Card,
  CardBody,
  CardHeader,
  CardImg,
  CardTitle,
  Carousel,
  CarouselControl,
  CarouselIndicators,
  CarouselItem,
  Col,
  Collapse,
  Row,
} from 'reactstrap';

import sliderImage1 from '@src/assets/images/slider/01.jpg';
import sliderImage2 from '@src/assets/images/slider/02.jpg';
import sliderImage3 from '@src/assets/images/slider/03.jpg';

const images = [
  {
    src: sliderImage2,
    id: 1,
  },
  {
    src: sliderImage3,
    id: 2,
  },
  {
    src: sliderImage1,
    id: 3,
  },
];

function PreviousOrders() {
  // ** State
  const [isOpen, setIsOpen] = useState(false);
  const abc =
    require('@src/assets/images/portrait/small/avatar-s-1.jpg').default;
  // ** To toggle collapse
  const toggle = () => setIsOpen(!isOpen);

  // ** States
  const [animating, setAnimating] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);

  const onExiting = () => {
    setAnimating(true);
  };

  const onExited = () => {
    setAnimating(false);
  };

  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === images.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  };

  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? images.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  };

  const goToIndex = (newIndex) => {
    if (animating) return;
    setActiveIndex(newIndex);
  };

  const slides = images.map((item) => {
    return (
      <CarouselItem onExiting={onExiting} onExited={onExited} key={item.id}>
        <img src={item.src} className="img-fluid" alt={item.id} />
      </CarouselItem>
    );
  });
  return (
    <>
      <Card className="card-snippet">
        <Row className="p-1 align-items-center">
          <Col xs="4">
            <img
              className="rounded img-fluid"
              src={abc}
              alt="Card image"
              width={100}
              height={100}
            />
          </Col>
          <Col xs="8" className="px-0">
            <CardHeader className="p-0 px-1">
              <CardTitle tag="h4">This is Title</CardTitle>
            </CardHeader>
            <CardBody className="p-0 px-1 pt-1">
              <p className="mb-0">Lorem ipsum dolor sit amet consectetur</p>
              <p className="fs-6 mb-0 text-end">Qty : 1</p>
            </CardBody>
          </Col>
        </Row>
      </Card>

      <Carousel
        activeIndex={activeIndex}
        next={next}
        previous={previous}
        keyboard={false}
      >
        <CarouselIndicators
          items={images}
          activeIndex={activeIndex}
          onClickHandler={goToIndex}
        />
        {slides}
        <CarouselControl
          direction="prev"
          directionText="Previous"
          onClickHandler={previous}
        />
        <CarouselControl
          direction="next"
          directionText="Next"
          onClickHandler={next}
        />
      </Carousel>
    </>
  );
}

export default PreviousOrders;
