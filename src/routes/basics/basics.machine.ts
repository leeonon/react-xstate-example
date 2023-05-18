import { createMachine } from 'xstate';

const machine = createMachine({
  id: 'button',
  initial: 'inactive',
  states: {
    inactive: {
      on: { TOGGLE: 'active' },
    },
    active: {
      on: { TOGGLE: 'inactive' },
    },
  },
});

export default machine;
