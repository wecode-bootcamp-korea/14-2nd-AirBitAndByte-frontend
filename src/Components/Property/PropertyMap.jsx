import React, { useEffect } from 'react';
import styled from 'styled-components';

const { kakao } = window;

const PropertyMap = (props) => {
  useEffect(() => {
    const container = document.getElementById('myMap');
const options = {
  center: new kakao.maps.LatLng(33.450701, 126.570667),
  level: 3
};
    const map = new kakao.maps.Map(container, options);
}, []);

  return (
  <section className='propertyMap'>
    <div
      id='myMap'
      style={{
        width: '1130px',
        height: '400px',
      }}></div>
  </section>)
};

const MapContents = styled.div`
  width: 100%;
  height: 100%;
`;

export default PropertyMap;
