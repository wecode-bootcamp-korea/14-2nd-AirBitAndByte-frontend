import React, { useEffect } from 'react';
import styled from 'styled-components';
import { flexCenter } from '../../styles/theme'; // 추후 사용 예정

import { BiArrowBack } from 'react-icons/bi';

const GalleryModal = ({ closeGalleryModal, imgList }) => {
  useEffect(() => {
    document.body.style.cssText = `position: fixed; top: -${window.scrollY}px`;
    return () => {
      const scrollY = document.body.style.top;
      document.body.style.cssText = `position: ""; top: "";`;
      window.scrollTo(0, parseInt(scrollY || '0') * -1);
    };
  }, []);

  return (
    <>
      <GalleryModalBox>
        <button className='xBtn' onClick={closeGalleryModal}>
          <BiArrowBack size={25} />
        </button>
        <div className='imgBox'>
          {imgList.map((image) => (
            <div key={image.id} className='imgWrapper'>
              <img src={image.src} alt={`property ${image.id}`} />
            </div>
          ))}
        </div>
      </GalleryModalBox>
    </>
  );
};

const GalleryModalBox = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  background-color: white;
  button {
    width: 50px;
    height: 50px;
    background-color: white;
  }
  .imgBox {
    height: fit-content;
    display: grid;
    grid-template-rows: repeat(16, 1fr);
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 10px;
    width: 800px;
    overflow-y: scroll;
    .imgWrapper {
      height: 100%;
      width: 100%;
      &:nth-child(1) {
        grid-area: 1 / 1 / span 2 / span 2;
      }
      overflow: hidden;
      img {
        object-fit: fill;
        height: 100%;
        width: 100%;
        transition: 0.2s;
        transition-timing-function: ease-in-out;
        &:hover {
          filter: brightness(80%);
        }
      }
    }
  }
`;

export default GalleryModal;
