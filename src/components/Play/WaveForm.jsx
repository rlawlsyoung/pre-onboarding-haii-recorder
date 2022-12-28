import React, { useEffect, useRef } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
import { selectedRecordAtom, isPlayingAtom } from '../../atom';
import styled from 'styled-components';
import WaveSurfer from 'wavesurfer.js';
import PlayButton from './PlayButton';

import { mainColor } from '../../theme';

const WaveForm = () => {
  const selectedRecord = useRecoilValue(selectedRecordAtom);
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingAtom);

  const waveformRef = useRef();
  const wavesurfer = useRef(null);

  const handlePlay = () => {
    setIsPlaying(!isPlaying);
    wavesurfer.current.playPause();
  };

  useEffect(() => {
    if (waveformRef.current) {
      wavesurfer.current = WaveSurfer.create({
        container: waveformRef.current,
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
      wavesurfer.current.load(selectedRecord);
    }
    return () => wavesurfer.current.destroy();
  }, [selectedRecord]);

  return (
    <WaveformContainer>
      <Wave id='waveform' ref={waveformRef} />
      <PlayButton isPlaying={isPlaying} handlePlay={handlePlay} />
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
