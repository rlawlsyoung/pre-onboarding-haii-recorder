import { useRef, useCallback } from 'react';
import styled from 'styled-components';

import { mainColor } from '../../Theme';

const MenuBtn = ({ openSide, setOpenSide, recOn }) => {
  const clickRef = useRef();
  const BtnChange = useCallback(() => {
    if (recOn) {
      setOpenSide(!openSide);
    }
  }, [openSide, recOn]);
  return (
    <Container className={openSide && 'change'} onClick={BtnChange} ref={clickRef} recOn={recOn}>
      <div className='bar1'></div>
      <div className='bar2'></div>
      <div className='bar3'></div>
    </Container>
  );
};

const Container = styled.div`
  cursor: ${props => (props.recOn ? 'pointer' : 'not-allowed')};
  z-index: 30;
  div {
    border-radius: 5px;
  }
  .bar1,
  .bar2,
  .bar3 {
    margin: 6px 0;
    width: 35px;
    height: 5px;
    background-color: ${mainColor};
    transition: 0.4s;
  }
  &.change {
    .bar1 {
      background-color: white;
      -webkit-transform: rotate(-45deg) translate(-8px, 8px);
      transform: rotate(-45deg) translate(-8px, 8px);
    }
    .bar2 {
      background-color: white;
      opacity: 0;
    }
    .bar3 {
      background-color: white;
      -webkit-transform: rotate(45deg) translate(-8px, -8px);
      transform: rotate(45deg) translate(-8px, -8px);
    }
  }
`;

export default MenuBtn;
