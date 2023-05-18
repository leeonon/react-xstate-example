import { createMachine, type EventObject } from 'xstate';

type NestingEvent = EventObject & {
  type: 'CLICK';
} | {
  type: 'UPDATE_USER_INFO',
  payload: {
    age: number;
    name: string;
  }
};

type NestingMachineContext = {
  name: string;
  age: number;
};

type NestingTypestate =
  | {
      value: 'disable';
      context: NestingMachineContext;
    }
  | {
      value: 'enabled' | { enabled: 'idle' } | { enabled: 'loading' };
      context: NestingMachineContext;
    }
;

const nestingMachine = createMachine<NestingMachineContext, NestingEvent, NestingTypestate>(
  {
    id: 'nesting',
    initial: 'disable',
    context:{
      name: 'Li',
      age: 60
    },
    states: {
      disable: {
        on: {
          CLICK: {
            target: 'enabled',
          },
        },
      },
      enabled: {
        initial: 'idle',
        states: {
          idle: {
            on: {
              CLICK: {
                target: 'loading',
              },
              UPDATE_USER_INFO:{
                actions: ['updateUserInfo']
              }
            },
          },
          loading: {},
        },
      },
    },
  }, 
  {
    actions:{
      updateUserInfo:(context, event) =>{
        console.log('context:', context, event);
        if (event.type !== 'UPDATE_USER_INFO') return;

        context.age = event.payload.age;
        context.name = event.payload.name;
      }
    }
  }
);

export default nestingMachine;
