// import { createStore, applyMiddleware } from 'redux';
// const { createStore, applyMiddleware } = require('redux');
const { createStore } = require('redux');
// const produce = require('immer');
const { produce } = require('immer');

const applyMiddleware = (...middlewares) => createStore => (...args) => {
  console.log(2);
  console.log('middlewares', middlewares);
  console.log('createStore', createStore);
  console.log('args', args);
  const store = createStore(...args); // (1)
  console.log(4);
  const funcsWithStore = middlewares.map(middleware => middleware(store)); // (2)
  const chainedFunc = funcsWithStore.reduce((a, b) => next => a(b(next))); // (3)

  return {
    store,
    dispatch: chainedFunc(store.dispatch)
  }; // (4)
};

function dispatch(action) {
  currentState = currentReducer(currentState, action); // (1)
  for (let i = 0; i < listeners.length; i++) {
    listeners[i](); // (2)
  }
  return action;
}

const middleware1 = store => next => action => {
	console.log('middleware1 start');
	const result = next(action);
	console.log('middleware1 end');
	return result;
}

const middleware2 = store => next => action => {
	console.log('middleware2 start');
	const result = next(action);
	console.log('middleware2 end');
	return result;
}

const myReducer = (state, action) => {
  console.log(3);
	console.log('myReducer');
	return state;
}

const myMiddleware = applyMiddleware(middleware1, middleware2);
console.log(1);
console.log('myMiddleware', myMiddleware)
const store = createStore(myReducer, myMiddleware);
// const store = myMiddleware(createStore)(myReducer)
console.log(store)
store.dispatch({ type: 'someAction'});


const func = o => {
  console.log('o', o);

  return i => {
    console.log('i', i);
  } 
}

const printLog = store => next => action => {
  console.log(`pre state = ${store.getStore()}`);
  const result = next(action); // next 함수를 호출하면 리듀서가 호출되기 때문에, 전후로 로그를 출력
  console.log(`next state = ${store.getStore()}`);
  return result;
}

const reportCrash = store => next => action => {
  try {
    return next(action);
  } catch (error) {
    // 서버로 예외 정보 전송
  }
}

const delayAction = store => next => action => {
  const delay = action.meta && action.meta.delay;
  if(!delay) { return next(action); } // delay 정보가 있을때만 딜레이를 준다.
  const timeoutId = setTimeout(() => next(action), delay);
  return function cancel() {
    clearTimeout(timeoutId); // 반환된 함수를 호출하면 next 함수의 호출을 막을 수 있다.
  }  
}
const cancel = store.dispatch({
  type: 'SomeAction',
  meta: { delay: 1000 },
});
// cancel();

const saveToLocalStorage = store => next => action => {
  if(action.type === 'SET_NAME') { // SET_NAME 액션이 발생할 때마다 로컬 스토리지에 값을 저장한다.
    localStorage.setItem('name', action.name);
  }
  return next(action);
}

console.log(produce);
console.log(typeof produce);

const sampleObject = {
  deps: 0,
  data: {
    deps: 1,
    data: {
      deps: 2,
      data: {
        deps: 3,
        data: {
          deps: 4,
          data: {
            deps: 5,
            language: 'javascript',
            server: ['nodejs', 'express'],
            client: 'react',
          },
        },
      },
    },
  },
};


const newSampleObject1 = produce(sampleObject, draft => {
  draft.data.newData = 'this is new data';
});
console.log(sampleObject)
console.log(newSampleObject1);
