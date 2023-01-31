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