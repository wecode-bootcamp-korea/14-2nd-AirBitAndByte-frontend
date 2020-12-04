import React from 'react';
<<<<<<< HEAD

const Nav = (props) => <div>Nav</div>;
=======
import Signup from './Signup';
import styled from 'styled-components';
import SignupEmail from './SignupEmail';

const Nav = ({ authService }) => (
  <NavBox>
    <Signup authService={authService} />
  </NavBox>
);

const NavBox = styled.div`
  position: relative;
`;
>>>>>>> 7735c76... [add] 구글 소셜 로그인 구현

export default Nav;
