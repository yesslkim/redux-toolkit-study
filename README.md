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
