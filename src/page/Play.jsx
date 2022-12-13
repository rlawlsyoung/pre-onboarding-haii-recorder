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
      {params.id ? (
        <Container>
          <Title className='title'>{`제목 : ${params.id}`}</Title>
        </Container>
      ) : (
        <Empty />
      )}

      {selectedRecord !== '' ? <WaveForm selectedRecord={selectedRecord} /> : null}
    </Section>
  );
};

const Section = styled.section`
  margin-top: 20%;
`;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 90%;
  margin: auto;
`;

const Title = styled.h1`
  font-size: 25px;

  @media screen and(max-width: 480px) {
    .title {
      font-size: 15px;
    }
  }
`;

export default Play;
