import { assign, createMachine, type EventObject } from 'xstate';

type CurdEvent = EventObject & {
  type: 'INIT'
} | {
  type: 'ADD'
} | {
  type: 'UPDATE'
} | {
  type: 'DELETE',
  index: number;
} | {
  type: 'QUERY'
};

type CrudMachineContext = {
  loading: boolean;
  list: Array<{
    name: string;
    age: number;
  }>;
  count: number;
  desc: string;
};

type CrudMachineState = {
  value: 'normal',
  context: CrudMachineContext
} | {
  value: 'query',
  context: CrudMachineContext
} | {
  value: 'update',
  context: CrudMachineContext
} | {
  value: 'delete',
  context: CrudMachineContext
} | {
  value: 'query',
  context: CrudMachineContext
}

const crudMachine = createMachine<CrudMachineContext, CurdEvent, CrudMachineState>(
  {
    id: 'list',
    initial: 'normal',
    context: {
      loading: false,
      list: [],
      count: 0,
      desc: '当前列表状态'
    },
    states: {
      normal : {
        on: {
          QUERY: ['query'],
          DELETE: ['delete']
        }
      },
      query: {
        invoke: {
          id: 'fetchQuery',
          src: 'queryList',
          onDone: {
            // TODO loadmore
            target: 'normal',
            actions: assign((context, event) => {
              context.desc = '列表数据请求成功';
              return {
                list: event.data,
                loading: false,
                count: event.data.length
              }
            })
          }
        }
      },
      delete:{
        invoke: {
          id: 'deleteFetch',
          src: 'deleteService',
          onDone: {
            target: 'normal',
            actions: assign((context, event) => {
              context.list.splice(event.data, 1)
              return {
                desc: '第' + event.data + '条数据删除成功',
                list: context.list
              }
            })
          }
        }
      }
    }
  },
  {
    actions: {
    },
    services: {
      queryList: async (context, _event) => {
        context.loading = true
        context.desc = '请求数据中...';
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve([
              { name: 'Li', age: 18 },
              { name: 'Yang', age: 28 },
              { name: 'Wu', age: 38 },
              { name: 'Ho', age: 48 },
              { name: 'Ho0', age: 58 },
              { name: '8h', age: 68 },
              { name: 'Six', age: 78 },
              { name: 'Hi', age: 88 },
            ])
          }, 3000);
        })
      },
      deleteService: async (context, event) => {
        console.log('context:', context, event)
        if (event.type !== 'DELETE') {
          return;
        }
        context.desc = '删除数据中';
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve(event.index);
          }, 2500);
        })
      }
    }
  }
);

export default crudMachine;