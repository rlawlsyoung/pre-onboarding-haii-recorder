import { useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { selectedRecordAtom } from '../atom';
import styled from 'styled-components';
import Empty from '../components/Play/Empty';
import WaveForm from '../components/Play/WaveForm';

const Play = () => {
  const selectedRecord = useRecoilValue(selectedRecordAtom);
  const params = useParams();

  return (
    <Section>
      {params.id && selectedRecord ? (
        <Container>
          <Title className='title'>{params.id}</Title>
        </Container>
      ) : (
        <Empty />
      )}

      {params.id && selectedRecord ? <WaveForm selectedRecord={selectedRecord} /> : null}
    </Section>
  );
};

const Section = styled.section`
  margin-top: 20%;
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  width: 90%;
  margin: auto;
`;

const Title = styled.h1`
  font-size: 25px;
  font-weight: 700;

  @media screen and(max-width: 480px) {
    .title {
      font-size: 15px;
    }
  }
`;

export default Play;
