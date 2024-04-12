import React from 'react';
import { createContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectors, actions } from './store/countersSlice';

const CounterContext = createContext({});

const CounterContextProvider = ({ children }) => {
  const dispatch = useDispatch();
  const counters = useSelector(selectors.selectAll);

  const addItems = () => {
    const items = JSON.parse(localStorage.getItem('counters')) || [];
    dispatch(actions.addCounters(items));
  };

  const addItem = (item) => {
    const listItems = [...counters, item];
    dispatch(actions.addCounter(item));
    console.log('listItems: ', listItems);
    window.localStorage.setItem('counters', JSON.stringify(listItems));
  };

  const removeItem = (id) => {
    dispatch(actions.removeCounter(id));
    const filteredItems = counters.filter((_, i) => i !== id);
    window.localStorage.setItem('counters', JSON.stringify(filteredItems));
  };

  const updateItem = (id, name, lvl) => {
    dispatch(actions.updateCounter({
      id:id, changes: { lvl: lvl }
    }));
    const updatedItem = { id, name, lvl: lvl };
    console.log('update: ', updatedItem);
    console.log(counters);
    //window.localStorage.setItem('counters', JSON.stringify(listItems));
  };

  return (
    <CounterContext.Provider value={{
      addItem, addItems, removeItem, updateItem,
    }
    }>
      {children}
    </CounterContext.Provider>
  )
};

export { CounterContext, CounterContextProvider };