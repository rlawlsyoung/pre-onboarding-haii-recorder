import { useState } from 'react';
import { FaStop, FaMicrophoneAlt } from 'react-icons/fa';
import styled from 'styled-components';
import { mainColor } from '../../theme';

const RecordButton = ({
  recOn,
  startRecord,
  stopRecord,
  startHandler,
  stopHandler,
  buttonClicked,
  setButtonClicked,
  setIsMessageOn,
}) => {
  const [btnDisabled, setBtnDisabled] = useState(false);
  const clickButton = () => setButtonClicked(!buttonClicked);
  return (
    <RecordButtonBlock btnDisabled={btnDisabled}>
      <button
        disabled={btnDisabled}
        onClick={() => {
          clickButton();
          if (recOn) {
            startRecord();
            startHandler();
            setIsMessageOn(false);
            setBtnDisabled(true);
            setTimeout(() => setBtnDisabled(false), 3000);
          } else {
            stopRecord();
            stopHandler();
          }
        }}
      >
        {buttonClicked ? <FaStop className='icon' /> : <FaMicrophoneAlt className='icon' />}
      </button>
    </RecordButtonBlock>
  );
};

const RecordButtonBlock = styled.div`
  button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 125px;
    height: 125px;
    border: none;
    border-radius: 100%;
    background-color: ${props => (props.btnDisabled ? '#016373' : mainColor)};
    color: white;
    cursor: pointer;

    .icon {
      transform: scale(3);
    }

    &:active {
      background-color: #016373;
    }
  }

  @media screen and (max-width: 480px) {
    button {
      width: 100px;
      height: 100px;

      .icon {
        transform: scale(2);
      }
    }
  }
`;

export default RecordButton;
