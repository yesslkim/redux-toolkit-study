# Redux-toolkit Study
- Redux, Redux Toolkit, Redux Toolkit Query을 공부하면서 배운 내용을 정리합니다.

---
**230129**
- 기존에 배운 redux-toolkit의 기초부분을 복습

## Install
```
  yarn add react-redux @reduxjs/toolkit
```

### Store
- `src`폴더에 `app`폴더 생성 후 `store.js` 파일 생성
- reducers를 하나로 모으는 공간
```js
import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer
  }
})
```

### features
- `src`폴더에 `features` 폴더를 생성한다.
- 해당 폴더에는 기능별로 폴더가 생성되어 있으며, 폴더 내에는 `slice`라는 파일을 생성한다.
- slice는 리덕스 툴킷에서 사용하는 state, actions를 모아둔 파일이다.
```js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  count: 0
}

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state) => {
      state.count += 1;
    },
    decrement: (state) => {
      state.count -= 1;
    }
  }
});

export const { increment, decrement } = counterSlice.actions;
export default counterSlice.reducer;
```
- 각각의 액션과 reducer는 export 해준다.

### dispatch와 state 사용하기
```js
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement, reset, incrementByAmount } from './counterSlice';

const Counter = () => {
    const [value, setvalue] = useState(0);
  const count = useSelector(state => state.counter.count); // useSelector : state 참조 시 사용
  const dispatch = useDispatch(); // useDispatch : action 사용을 위한 hook

  const resetAll = () => {
    setvalue(0);
    dispatch(reset())
  }

  return (
    <section>
      <p>{count}</p>
      <div>
        <button type='button' onClick={()=> dispatch(increment())}>+</button>
        <button type='button' onClick={() => dispatch(decrement())}>-</button>
        <button type='button' onClick={resetAll}>reset</button>
      </div>
      <div>
        <input type="number" value={value} onChange={(e) => setvalue(Number(e.target.value))} />
        <button type='button' onClick={() => dispatch(incrementByAmount(value || 0))}>Add Amount</button>
      </div>
    </section>
  );
}
 
export default Counter;
```

**230130**
- redux-toolkit 실습 (CRUD)

### nanoid
- 리덕스 툴킷에서는 `uuid`같은 기능을 기본으로 제공함
```js
import { nanoid } from '@reduxjs/toolkit';

console.log(nanoid());
// 'dgPXxUz_6fWIQBD8XmiSy'
```

### 유지보수 관련
- 공통으로 사용되는 콜백함수, 혹은 템플릿의 경우 slice에 작성해두면 추후에 데이터가 변경되거나 로직이 변경되도 한 곳에서 바로 처리가 가능함.

```js
import { createSlice, nanoid } from '@reduxjs/toolkit'; // uuid같은

const initialState = [
  {id: '1', title: 'learning redux-1', content: 'example 1 content.'},
  {id: '2', title: 'learning redux-2', content: 'example 2 content.'}
]

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    postAdded: {
      reducer(state, action) {
        state.push(action.payload);
      },
      // 🌟 prepare 콜백 함수를 통해 action의 payload를 커스터마이징할 수 있음.
      // - 추후에 state의 설계 방식이 변경되더라도 한 파일에서 수정 가능.
      prepare(title, content) {
        return {
          payload: {
            id: nanoid(),
            title,
            content
          }
        }
      }
    }
  }
});

// 🌟 자주 사용하는 useSelector의 콜백함수는 이곳에서 관리하면 추후 유지보수에 좋음.
export const selectAllPosts = (state) => state.posts;
export const { postAdded } = postsSlice.actions;
export default postsSlice.reducer;
```

**230131**
- 실습 공부하면서 새로 사용한 라이브러리 
& 헷갈리는 자바스크립트 문법 정리

###  date-fns
[공식문서 바로가기](https://date-fns.org/docs/Getting-Started/)

- 배운 내용
  - `formatDistanceToNow` 
  - `parseISO()`

- 시간 ISO 8601
  - 시간 ISO 8601는 24시간 시계 시스템을 사용한다. 기본 형식은 [hh][mm][ss]이며 확장 형식은 [hh]:[mm]:[ss]다.
  - 국제표준화기구(ISO)에서 지정한 날짜, 시간 데이터에 대한 표준 규격

- 자바스크립트 날짜 ISO 8601 시간 형식으로 변경 방법
```js
new Date().toString()
// "Tue Jan 31 2023 22:32:23 GMT+0900 (한국 표준시)"

new Date().toISOString();
// "2023-01-31T13:32:23.319Z"
```

### 자바스크립트 얕은 복사
- 자바스크립트 얕은 복사를 지원하는 빌트인 object-copy
  - `Array.prototype.concat()`
  - `Array.prototype.slice()`
  - `Array.from()`
  - `Object.assign()`
  - `Object.create()`

### Object.assign()
1. object 복제
```js
const obj = {a:1};
const copy = Object.assign({}, obj);
```
2. object 합치기
```js
const target = { a: 1, b: 2}
const source = { c: 3, d: 4}

const returnedTarget = Object.assign(target, source);

console.log(target) // { a: 1, b: 2, c: 3, d: 4 }
console.log(source) // { c: 3, d: 4 }
console.log(returnedTarget) // { a: 1, b: 2, c: 3, d: 4 }
```
- target 자체가 변경됨.
- 만약에 객체에 같은 키가 있는 경우, 마지막으로 추가한 키의 값으로 덮어씌어진다.

3. 배열 요소 갱신
```js
const families = [
    {
        firstName:'Kim',
        lastName: 'Hoon'
    },
    {
        firstName: 'Lee',
        lastName: 'Yeong Hee',
    },
    {
        fistName: 'Kim',
        lastName: 'Ye Seul'
    }
];

Object.assign(
  families[1],
  {firstName: 'Kim', lastName: 'Yeong Hee'}
)
```
4. 원시 값은 객체로 래핑됨

### Object.entries()
- 객체 자체의 열거 가능한 문자열 키를 가진 속성 [key, value] 쌍이 반환
```js
const reactionButtons = Object.entries(reactionEmoji).map(([name, emoji]) => {
        return (
            <button
                key={name}
                type="button"
                className="reactionButton"
                onClick={() =>
                    dispatch(reactionAdded({ postId: post.id, reaction: name }))
                }
            >
                {emoji} {post.reactions[name]}
            </button>
        )
    })
```
**230201**
### Redux Thunk Middleware
- Thunk의 의미
  - Thunk는 컴퓨터 프로그래밍에서 기존의 서브 루틴에 추가적인 연산을 삽입할 때 사용되는 서브루틴이다.
  - 즉, 리덕스에서 비동기 작업을 처리 할때 사용하는 미들웨어이다.

#### Redux Thunk를 쓸 때 초깃값
```js
const initialState = {
    posts: [],
    status: 'idle', //'idle' | 'loading' | 'succeeded' | 'failed'
    error: null
}
```
- 비동기 작업을 통해 받아온 값 뿐만 아니라 백엔드와 통신을 하는 과정에서 데이터가 제대로 받아졌는지 확인이 필요하기 때문에 관련된 상태, 에러등을 받아온다.
### `createAsyncThunk`
- createAsyncThunk의 parameters
  1. type : string
  2. payloadCreater : callback
  3. options : object
- `createAsyncThunk`는 reducer 함수를 생성하지 않는다. 그 이유는 어떤 데이터를 패칭하는지도 모르고 로딩 상태를 어떻게 관리할 건지, 리턴되는 데이터를 어떻게 가공할 지 모르기 때문이다.
- `createAsyncThunk`는 AsyncThunk를 리턴하게 된다.
```ts
export declare type AsyncThunk<Returned, ThunkArg, ThunkApiConfig extends AsyncThunkConfig> = AsyncThunkActionCreator<Returned, ThunkArg, ThunkApiConfig> & {
    pending: AsyncThunkPendingActionCreator<ThunkArg, ThunkApiConfig>;
    rejected: AsyncThunkRejectedActionCreator<ThunkArg, ThunkApiConfig>;
    fulfilled: AsyncThunkFulfilledActionCreator<Returned, ThunkArg, ThunkApiConfig>;
    typePrefix: string;
};
```
#### type
- `type`은 문자열로 리덕스의 추가 액션 타입을 생성한다. (총 3가지)
- 예시
  - type이 `posts/fetchPosts`인 경우
  - pending: `posts/fetchPosts/pending`
  - fulfilled: `posts/fetchPosts/fulfilled`
  - rejected: `posts/fetchPosts/rejected`

#### payloadCreater
- 콜백함수로 promise를 리턴한다.

```js
const fetchUserById = createAsyncThunk(
  'users/fetchByIdStatus',
  async (userId: number, thunkAPI) => {
    const response = await userAPI.fetchById(userId)
    return response.data
  }
)
```
- payloadCreate의 경우는 2개의 매개변수를 받는다.
- 첫번째 매개변수(arg) : single value 
  - 주로 request시 추가로 필요한 정보 값을 받는다 (예시 : ID)
  - 만약에 값이 1개 이상인 경우 객체로 묶어서 보내면 된다.
- 두번째 매개변수(thunkAPI) : object 
  - * 좀 더 공부 후 추가 예정

### Promise 라이프사이클 액션
- **추가 공부 필요**
 - `createAsyncThunk`는 `createAction`을 통해 Redux action creators를 생성한다.
  - `pending`, `fulfilled`, `rejected`
  - 해당 액션 객체는 `requestedId`, `arg`, `action.meta`를 가지고 있다.
  - 이 액션을 reducer에서 처리하기 위해서는, action creators를 `createReducer` 혹은 `createSlice`에서 참조한다.

  ```js
const reducer1 = createReducer(initialState, {
  [fetchUserById.fulfilled]: (state, action) => {},
})

const reducer2 = createReducer(initialState, (builder) => {
  builder.addCase(fetchUserById.fulfilled, (state, action) => {})
})

const reducer3 = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchUserById.fulfilled]: (state, action) => {},
  },
})

const reducer4 = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUserById.fulfilled, (state, action) => {})
  },
})
  ```
