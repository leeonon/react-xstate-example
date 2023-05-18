import { createMachine } from 'xstate';

type Event = {
  type: 'LEFT' | 'RIGHT' | 'TOP' | 'BOTTOM';
}

/**
 * 多个状态共享 Event
 */
const internalTransition = createMachine<unknown, Event>(
  {
    id: 'internal',
    initial: 'left',
    states: {
      left: {},
      right: {},
      top: {},
      bottom: {}
    },
    // 内转换, 子状态以 . 开头
    on: {
      LEFT: '.left',
      RIGHT: {
        target: '.right',
      },
      TOP: {
        target: '.top',
        internal: true // 显式标识这是内部转换
      },
      BOTTOM: {
        target: '.bottom',
        internal: true
      }
    }
  },
  {}
);

export default internalTransition;