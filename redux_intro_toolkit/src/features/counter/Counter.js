import React, { useState, useMemo, memo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement, reset, incrementByAmount } from './counterSlice';
import './Counter.css'; // Assuming CSS/SCSS module for styling

// Custom hook for encapsulating logic related to counter actions
const useCounterActions = () => {
  const dispatch = useDispatch();
  return useMemo(() => ({
    increment: () => dispatch(increment()),
    decrement: () => dispatch(decrement()),
    reset: () => dispatch(reset()),
    incrementByAmount: (amount) => dispatch(incrementByAmount(amount)),
  }), [dispatch]);
}

// Counter component optimized with React.memo and useCallback
const Counter = memo(() => {
  const [inputValue, setInputValue] = useState(1);
  const count = useSelector((state) => state.counter.count);
  const { increment, decrement, reset, incrementByAmount } = useCounterActions();

  const handleIncrementByAmount = () => {
    incrementByAmount(Number(inputValue));
    setInputValue(1); // Reset the input field
  };

  // Ensuring the input value is a controlled component
  const handleInputChange = (e) => {
    setInputValue(Number(e.target.value));
  };

  return (
    <section className="counter">
      <p data-testid={'counter_count'} className="counter__count">{count}</p>
      <div className="counter__controls">
        <div className="counter__basic-controls">
          <button onClick={increment} aria-label="Increment value">+</button>
          <button onClick={decrement} aria-label="Decrement value">-</button>
        </div>
        <div className="counter__amount-controls">
          <input
            data-testid={'counter-input'}
            value={inputValue}
            onChange={handleInputChange}
            min={1}
            type="number"
            aria-label="Set increment amount"
          />
          <button onClick={handleIncrementByAmount} aria-label="Add by amount">Add By Amount</button>
        </div>
        <button onClick={reset} aria-label="Reset counter">Reset</button>
      </div>
    </section>
  );
});

export default Counter;