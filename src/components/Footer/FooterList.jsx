import React from 'react';
import styled from 'styled-components';
import { flexColumn } from '../../styles/theme';

const FooterList = ({ contentList }) => {
  return (
    <FooterListComponent>
      {contentList.map((value, index) => (
        <span key={index}>{value}</span>
      ))}
    </FooterListComponent>
  );
};
export default FooterList;

const FooterListComponent = styled.div`
  ${flexColumn}
  flex: 1;
  height: 400px;

  span {
    margin: 15px 0;
  }
`;
