import { useMachine } from '@xstate/react';
import styled from 'styled-components';
import internalTransition from './index.machine';

const Container = styled.div`
  display: flex;
  gap: 10px;
  width: 300px;
  height: 300px;
  border: 1px solid rgba(0,0,0,.4);
  border-radius: 6px;
`;

export const InternalTransition = () => {
  const [state, send] = useMachine(internalTransition);

  return (
    <div>
      <h2>{JSON.stringify(state.value)}</h2>
      <Container>
        <button onClick={() => send('LEFT')}>Left</button>
        <button onClick={() => send('RIGHT')}>Right</button>
        <button onClick={() => send('TOP')}>Top</button>
        <button onClick={() => send('BOTTOM')}>Bottom</button>
      </Container>
    </div>
  );
};

export default InternalTransition;
