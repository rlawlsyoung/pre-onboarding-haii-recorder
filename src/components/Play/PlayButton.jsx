import { FaPlay, FaPause } from 'react-icons/fa';
import styled from 'styled-components';

import { mainColor } from '../../theme';

const PlayButton = ({ isPlaying, handlePlay, waveSurfer }) => {
  return (
    <PlayButtonContainer onClick={handlePlay}>
      {isPlaying ? <FaPause className='stop' /> : <FaPlay className='play' />}
    </PlayButtonContainer>
  );
};

const PlayButtonContainer = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 125px;
  height: 125px;
  border: none;
  border-radius: 100%;
  background-color: ${mainColor};
  color: white;
  cursor: pointer;

  .play {
    transform: scale(2.5);
  }

  .stop {
    transform: scale(3);
  }

  @media screen and (max-width: 480px) {
    width: 100px;
    height: 100px;

    .play {
      transform: scale(1.75);
    }

    .stop {
      transform: scale(2);
    }
  }
`;

export default PlayButton;
