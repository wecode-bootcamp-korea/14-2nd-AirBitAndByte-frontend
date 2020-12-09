import React, { useCallback, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import GalleryModal from './GalleryModal';
import { theme } from '../../styles/theme';
import { BsGrid3X3Gap } from 'react-icons/bs';

const PropertyGallery = ({ propertyImages, isLoading }) => {
  const [isGalleryModalOn, toggleGalleryModalOn] = useState(false);

  const handleGalleryModal = useCallback(() => {
    toggleGalleryModalOn(!isGalleryModalOn);
  }, [isGalleryModalOn]);

  const closeGalleryModal = () => {
    toggleGalleryModalOn(false);
  };

  return (
    <>
      <PropertyGalleryBox isLoading={isLoading}>
        {propertyImages.slice(0, 5).map((image, idx) => (
          <ImgWrapper key={idx} isLoading={isLoading}>
            <Image isLoading={isLoading} src={image} alt={`property ${idx}`} />
          </ImgWrapper>
        ))}
        <button className='galleryModalBtn' onClick={handleGalleryModal}>
          <BsGrid3X3Gap /> 사진 모두 보기
        </button>
      </PropertyGalleryBox>
      {isGalleryModalOn && <GalleryModal propertyImages={propertyImages} closeGalleryModal={closeGalleryModal} />}
    </>
  );
};

const PropertyGalleryBox = styled.section`
  position: relative;
  display: grid;
  grid-template-rows: repeat(2, 1fr);
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 10px;
  width: 100%;
  max-width: 1130px;
  height: 500px;
  margin: 20px 0;
  border-radius: 20px;
  overflow: hidden;
  div {
  }
  .galleryModalBtn {
    display: ${(props) => (props.isLoading ? 'none' : 'block')};
    position: absolute;
    bottom: 20px;
    right: 20px;
    color: ${(props) => props.theme.black};
    background-color: white;
    width: 135px;
    height: 35px;
    border: 1px solid ${theme.black};
    border-radius: 10px;
    font-size: 14px;
    svg {
      margin-bottom: -3px;
    }
  }
`;

const loading = keyframes` 
  0% {
    opacity: 1;
  }
  50%{
    opacity: 0.3;
  }
  100% {
    opacity : 1;
  }
`;

const ImgWrapper = styled.div`
  position: relative;
  background-color: ${(props) => (props.isLoading ? '#bdbdbd' : 'transparent')};
  animation: ${loading} 2.5s ease-in-out alternate;
  height: 100%;
  width: 100%;
  &:nth-child(1) {
    grid-area: 1 / 1 / span 2 / span 2;
  }
  overflow: hidden;
`;

const Image = styled.img.attrs((props) => ({
  src: props.src ? props.src : '/images/defaultProfile.png',
}))`
  opacity: ${(props) => (props.isLoading ? 0 : 1)};
  object-fit: cover;
  height: 100%;
  width: 100%;
  transition: 0.2s;
  transition-timing-function: ease-in-out;
  &:hover {
    filter: brightness(80%);
  }
`;

export default PropertyGallery;
