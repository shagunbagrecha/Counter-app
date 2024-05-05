// src/components/Counter.js
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement } from '../store/actions';
import { Link } from 'react-router-dom';

function Counter() {
  const count = useSelector(state => state.count);
  const dispatch = useDispatch();

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <h2 className="text-4xl font-bold mb-8">Counter</h2>
      <div className="flex justify-center items-center">
      <button onClick={() => dispatch(decrement())} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Decrement</button>
      <span className="mx-4 text-xl font-semibold">Count: {count}</span>
      <button onClick={() => dispatch(increment())} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Increment</button>
      </div>
      <Link to="/">
        <button className="mt-8 hover:font-bold">Go Back</button></Link>
    </div>
  );
}

export default Counter;




