import React, { useEffect } from 'react';
import Counter from './Counter';
import { useDispatch, useSelector } from 'react-redux';
import { selectors, actions } from '../store/countersSlice';

const CountersList = () => {
  const counters = useSelector(selectors.selectAll);
  const dispatch = useDispatch();

  const addItems = () => {
    const items = JSON.parse(localStorage.getItem('counters')) || [];
    dispatch(actions.addCounters(items));
  };

  const removeItem = (id) => {
    dispatch(actions.removeCounter(id));
    const filteredItems = counters.filter((_, i) => i !== id);
    window.localStorage.setItem('counters', JSON.stringify(filteredItems));
  };

  useEffect(() => {
    addItems();
  }, []);

  return (
    <>
      <div>
        {(counters.length === 0) ? (
          <div className="empty__descr">
            <h2 className="text-center mt-2">Список пуст</h2>
            <p className='text-center mt-2 px-3'>Чтобы добавить игрока, нажмите на кнопку внизу экрана</p>
          </div>
        ) : (
          counters.map((counter) => (
            <Counter
              key={counter.id}
              id={counter.id}
              name={counter.name}
              lvl={counter.lvl}
              itemsLvl={counter.itemsLvl}
              onRemove={() => removeItem(counter.id)}
            />
          )))
        }
      </div>
    </>
  )
}

export default CountersList;
