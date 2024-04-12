import React, { useState, useContext, useEffect } from 'react';
import { CounterContext } from './context';
import './Counter.css';
import { Button } from 'react-bootstrap';
import { XCircleFill } from 'react-bootstrap-icons';
import levelUpIcon from './img/level-up.svg';
import swordIcon from './img/sword.svg';

const Counter = ({ id, name, onRemoveHandler, showDeleteButton }) => {
  const { updateItem } = useContext(CounterContext);
  const maxLevel = 10;
  const minLevel = 1;
  const clickValue = 1;

  const [levelCount, setLeverCount] = useState(minLevel);
  const [itemsPowerCount, setItemsPowerCount] = useState(0);
  const powerCount = levelCount + itemsPowerCount;

  const levelInc = () => levelCount < maxLevel ? setLeverCount(levelCount + clickValue) : null;
  const levelDec = () => levelCount > minLevel ? setLeverCount(levelCount - clickValue) : null;
  const itemsPowerInc = () => setItemsPowerCount(itemsPowerCount + clickValue);
  const itemsPowerDec = () => itemsPowerCount > 0 ? setItemsPowerCount(itemsPowerCount - clickValue) : null;

  useEffect (() => {
    updateItem(id, name, levelCount);
  }, [levelCount]);

  return (
    <div className='container w-50 p-2 my-2 text-center'>
      <div className="row d-flex">
        <div className="col-6 d-flex justify-content-start align-items-center fs-2 fw-bold">
          {showDeleteButton && (
            <div className="mx-1 d-flex align-items-center">
              <XCircleFill onClick={onRemoveHandler} size={36} style={{ color: 'red' }} />
            </div>
          )}
          {name}, id: {id}
        </div>
        <div className="col-6 d-flex justify-content-end align-items-center gap-1">
          <img src={levelUpIcon} alt="levelUpIcon" style={{ width: '30px' }} />
          <div className="fs-3" style={{ width: '2rem' }}>{levelCount}</div>
          <Button onClick={() => levelInc()} variant="outline-dark" className='rounded-5 d-flex align-items-center' style={{ width: '33px', height: '33px' }}>+</Button>
          <Button onClick={levelDec} variant="outline-dark" className='rounded-5 d-flex align-items-center' style={{ width: '33px', height: '33px' }}>-</Button>
        </div>
      </div>
      <div className="row d-flex">
        <div className="col-6 d-flex justify-content-start align-items-center fs-2">
          <div className="fs-2">Сила: <span className='fw-bold'>{powerCount}</span></div>
        </div>
        <div className="col-6 d-flex justify-content-end align-items-center gap-1">
          <img src={swordIcon} alt="swordIcon" style={{ width: '30px' }} />
          <div className="fs-3" style={{ width: '2rem' }}>{itemsPowerCount}</div>
          <Button onClick={itemsPowerInc} variant="outline-dark" className='rounded-5 d-flex align-items-center' style={{ width: '33px', height: '33px' }}>+</Button>
          <Button onClick={itemsPowerDec} variant="outline-dark" className='rounded-5 d-flex align-items-center' style={{ width: '33px', height: '33px' }}>-</Button>
        </div>
      </div>
    </div>
  )
}

export default Counter;
