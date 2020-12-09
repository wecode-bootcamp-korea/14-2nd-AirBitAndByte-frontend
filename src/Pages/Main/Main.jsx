import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setNavState } from '../../Components/store/actions';
import styled from 'styled-components';
import RecommendedPlaces from './RecommendedPlaces';

const Main = (props) => {
  const dispatch = useDispatch();

  useEffect(() => dispatch(setNavState('main')), []);

  return (
    <MainComponent>
      <MainBackgroundImg>
        <img src='images/mainimage.jpeg' alt='배경 이미지' />
        <label>
          이제, 여행은
          <br /> 자랑할 만한 곳에서
        </label>
      </MainBackgroundImg>
      <RecommendedPlaces />
    </MainComponent>
  );
};

export default Main;

const MainComponent = styled.div`
  position: relative;
  top: -90px;
`;

const MainBackgroundImg = styled.div`
  img {
    width: 100%;
    max-height: 1080px;
    top: -100px;
    z-index: -1;
  }

  label {
    position: absolute;
    font-size: 3rem;
    font-weight: bold;
    top: 17%;
    left: 40px;
    line-height: 200%;
    color: white;
  }
`;
