import React, { useEffect, useState } from 'react';
import Counter from './Counter';
import { useDispatch, useSelector } from 'react-redux';
import { selectors, actions } from '../store/countersSlice';
import { FaUserPlus } from "react-icons/fa";
import Spinner from 'react-bootstrap/Spinner';
import { motion } from 'framer-motion';

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

  const getBestPlayers = (type) => {
    if(counters.length > 1){
      const copiedCounters = Array.from(counters);
      switch(type){
        case 'lvl': {
          const sortedByLvl = copiedCounters.sort((a,b) => b.lvl - a.lvl);
          const maxCurrentLVl = sortedByLvl[0].lvl;
          const filteredByLvl = copiedCounters.filter(item => item.lvl === maxCurrentLVl);
          if (filteredByLvl.length === 1){
            dispatch(actions.updateBestLvlPlayer(filteredByLvl[0].id));
          } else {
            dispatch(actions.updateBestLvlPlayer(null));
          };
          break;
        };
        case 'power': {
          const sortedByPower = copiedCounters.sort((a,b) => (b.lvl+b.itemsLvl) - (a.lvl+a.itemsLvl));
          const maxCurrentPower = sortedByPower[0].lvl + sortedByPower[0].itemsLvl;
          const filteredByPower = copiedCounters.filter(item => (item.lvl+item.itemsLvl) === maxCurrentPower);
          if (filteredByPower.length === 1){
            dispatch(actions.updateBestPowerPlayer(filteredByPower[0].id));
          } else {
            dispatch(actions.updateBestPowerPlayer(null));
          };
          break;
        };
        case 'items': {
          const sortedByItems = copiedCounters.sort((a,b) => b.itemsLvl - a.itemsLvl);
          const maxCurrentItems = sortedByItems[0].itemsLvl;
          const filteredByItems = copiedCounters.filter(item => item.itemsLvl === maxCurrentItems);
          if (filteredByItems.length === 1){
            dispatch(actions.updateBestItemsPlayer(filteredByItems[0].id));
          } else {
            dispatch(actions.updateBestItemsPlayer(null));
          };
          break;
        };
        default: return null;
        };
      };
  };

  useEffect(() => {
    addItems();
    setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    window.localStorage.setItem('counters', JSON.stringify(counters));

    if(counters.length > 1){
      getBestPlayers('lvl');
      getBestPlayers('power');
      getBestPlayers('items');
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
            <p className='text-center mt-2 px-3 d-flex align-items-center justify-content-center'>
              Чтобы добавить игрока, нажмите
              <motion.div
                className='ms-2 d-inline-flex'
                initial={{ scale: 1 }}
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear", times: [0, 0.5, 1] }}
              >
                {<FaUserPlus size={21} />}
              </motion.div>
            </p>
          </div>
        ) : (
            counters.map((counter) => (
              <Counter
                key={counter.id}
                data={counter}
                onRemove={() => removeItem(counter.id)}
              />
            ))
        )}
      </div>
    </>
  )
}

export default CountersList;
