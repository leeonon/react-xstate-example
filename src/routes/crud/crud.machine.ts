import { assign, createMachine, type EventObject } from 'xstate';

type CurdEvent = EventObject & ({
  type: 'INIT'
} | {
  type: 'ADD';
  payload: {
    username: string;
    age: number;
  }
} | {
  type: 'UPDATE'
} | {
  type: 'DELETE';
  index: number;
} | {
  type: 'QUERY'
});

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
      },
      add: {
        invoke:{
          id: 'addFetch',
          src: 'addService',
          onDone: {
            target: 'normal',
            cond: 'checkUserInfo',
            actions: assign((context, event) => {
              const newList = context.list.concat(event.data);
              return {
                list: newList,
                count: newList.length
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
        if (event.type !== 'DELETE') {
          return;
        }
        context.desc = '删除数据中';
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve(event.index);
          }, 2500);
        })
      },
      addService: async (context, event) => {
        if (event.type !== 'ADD') {
          return;
        }
        context.desc = '正在添加新数据';
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve(event.payload)
          }, 2000)
        })
      }
    },
    guards: {
      checkUserInfo: (context, event) => {
        if (event.type !== 'ADD') {
          return false;
        }

        if (!event.payload.username) {
          context.desc = '错误：用户名必须输入'
          return false;
        }

        if (!event.payload.age) {
          context.desc = '错误：age 必须输入';
          return false;
        }


        return true;
      }
    }
  }
);

export default crudMachine;