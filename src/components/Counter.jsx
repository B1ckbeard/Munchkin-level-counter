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

  useEffect(() => {
    dispatch(actions.updateCounter({
      id: id, changes: { lvl: levelCount, itemsLvl: itemsPowerCount }
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [levelCount, itemsPowerCount]);

  useEffect(() => {
    console.log(counters);
    window.localStorage.setItem('counters', JSON.stringify(counters));
  }, [counters]);

  return (
    <div className="container w-100 d-flex align-items-center justify-content-center px-3 mb-3">
      <div className="counter__wrapper shadow">
        <div className='counter__container'>
          <div className="row">
            <div className="col-7 d-flex justify-content-start align-items-center pe-0">
              <span class="d-inline-block text-truncate fs-3 fw-bold">
                {name}
              </span>
            </div>
            <div className="col-5 d-flex justify-content-end align-items-center">
              <img src={levelUpIcon} alt="levelUpIcon" style={{ width: '30px' }} />
              <div className="fs-3 me-1" style={{ width: '2rem' }}>{levelCount}</div>
              <Button onClick={levelInc} variant="outline-dark" className='rounded-5 d-flex align-items-center justify-content-center fs-1 me-1' style={{ width: '33px', height: '33px' }}>+</Button>
              <Button onClick={levelDec} variant="outline-dark" className='rounded-5 d-flex align-items-center justify-content-center fs-1' style={{ width: '33px', height: '33px' }}>-</Button>
            </div>
          </div>
          <div className="row">
            <div className="col-7 d-flex justify-content-start align-items-center">
              <div className="fs-3">Сила: <span className='fw-bold'>{powerCount}</span></div>
            </div>
            <div className="col-5 d-flex justify-content-end align-items-center">
              <img src={swordIcon} alt="swordIcon" style={{ width: '30px' }} />
              <div className="fs-3 me-1" style={{ width: '2rem' }}>{itemsPowerCount}</div>
              <Button onClick={itemsPowerInc} variant="outline-dark" className='rounded-5 d-flex align-items-center justify-content-center fs-1 me-1' style={{ width: '33px', height: '33px' }}>+</Button>
              <Button onClick={itemsPowerDec} variant="outline-dark" className='rounded-5 d-flex align-items-center justify-content-center fs-1' style={{ width: '33px', height: '33px' }}>-</Button>
            </div>
          </div>
        </div>
        {isRemoveable && (
          <div className="delete-button">
            <XCircleFill onClick={onRemove} size={28} style={{ color: 'red' }} />
          </div>
        )}
      </div>
    </div>
  )
}

export default Counter;
