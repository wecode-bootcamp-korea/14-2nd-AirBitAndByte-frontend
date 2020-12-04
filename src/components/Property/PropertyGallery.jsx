import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import { theme } from '../../styles/theme';
import { BsGrid3X3Gap } from 'react-icons/bs';
import GalleryModal from './GalleryModal';

const PropertyGallery = ({ propertyImages }) => {
  const [isGalleryModalOn, toggleGalleryModalOn] = useState(false);

  const handleGalleryModal = useCallback(() => {
    toggleGalleryModalOn(!isGalleryModalOn);
  }, [isGalleryModalOn]);

  const closeGalleryModal = () => {
    toggleGalleryModalOn(false);
  };

  return (
    <>
      <PropertyGalleryBox>
        {propertyImages.map((image) => (
          <div key={image.id} className='imgWrapper'>
            <img src={image.src} alt={`property ${image.id}`} />
          </div>
        ))}
        <button className='galleryModalBtn' onClick={handleGalleryModal}>
          <BsGrid3X3Gap /> 사진 모두 보기
        </button>
      </PropertyGalleryBox>
      {isGalleryModalOn && (
        <GalleryModal
          propertyImages={propertyImages}
          closeGalleryModal={closeGalleryModal}
        />
      )}
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
  height: 100%;
  max-height: 600px;
  margin: 30px 0;
  border-radius: 20px;
  overflow: hidden;
  div {
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
  .galleryModalBtn {
    position: absolute;
    bottom: 20px;
    right: 20px;
    color: ${theme.black};
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

export default PropertyGallery;
