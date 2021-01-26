import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import queryStirng from 'query-string';
import BarChart from '../../Components/Common/BarChart';
import { Slider, Input } from 'antd';
import { LIST_API } from '../../config';
import { useHistory } from 'react-router-dom';
import { theme } from '../../styles/theme';
import { toQueryStr } from '../../Components/Common/util';
import { Modal, Button, Checkbox, Space, Collapse } from 'antd';
import _ from 'lodash';

const PlaceFilterPlaceList = ({ houseType, setHouseType, facility, setfacility, priceValue, setPriceValue }) => {
  const [houstType, setHoustType] = useState(false);
  const [moneyFilter, setMoneyFilter] = useState(false);
  const [facilityFiler, setFacilityFiler] = useState(false);
  const [priceListData, setPriceListData] = useState([0, 0]);
  const [priceMinMax, setPriceMinMax] = useState([0, 0]);

  const history = useHistory();
  const { Panel } = Collapse;

  useEffect(() => {
    const priceList = async () => {
      try {
        const listData = await axios.get(`${LIST_API}`);
        const data = listData.data.result.map((item) => Number(item.price));

        const max = Math.max.apply(null, data);
        const min = Math.min.apply(null, data);

        setPriceListData(data);
        setPriceMinMax([min, max]);
        priceValue[0] && setPriceValue([min, max]);
      } catch (err) {
        console.log('err', err);
      }
    };
    priceList();
  }, []);

  const setType = (setItem) => {
    const setList = houseType.some((item) => setItem == item);

    if (setList) {
      const list = houseType.filter((item) => setItem != item);
      setHouseType(list);
    } else {
      setHouseType([...houseType, setItem]);
    }
  };

  const setFacility = (setItem) => {
    const setList = facility.some((item) => setItem == item);

    if (setList) {
      const list = facility.filter((item) => setItem != item);
      setfacility(list);
    } else {
      setfacility([...facility, setItem]);
    }
  };

  const filterSubmit = (submit, type) => {
    const getQuery = queryStirng.parse(history.location.search);
    const query = { ...getQuery, offset: 1, [type]: submit };

    history.push({
      pathname: '/placelist',
      search: toQueryStr(query),
    });
  };

  const priceSubmit = (submit) => {
    const getQuery = queryStirng.parse(history.location.search);
    const query = { ...getQuery, offset: 1, min: submit[0], max: submit[1] };

    history.push({
      pathname: '/placelist',
      search: toQueryStr(query),
    });
  };

  return (
    <FilterComponent>
      <Space size={10}>
        <Button type='primary' ghost shape='round' size={40} onClick={() => setHoustType(true)}>
          숙소유형
        </Button>
        <Button type='primary' ghost shape='round' size={40} onClick={() => setMoneyFilter(true)}>
          요금
        </Button>
        <Button type='primary' ghost shape='round' size={40} onClick={() => setFacilityFiler(true)}>
          필터 추가히기
        </Button>
      </Space>
      <Modal
        okText='확인'
        cancelText='취소'
        type='primary'
        visible={houstType}
        mask={false}
        onCancel={() => setHoustType(false)}
        closable={false}
        okButtonProps={{ type: 'ghost' }}
        onOk={() => {
          setHoustType(false);
          filterSubmit(houseType, 'type');
        }}
      >
        <ModalStyle>
          {FILTER_HOUSE_TYPE.map(({ type, title, content }, index) => (
            <label key={index}>
              <Checkbox checked={houseType.some((filter) => filter == type)} onChange={() => setType(type)}>
                <div className='filterValue'>
                  <span className='filterTitle'>{title}</span>
                  <span className='filterContent'>{content}</span>
                </div>
              </Checkbox>
            </label>
          ))}
        </ModalStyle>
      </Modal>
      <Modal
        okText='확인'
        cancelText='취소'
        type='primary'
        visible={moneyFilter}
        mask={false}
        onCancel={() => setMoneyFilter(false)}
        closable={false}
        okButtonProps={{ type: 'ghost' }}
        onOk={() => {
          setMoneyFilter(false);
          priceSubmit(priceValue);
        }}
      >
        <ModalStyle>
          <h1>평균 1박 요금은 ₩127,194입니다</h1>
          <HistoHramSlider>
            <BarChart data={priceListData} highlight={priceValue} />
            <Slider
              range={{ draggableTrack: true }}
              defaultValue={priceMinMax}
              onChange={(value) => setPriceValue(value)}
              value={priceValue}
              max={priceMinMax[1]}
              min={priceMinMax[0]}
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
        </ModalStyle>
      </Modal>
      <Modal
        okText='확인'
        cancelText='취소'
        type='primary'
        closable={false}
        visible={facilityFiler}
        onCancel={() => setFacilityFiler(false)}
        okButtonProps={{ type: 'ghost' }}
        onOk={() => {
          setFacilityFiler(false);
          filterSubmit(facility, 'facility');
        }}
      >
        <ModalStyle>
          <h1>편의 시설</h1>
          {FILTER_FACILITY.slice(0, 4).map(({ type, title }, index) => {
            return (
              <div className='wrapStyle' key={index}>
                <Checkbox checked={facility.some((filter) => filter == type)} onChange={() => setFacility(type)}>
                  {title}
                </Checkbox>
              </div>
            );
          })}
          <Collapse ghost={true}>
            <Panel header='더보기' key='1'>
              {FILTER_FACILITY.slice(4, FILTER_FACILITY.length).map(({ type, title }, index) => {
                return (
                  <div className='wrapStyle' key={index}>
                    <Checkbox checked={facility.some((filter) => filter == type)} onChange={() => setFacility(type)}>
                      {title}
                    </Checkbox>
                  </div>
                );
              })}
            </Panel>
          </Collapse>
        </ModalStyle>
      </Modal>
    </FilterComponent>
  );
};
export default PlaceFilterPlaceList;

const FilterComponent = styled.div`
  display: flex;
  position: relative;
  margin-bottom: 10px;
  z-index: 99;

  .ant-modal-content {
    border-radius: 100px !important;
  }

  .filter {
    margin-right: 10px;
    padding: 10px;
    font-size: 15px;
    border: 1px solid #b0b0b0;
    border-radius: 25px;

    &:hover {
      border: 1px solid ${theme.black};
    }
  }
`;

const ModalStyle = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 10px;

  h1 {
    flex: 100%;
    font-size: 18px;
  }

  label {
    display: flex;
    align-items: center;
    margin: 5px 0;

    .filterValue {
      display: flex;
      flex-direction: column;
      margin-left: 10px;
    }
  }

  .ant-collapse-content-box {
    display: flex;
    flex-wrap: wrap;
    padding: 0;
    margin: 0;
  }

  .wrapStyle {
    width: 50%;

    .ant-checkbox-wrapper {
      padding: 5px !important;
      margin: 0 !important;
    }
  }
`;

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

const FILTER_HOUSE_TYPE = [
  { type: 1, title: '집 전체', content: '집 전체를 단독으로 사용합니다.' },
  {
    type: 2,
    title: '개인실',
    content: '침실은 단독으로 쓰고, 이외의 공간은 호스트나 다른 게스트와 함께 이용할 수도 있습니다.',
  },
  { type: 3, title: '호텔 객실', content: '부티크 호텔, 호스텔 등의 개인실이나 다인실을 이용합니다.' },
  {
    type: 4,
    title: '다인실',
    content: '사적 공간 없이, 침실이나 욕실 등을 호스트나 다른 게스트와 함께 이용합니다.',
  },
];

const FILTER_FACILITY = [
  { type: 1, title: '무선 인터넷' },
  { type: 2, title: '업무 전용공간' },
  { type: 3, title: '난방' },
  { type: 4, title: 'TV' },
  { type: 5, title: '에어컨' },
  { type: 6, title: '온수' },
  { type: 7, title: '엘리베이터' },
  { type: 8, title: '건물 내 무료 주차' },
  { type: 9, title: '주방' },
  { type: 10, title: '게스트 전용 출입문' },
  { type: 11, title: '장기 숙박 가능' },
  { type: 12, title: '헤어드라이어' },
  { type: 13, title: '옷걸이' },
  { type: 14, title: '샴푸' },
  { type: 15, title: '소화기' },
  { type: 16, title: '일산화탄소 경보기' },
  { type: 17, title: '구급 상자' },
  { type: 18, title: '화재경보기' },
  { type: 19, title: '건조기' },
  { type: 20, title: '다리미' },
  { type: 21, title: '세탁기' },
  { type: 22, title: '암막 커튼' },
  { type: 23, title: '냉장고' },
  { type: 24, title: '전자레인지' },
  { type: 25, title: '기본 조리도구' },
  { type: 26, title: '식기류' },
  { type: 27, title: '디지털 도어록' },
  { type: 28, title: '여행 가방 보관 가능' },
  { type: 29, title: '침구' },
  { type: 30, title: '샤워젤' },
  { type: 31, title: '바베큐 그릴' },
  { type: 32, title: '정원 또는 뒷마당' },
];
