import React, { useState, useEffect } from "react";
import axios from "axios";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styled from 'styled-components';
import Slider from 'react-slick';

const CarouselContainer = styled.div`
  width: 80%;
  margin: 0 auto;

  .slick-prev:before,
  .slick-next:before {
    font-family: 'slick';
    font-size: 30px;
    line-height: 1;
    opacity: 0.65;
    color: #000000;
    -webkit-font-smoothing: antialiased;
  }
`;

const Image = styled.img`
  width: ${props => props.isSingle ? '70%' : '95%'};
  border-radius: 10px;
  margin: 0 auto;
  height: 150px;
`;

const Carousel = ({ contentId }) => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    fetchImages();
  }, [contentId]);

  const fetchImages = async () => {
    try {
      const imageUrl = `/B551011/KorService1/detailImage1?MobileOS=ETC&MobileApp=todaysDate&_type=json&contentId=${contentId}&imageYN=Y&subImageYN=Y&numOfRows=9&pageNo=1&serviceKey=${process.env.REACT_APP_FESTIVAL_API_KEY}`;
      const response = await axios.get(imageUrl, {
        headers: {
          "x-requested-with": "xhr",
        },
      });

      const {
        data: {
          response: {
            body: {
              items: { item },
            },
          },
        },
      } = response;

      if (item) {
        const extractedImages = item.map((imageItem) => ({
          contentid: imageItem.contentid,
          originimgurl: imageItem.originimgurl,
        }));

        setImages(extractedImages);
        console.log('이미지 가져오기ㅠㅠ', extractedImages);
      }
    } catch (error) {
      console.error('이미지 호출 에러!!', error);
    }
  };

  const renderImages = () => {
    if (images.length === 1) {
      return (
        <div>
          <Image src={images[0].originimgurl} isSingle />
        </div>
      );
    } else {
      return images.map((image, index) => (
        <div key={index}>
          <Image src={image.originimgurl} />
        </div>
      ));
    }
  };

  const settings = {
    dots: true,
    arrows: true,
    slidesToShow: images.length < 3 ? images.length : 3,
    slidesToScroll: 2,
    infinite: images.length >= 3,
    speed: 500,
    prevArrow: <button className="slick-prev" />,
    nextArrow: <button className="slick-next" />,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
        },
      },
    ],
  };

  return (
    <CarouselContainer>
      <Slider {...settings}>
        {renderImages()}
      </Slider>
    </CarouselContainer>
  );
};

export default Carousel;
