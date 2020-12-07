import React from 'react';
import styled from 'styled-components';
import Fade from 'react-reveal/Fade';
import { MdClear } from 'react-icons/md';

const PropertyReviewModal = ({ openReviewModal, reviews }) => (
  <ReviewModal>
    <Fade bottom>
      <div className='modalContainer'>
        <div className='modalHeader'>
          <i onClick={openReviewModal}>
            <MdClear size={25} />
          </i>
        </div>
      </div>
    </Fade>
  </ReviewModal>
);

export default PropertyReviewModal;

const ReviewModal = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #00000080;
  z-index: 10000;
  svg {
    margin-right: 12px;
    width: 20px;
    height: 20px;
    padding-top: 5ps;
    margin-bottom: -5px;
  }
`;
