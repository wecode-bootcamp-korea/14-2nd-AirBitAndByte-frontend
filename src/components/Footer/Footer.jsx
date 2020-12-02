import React from 'react';
import FooterList from './FooterList';
import styled from 'styled-components';
import { flexCenter } from '../../styles/theme';

const Footer = (props) => {
  return (
    <FooterComponent>
      {FooterDataList.map((footData, index) => (
        <FooterList contentList={footData} key={index} />
      ))}
    </FooterComponent>
  );
};
export default Footer;

const FooterComponent = styled.div`
  ${flexCenter}
  position: relative;
  padding: 60px;
  border-top: 1px solid #dddddd;
  background-color: #f7f7f7;
  font-size: 17px;
  font-weight: 400;
`;

const FooterDataList = [
  [
    '소개',
    '에어비앤비 이용 방법',
    '뉴스룸',
    '에어비앤비 플러스',
    '에어비앤비 Luxe',
    '호텔투나잇',
    '에어비앤비 비즈니스 프로그램',
    '올림픽',
    '채용정보',
  ],
  ['커뮤니티', '다양성 및 소속감', '접근성', '에어비앤비 어소시에이트', '구호 인력을 위한 숙소', '친구 초대하기'],
  [
    '호스팅하기',
    '숙소 호스팅',
    '온라인 체험 호스팅하기',
    '체험 호스팅하기',
    '책임감 있는 호스팅',
    'Open Homes',
    '자료 센터',
    '커뮤니티 센터',
  ],
  [
    '에어비앤비 지원',
    '에어비앤비의 코로나19 대응 방안',
    '도움말 센터',
    '예약 취소 옵션',
    '에어비앤비 이웃 민원 지원',
    '신뢰와 안전',
  ],
];
