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