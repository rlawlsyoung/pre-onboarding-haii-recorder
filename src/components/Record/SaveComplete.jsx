import { useEffect } from 'react';
import styled from 'styled-components';

import { mainColor } from '../../theme';

const SaveComplete = ({ isMessageOn, setIsMessageOn }) => {
  useEffect(() => {
    isMessageOn && setTimeout(() => setIsMessageOn(false), 2900);
  }, [isMessageOn]);
  return <SaveCompleteBlock>{isMessageOn && 'Firebase Storage에 저장되었습니다.'}</SaveCompleteBlock>;
};

const SaveCompleteBlock = styled.div`
  position: absolute;
  bottom: 5vh;
  color: ${mainColor};
  font-size: 16.5px;
  font-weight: 700;
`;

export default SaveComplete;
