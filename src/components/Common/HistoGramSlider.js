import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Slider, Input } from 'antd';
import BarChart from './BarChart';

export const ChartSlider = ({ data }) => {
  let dataMax = Math.max.apply(null, data);
  let dataMin = Math.min.apply(null, data);

  const [priceValue, setPriceValue] = useState([dataMin, dataMax]);

  return (
    <HistoHramSlider>
      <BarChart data={data} highlight={priceValue} domain={[dataMin, dataMax]} />
      <Slider
        range={{ draggableTrack: true }}
        defaultValue={[dataMin, dataMax]}
        onChange={setPriceValue}
        value={priceValue}
        max={dataMax}
        min={dataMin}
      />
      <div className='inputStyle'>
        <Input
          prefix='최저가격'
          suffix='원'
          size={'smal'}
          value={priceValue[0]}
          onChange={({ target }) => setPriceValue([Number(target.value), priceValue[1]])}
        />
        <Input
          prefix='최고가격'
          suffix='원'
          value={priceValue[1]}
          onChange={({ target }) => setPriceValue([priceValue[0], Number(target.value)])}
        />
      </div>
    </HistoHramSlider>
  );
};

const HistoHramSlider = styled.div`
  canvas {
    height: 100px !important;
    margin-top: 100px;
  }
  .inputStyle {
    display: flex;

    .ant-input-affix-wrapper {
      margin: 10px;
      height: 50px;
    }

    input {
      text-align: center;
    }
  }
`;
