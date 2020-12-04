import React, { useEffect } from 'react';
import styled from 'styled-components';

const { kakao } = window;

const PropertyMap = ({ propertyInfo }) => {
  useEffect(() => {
    const container = document.getElementById('myMap');
    const options = {
      center: new kakao.maps.LatLng(
        propertyInfo.latitude,
        propertyInfo.longitude
      ),
      level: 3,
    };
    const map = new kakao.maps.Map(container, options);
    const zoomControl = new kakao.maps.ZoomControl();
    map.addOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC);
    const mapTypeControl = new kakao.maps.MapTypeControl();
    map.addControl(mapTypeControl, kakao.maps.ControlPosition.TORIGHT);
    map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);
    const imageSrc =
        'https://res.cloudinary.com/dm6d06vyv/image/upload/v1607266243/s35zqdg8en64faqoeclx.png',
      imageSize = new kakao.maps.Size(45, 45),
      imageOption = { offset: new kakao.maps.Point(0, 0) };

    const markerImage = new kakao.maps.MarkerImage(
        imageSrc,
        imageSize,
        imageOption
      ),
      markerPosition = new kakao.maps.LatLng(
        propertyInfo.latitude,
        propertyInfo.longitude
      );

    const marker = new kakao.maps.Marker({
      position: markerPosition,
      image: markerImage,
    });

    marker.setMap(map);
  }, []);

  return (
    <MapBox>
      <div
        id='myMap'
        style={{
          width: '100%',
          height: '480px',
        }}></div>
    </MapBox>
  );
};

export default PropertyMap;

const MapBox = styled.div`
  max-width: 1130px;
  width: 100%;
  padding: 50px 0;
  border-bottom: 1px solid #dddddd;
`
