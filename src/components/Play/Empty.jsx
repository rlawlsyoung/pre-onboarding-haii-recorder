import styled from 'styled-components';

const Empty = () => {
  return (
    <Section>
      <p>좌측 상단의 아이콘을 클릭하여</p>
      <p>녹음을 시작할 수 있습니다.</p>
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
  }
`;

export default Empty;
