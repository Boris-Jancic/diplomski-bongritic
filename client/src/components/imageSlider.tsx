import { Image } from "@chakra-ui/react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const ImageSlider = (props: { slides: Array<string> }) => {
  return (
    <Carousel infiniteLoop showThumbs={false}>
      {props.slides.map((slide) => {
        return <Image key={String(slide.at)} src={slide} height="auto" width="800px" />;
      })}
    </Carousel>
  );
};

export default ImageSlider;
