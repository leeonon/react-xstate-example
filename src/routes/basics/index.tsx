import { useMachine } from '@xstate/react';
import toggleMachine from './basics.machine';

export const Basics = () => {
  const [state, send] = useMachine(toggleMachine);
  console.log('state1:', state);

  return (
    <button onClick={() => send('TOGGLE')}>
      {state.value === 'inactive'
        ? 'Click to activate'
        : 'Active! Click to deactivate'}
    </button>
  );
};
