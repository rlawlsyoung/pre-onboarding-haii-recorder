import styled from 'styled-components';

const Empty = () => {
  return (
    <Section>
      <p>
        환영합니다! <br />
        HAII 공유 녹음기입니다.
      </p>
      <p>
        좌측 상단의 아이콘을 클릭하여
        <br />
        녹음을 시작할 수 있습니다.
      </p>
      <p></p>
    </Section>
  );
};

const Section = styled.section`
  p {
    width: 80%;
    margin: auto;
    margin-top: 4%;
    font-size: 18px;
    font-weight: 700;
    color: gray;
    text-align: center;
    line-height: 25px;
  }
`;

export default Empty;
