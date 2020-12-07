import React, { useEffect } from 'react';
import Slider from 'react-slick';
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
        <div className='imgBox'>
          <div className='modalHeader'>
            <button className='xBtn' onClick={closeGalleryModal}>
              <BiArrowBack size={25} />
            </button>
          </div>
          <Slider {...settings}>
            {propertyImages.map((image) => {
              return (
                <div key={image.id} className='imgWrapper'>
                  <img src={image.src} alt={`property ${image.id}`} />
                </div>
              );
            })}
          </Slider>
        </div>
      </GalleryModalBox>
    </>
  );
};

const GalleryModalBox = styled.div`
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
    position: absolute;
    width: 900px;
    height: 700px;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);

    .imgWrapper {
      width: 800px;
      height: 600px;
      /* overflow: hidden; */
    }
    
    img {
      object-fit: cover;
      height: 100%;
      width: 100%;
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
