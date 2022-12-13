import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { selectedRecordAtom } from '../../atom';
import styled from 'styled-components';
import logo from '../../assets/img/Header/haii_logo.png';

const Logo = ({ recOn }) => {
  const setSelectedRecord = useSetRecoilState(selectedRecordAtom);
  const navigate = useNavigate();

  const goHome = () => {
    recOn && navigate('/');
    setSelectedRecord('');
  };

  return (
    <Container recOn={recOn}>
      <img src={logo} alt='HAII recoder logo' onClick={goHome}></img>
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
