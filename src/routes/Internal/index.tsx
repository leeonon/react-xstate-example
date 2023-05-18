import styled from 'styled-components';

const Container = styled.div`
  position: absolute;
`;

export const InternalTransition = () => {
  return (
    <Container>
      <i className="box-item">1</i>
    </Container>
  );
};

export default InternalTransition;
