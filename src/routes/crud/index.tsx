import { useEffect } from 'react';
import { useMachine } from '@xstate/react';
import crudMachine from './crud.machine';

import './index.css';

export const Crud = () => {
  const [state, send] = useMachine(crudMachine);

  useEffect(() => {
    send('QUERY');
  }, []);

  const onDelete = (index: number) => send({ type: 'DELETE', index });

  return (
    <div>
      {state.context.loading && <h4>loading~</h4>}
      {!state.context.loading && (
        <ul className="list">
          {state.context.list.map((item, index) => (
            <li key={item.age}>
              <span style={{ marginRight: 40 }}>{item.name}</span>
              <span>{item.age}</span>
              <i onClick={() => onDelete(index)}>X</i>
            </li>
          ))}
        </ul>
      )}
      <h4>total: {state.context.count}</h4>
      <h3>{state.context.desc}</h3>
    </div>
  );
};
