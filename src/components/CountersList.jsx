import React, { useEffect, useState } from 'react';
import Counter from './Counter';
import { useDispatch, useSelector } from 'react-redux';
import { selectors, actions } from '../store/countersSlice';
import { FaUserPlus } from "react-icons/fa";
import Spinner from 'react-bootstrap/Spinner';

const CountersList = () => {
  const counters = useSelector(selectors.selectAll);
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);

  const addItems = () => {
    const items = JSON.parse(localStorage.getItem('counters')) || [];
    dispatch(actions.addCounters(items));
  };

  const removeItem = (id) => {
    dispatch(actions.removeCounter(id));
    const filteredItems = counters.filter((counter) => counter.id !== id);
    window.localStorage.setItem('counters', JSON.stringify(filteredItems));
  };

  useEffect(() => {
    addItems();
    setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    window.localStorage.setItem('counters', JSON.stringify(counters));
  }, [counters]);

  return (
    <>
      <div>
        {(loading) ? (
          <div className="d-flex justify-content-center">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        ) : (counters.length === 0) ? (
          <div className="empty__descr">
            <h2 className="text-center mt-3">Список пуст</h2>
            <p className='text-center mt-2 px-3'>Чтобы добавить игрока, нажмите {<FaUserPlus size={21} />}</p>
          </div>
        ) : (
          counters.map((counter) => (
            <Counter
              key={counter.id}
              data={counter}
              onRemove={() => removeItem(counter.id)}
            />
          )))
        }
      </div>
    </>
  )
}

export default CountersList;
