import React, { useEffect } from 'react';
import Slider from 'react-slick';
import Fade from 'react-reveal/Fade';
import styled from 'styled-components';
import { BiArrowBack } from 'react-icons/bi';

const GalleryModal = ({ closeGalleryModal, propertyImages }) => {
  const settings = {
    centerMode: true,
    rows: 1,
    columns: 1,
    fade: true,
    dots: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    centerPadding: 0,
  };

  useEffect(() => {
    document.body.style.position = 'fixed';
    document.body.style.top = `-${window.scrollY}px`;
    return () => {
      const scrollY = document.body.style.top;
      document.body.style.position = '';
      document.body.style.top = '';
      window.scrollTo(0, parseInt(scrollY || '0') * -1);
    };
  }, []);

  return (
    <>
      <GalleryModalBox>
        <Fade bottom>
          <div className='imgBox'>
            <div className='modalHeader'>
              <button className='xBtn' onClick={closeGalleryModal}>
                <BiArrowBack size={25} />
              </button>
            </div>
            <Slider {...settings}>
              {propertyImages.map((image, idx) => {
                return (
                  <div key={idx} className='imgWrapper'>
                    <img src={image} alt={`property ${idx}`} />
                  </div>
                );
              })}
            </Slider>
          </div>
        </Fade>
      </GalleryModalBox>
    </>
  );
};

const GalleryModalBox = styled.div`
  ${({ theme }) => {
    return theme.flexSet({
      justifyContent: 'center',
      alignItems: 'center',
    });
  }};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: white;
  z-index: 1000000;

  .xBtn {
    width: 50px;
    height: 50px;
    background-color: white;
  }

  .imgBox {
    width: 900px;
    height: 700px;

    .imgWrapper {
      width: 800px;
      height: 600px;
    }

    img {
      object-fit: cover;
      height: 100%;
      width: 100%;
      border-radius: 20px;
      transition: 0.2s;
      transition-timing-function: ease-in-out;
      &:hover {
        filter: brightness(80%);
      }
    }
    .slick-arrow {
      display: none;
    }
    .slick-dots {
      top: 620px;
    }
  }
`;

export default GalleryModal;
