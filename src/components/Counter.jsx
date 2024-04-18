import React, { useState, useEffect } from 'react';
import './Counter.css';
import { Button } from 'react-bootstrap';
import { XCircleFill } from 'react-bootstrap-icons';
import levelUpIcon from '../assets/img/level-up.svg';
import swordIcon from '../assets/img/sword.svg';
import { useDispatch, useSelector } from 'react-redux';
import { selectors, actions } from '../store/countersSlice';

const Counter = ({ id, name, lvl, itemsLvl, onRemove }) => {
  const dispatch = useDispatch();
  const counters = useSelector(selectors.selectAll);
  const { isRemoveable } = useSelector((state) => state.counters);

  const maxLevel = 10;
  const minLevel = 1;
  const clickValue = 1;

  const [levelCount, setLevelCount] = useState(lvl);
  const [itemsPowerCount, setItemsPowerCount] = useState(itemsLvl);
  const powerCount = levelCount + itemsPowerCount;

  const levelInc = () => levelCount < maxLevel ? setLevelCount(levelCount + clickValue) : maxLevel;
  const levelDec = () => levelCount > minLevel ? setLevelCount(levelCount - clickValue) : minLevel;
  const itemsPowerInc = () => setItemsPowerCount(itemsPowerCount + clickValue);
  const itemsPowerDec = () => itemsPowerCount > 0 ? setItemsPowerCount(itemsPowerCount - clickValue) : null;

  useEffect (() => {
    dispatch(actions.updateCounter({
      id:id, changes: { lvl: levelCount, itemsLvl: itemsPowerCount }
    }));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [levelCount, itemsPowerCount]);

  useEffect (()=> {
    console.log(counters);
    window.localStorage.setItem('counters', JSON.stringify(counters));
  }, [counters]);

  return (
    <div className='container w-50 p-2 my-2 text-center'>
      <div className="row d-flex">
        <div className="col-6 d-flex justify-content-start align-items-center fs-2 fw-bold">
          {isRemoveable && (
            <div className="me-2 d-flex align-items-center">
              <XCircleFill onClick={onRemove} size={36} style={{ color: 'red' }} />
            </div>
          )}
          {name}
        </div>
        <div className="col-6 d-flex justify-content-end align-items-center gap-1">
          <img src={levelUpIcon} alt="levelUpIcon" style={{ width: '30px' }} />
          <div className="fs-3" style={{ width: '2rem' }}>{levelCount}</div>
          <Button onClick={() => levelInc()} variant="outline-dark" className='rounded-5 d-flex align-items-center justify-content-center' style={{ width: '35px', height: '35px' }}>+</Button>
          <Button onClick={levelDec} variant="outline-dark" className='rounded-5 d-flex align-items-center justify-content-center' style={{ width: '35px', height: '35px' }}>-</Button>
        </div>
      </div>
      <div className="row d-flex">
        <div className="col-6 d-flex justify-content-start align-items-center fs-2">
          <div className="fs-2">Сила: <span className='fw-bold'>{powerCount}</span></div>
        </div>
        <div className="col-6 d-flex justify-content-end align-items-center gap-1">
          <img src={swordIcon} alt="swordIcon" style={{ width: '30px' }} />
          <div className="fs-3" style={{ width: '2rem' }}>{itemsPowerCount}</div>
          <Button onClick={itemsPowerInc} variant="outline-dark" className='rounded-5 d-flex align-items-center justify-content-center' style={{ width: '35px', height: '35px' }}>+</Button>
          <Button onClick={itemsPowerDec} variant="outline-dark" className='rounded-5 d-flex align-items-center justify-content-center' style={{ width: '35px', height: '35px' }}>-</Button>
        </div>
      </div>
    </div>
  )
}

export default Counter;
