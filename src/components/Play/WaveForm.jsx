import React, { useEffect, useRef, useState } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
import { selectedRecordAtom, isPlayingAtom } from '../../atom';
import styled from 'styled-components';
import WaveSurfer from 'wavesurfer.js';
import PlayButton from './PlayButton';

import { mainColor } from '../../theme';

const WaveForm = () => {
  const selectedRecord = useRecoilValue(selectedRecordAtom);
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingAtom);
  const [currentTime, setCurrentTime] = useState(0);
  const [fullTime, setFullTime] = useState(0);

  const waveFormRef = useRef();
  const waveSurfer = useRef(null);

  const handlePlay = () => {
    setIsPlaying(!waveSurfer.current.isPlaying());
    waveSurfer.current.playPause();
    console.log(waveSurfer.current);
  };

  useEffect(() => {
    if (waveFormRef.current) {
      waveSurfer.current = WaveSurfer.create({
        container: waveFormRef.current,
        barWidth: 3,
        barRadius: 3,
        barGap: 2,
        barMinHeight: 1,
        cursorWidth: 1,
        backend: 'WebAudio',
        height: 180,
        progressColor: mainColor,
        responsive: true,
        waveColor: '#C4C4C4',
        cursorColor: 'transparent',
      });
      waveSurfer.current.load(selectedRecord);
      waveSurfer.current.on('finish', () => {
        setIsPlaying(false);
      });
      waveSurfer.current.on('audioprocess', () => {
        setCurrentTime(waveSurfer.current.getCurrentTime().toFixed());
      });
      waveSurfer.current.on('ready', () => {
        setFullTime(waveSurfer.current.getDuration().toFixed());
        setCurrentTime(0);
      });
    }

    Number.prototype.toMMSS = function () {
      var seconds = Math.floor(this);
      var minutes = Math.floor(seconds / 60);
      seconds -= minutes * 60; /*from  w  w w  .  j av a 2  s  . c o m*/

      if (minutes < 10) {
        minutes = '0' + minutes;
      }
      if (seconds < 10) {
        seconds = '0' + seconds;
      }
      return minutes + ':' + seconds;
    };

    return () => waveSurfer.current.destroy();
  }, [selectedRecord]);

  return (
    <WaveformContainer>
      {Number(currentTime)} / {fullTime}
      <Wave id='waveform' ref={waveFormRef} />
      <PlayButton isPlaying={isPlaying} handlePlay={handlePlay} waveSurfer={waveSurfer} />
    </WaveformContainer>
  );
};

const WaveformContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 0 25px;
  background: transparent;

  div {
    font-size: 30px;
  }
`;

const Wave = styled.div`
  width: 100%;
  margin: 25px 0;
`;

export default WaveForm;
