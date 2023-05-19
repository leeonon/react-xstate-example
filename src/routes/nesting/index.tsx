import { useMemo } from 'react';
import { useMachine } from '@xstate/react';
import nestingMachine from './nesting.machine';

export const Nesting = () => {
  const [state, send] = useMachine(nestingMachine);

  const text = useMemo(() => {
    if (state.matches('disable')) {
      return '默认(不可修改username)';
    }
    if (state.matches({ enabled: 'idle' })) {
      return '空闲状态(可修改username)';
    }
    if (state.matches({ enabled: 'loading' })) {
      return '加载中(不可修改username)';
    }

    return 'NULL';
  }, [state]);

  /**
   * send CLICK 会根据当前不同的状态触发不同的事件
   * 当前状态为 disable 时 触发 target -> enabled
   * 当前状态为
   * 点击 send CLICK event，但是只有 enabled 状态做了 on CLICK, loading 状态没做，所以当前状态为 loading 时，不会再次触发 CLICK事件
   */
  return (
    <div>
      <button onClick={() => send('CLICK')}>{text}</button>
      <button
        onClick={() =>
          send({ type: 'UPDATE_USER_INFO', payload: { age: 18, name: 'Yang' } })
        }
      >
        ChangeUserInfo
      </button>

      <ul>
        <li>username: {state.context.name}</li>
        <li>age: {state.context.age}</li>
      </ul>
      <img
        width="600"
        src="https://lee-oss-1300118632.cos.ap-nanjing.myqcloud.com/obsidian/202305181609369.jpg"
      />
    </div>
  );
};
