import { useState, useCallback, useEffect, useRef } from 'react';
import { useRecoilState } from 'recoil';
import { isMessageOnAtom } from '../atom';
import { ref, uploadBytes } from 'firebase/storage';
import storage from '../firebase';
import RecordButton from '../components/Record/RecordButton';
import MaximumSeconds from '../components/Record/MaximumSeconds';
import SaveComplete from '../components/Record/SaveComplete';
import styled from 'styled-components';

const Record = ({ recOn, setRecOn }) => {
  const [isMessageOn, setIsMessageOn] = useRecoilState(isMessageOnAtom);
  const [stream, setStream] = useState();
  const [media, setMedia] = useState();
  const [source, setSource] = useState();
  const [analyser, setAnalyser] = useState();
  const [audio, setAudio] = useState();
  const [audioUrl, setAudioUrl] = useState();
  const [count, setCount] = useState(0);
  const [buttonClicked, setButtonClicked] = useState(false);
  const [maxSeconds, setMaxSeconds] = useState(30);
  const countRef = useRef(null);

  useEffect(() => {
    if (audioUrl && recOn) {
      onSubmitAudioFile();
    }
  }, [recOn]);

  useEffect(() => {
    if (audio) uploadAudio();
  }, [audio]);

  let today = new Date();
  let year = today.getFullYear();
  let month = ('0' + (today.getMonth() + 1)).slice(-2);
  let date = ('0' + today.getDate()).slice(-2);
  let hours = ('0' + today.getHours()).slice(-2);
  let minutes = ('0' + today.getMinutes()).slice(-2);
  let seconds = ('0' + today.getSeconds()).slice(-2);

  const uploadAudio = useCallback(() => {
    if (audio == null) return;
    const audioRef = ref(storage, `audio/${audio.name}`);
    uploadBytes(audioRef, audio).then(() => {
      setIsMessageOn(true);
    });
  }, [audio]);

  const countHandler = useCallback(() => {
    countRef.current = setInterval(() => setCount(c => c + 1), 1000);
  }, []);

  const stopHandler = useCallback(() => {
    clearInterval(countRef.current);
    countRef.current = null;
    setCount(0);
  }, []);

  const toHHMMSS = useCallback(hour => {
    let myNum = parseInt(hour, 10);
    let hours = Math.floor(myNum / 3600);
    let minutes = Math.floor((myNum - hours * 3600) / 60);
    let seconds = myNum - hours * 3600 - minutes * 60;
    if (hours < 10) {
      hours = '0' + hours;
    }
    if (minutes < 10) {
      minutes = '0' + minutes;
    }
    if (seconds < 10) {
      seconds = '0' + seconds;
    }
    return hours + ':' + minutes + ':' + seconds;
  }, []);

  const startRecord = useCallback(() => {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const analyser = audioCtx.createScriptProcessor(0, 1, 1);
    setAnalyser(analyser);

    const makeSound = stream => {
      const source = audioCtx.createMediaStreamSource(stream);
      setSource(source);
      source.connect(analyser);
      analyser.connect(audioCtx.destination);
    };
    navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorder.start();
      setStream(stream);
      setMedia(mediaRecorder);
      makeSound(stream);

      analyser.onaudioprocess = e => {
        if (e.playbackTime > maxSeconds + 0.9) {
          stream.getAudioTracks().forEach(track => {
            track.stop();
            stopHandler();
            setButtonClicked(false);
          });
          mediaRecorder.stop();
          analyser.disconnect();
          audioCtx.createMediaStreamSource(stream).disconnect();

          mediaRecorder.ondataavailable = e => {
            setAudioUrl(e.data);
            setRecOn(true);
          };
        } else {
          setRecOn(false);
        }
      };
    });
  }, [maxSeconds]);

  const stopRecord = useCallback(() => {
    media.ondataavailable = e => {
      setAudioUrl(e.data);
      setRecOn(true);
    };
    stream.getAudioTracks().forEach(track => {
      track.stop();
    });

    media.stop();
    analyser.disconnect();
    source.disconnect();
  }, [media, stream, analyser, source]);

  const onSubmitAudioFile = useCallback(() => {
    const sound = new File([audioUrl], `${year}-${month}-${date} | ${hours}:${minutes}:${seconds}.mp3`, {
      lastModified: new Date().getTime(),
      type: 'audio',
    });
    setAudio(sound);
  }, [audioUrl]);

  return (
    <RecordBlock recOn={recOn}>
      <p className='timer'>{toHHMMSS(count)}</p>
      <MaximumSeconds recOn={recOn} maxSeconds={maxSeconds} setMaxSeconds={setMaxSeconds} />
      <div className='recording-alert'>
        <div className='recording-light'>
          <div className={recOn ? 'backlight-off' : 'backlight-on'} />
        </div>
        REC
      </div>
      <RecordButton
        recOn={recOn}
        startRecord={startRecord}
        stopRecord={stopRecord}
        countHandler={countHandler}
        stopHandler={stopHandler}
        buttonClicked={buttonClicked}
        setButtonClicked={setButtonClicked}
        setIsMessageOn={setIsMessageOn}
      />
      <SaveComplete isMessageOn={isMessageOn} setIsMessageOn={setIsMessageOn} />
    </RecordBlock>
  );
};

const RecordBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 80vh;
  .timer {
    margin: 40px 0 30px 0;
    font-size: 48px;
    font-weight: 700;
  }
  .recording-alert {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 90px 0 30px 0;
    font-size: 20px;
    font-weight: 700;
    color: ${props => (props.recOn ? 'black' : 'red')};

    .recording-light {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 19px;
      width: 19px;
      border-radius: 100%;
      margin-right: 5px;
      background-color: ${props => (props.recOn ? 'black' : 'red')};
      animation: clickEffect 0.8s ease-out;

      .backlight-on {
        position: absolute;
        width: 38px;
        height: 38px;
        border-radius: 20px;
        background-color: rgba(208, 107, 0, 0.6);
        animation: scale 2s infinite alternate;
      }
    }
  }
  @keyframes scale {
    0%,
    50% {
      transform: scale(0);
    }
    100% {
      transform: scale(1);
    }
  }

  @media screen and (max-width: 480px) {
    .timer {
      font-size: 32px;
      font-weight: 700;
    }
    .recording-alert {
      font-size: 16px;
      .recording-light {
        height: 13px;
        width: 13px;

        .backlight-on {
          width: 26px;
          height: 26px;
        }
      }
    }
  }
`;

export default Record;
