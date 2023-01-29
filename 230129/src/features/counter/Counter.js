import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement, reset, incrementByAmount } from './counterSlice';

const Counter = () => {
  const [value, setvalue] = useState(0);
  const count = useSelector(state => state.counter.count);
  const dispatch = useDispatch();


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