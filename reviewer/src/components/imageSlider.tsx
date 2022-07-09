import { Image } from "@chakra-ui/react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

// If you want to use your own Selectors look up the Advancaed Story book examples
const ImageSlider = (props: { slides: Array<string> }) => {
  return (
    <Carousel infiniteLoop showThumbs={false}>
      {props.slides.map((slide) => {
        return <Image src={slide} height="auto" width="800px" />;
      })}
    </Carousel>
  );
};

export default ImageSlider;
