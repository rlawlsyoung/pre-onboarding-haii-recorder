import { useNavigate } from 'react-router-dom';
import { FaMicrophoneAlt } from 'react-icons/fa';
import styled from 'styled-components';

import { mainColor } from '../../Theme';

const ToRecordBtn = ({ recOn }) => {
  const navigate = useNavigate();

  const goHome = () => {
    recOn && navigate('/record');
  };
  return (
    <Container recOn={recOn} onClick={goHome}>
      <FaMicrophoneAlt className='record-icon' alt='go to record' />
    </Container>
  );
};

let Container = styled.div`
  text-align: center;
  line-height: 35px;
  cursor: ${props => (props.recOn ? 'pointer' : 'not-allowed')};

  .record-icon {
    font-size: 225%;
    color: ${mainColor};
  }
`;

export default ToRecordBtn;
