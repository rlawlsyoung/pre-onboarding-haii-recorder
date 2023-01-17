import { useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { clickedNameAtom, isPlayingAtom } from '../../atom';
import styled from 'styled-components';
import logo from '../../assets/img/Header/haii_logo.png';

const Logo = ({ recOn }) => {
  const clickedName = useRecoilValue(clickedNameAtom);
  const setIsPlaying = useSetRecoilState(isPlayingAtom);
  const navigate = useNavigate();
  const location = useLocation();

  const goHome = useCallback(() => {
    if (location.pathname === '/record') {
      setIsPlaying(false);
    }
    if (clickedName) {
      recOn && navigate(`/${clickedName}`);
    } else recOn && navigate('/');
  }, [clickedName, recOn]);

  return (
    <Container recOn={recOn}>
      <img src={logo} alt='HAII recorder logo' onClick={goHome}></img>
    </Container>
  );
};

let Container = styled.div`
  width: 40%;
  max-width: 250px;
  min-width: 180px;
  line-height: 35px;
  text-align: center;
  cursor: ${props => (props.recOn ? 'pointer' : 'not-allowed')};
  img {
    width: 100%;
  }
`;

export default Logo;
