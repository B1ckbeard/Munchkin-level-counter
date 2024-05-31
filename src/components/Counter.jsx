import React, { useState, useEffect } from 'react';
import './Counter.css';
import { Button } from 'react-bootstrap';
import { XCircleFill } from 'react-bootstrap-icons';
import levelUpIcon from '../assets/img/level-up.svg';
import swordIcon from '../assets/img/sword.svg';
import powerIcon from '../assets/img/power.svg';
import { useDispatch, useSelector } from 'react-redux';
import { selectors, actions } from '../store/countersSlice';
import UserAvatar from './UserAvatar';
import { avatarList } from '../avatarList';

const Counter = ({ id, name, avatarId, lvl, itemsLvl, onRemove }) => {
  const dispatch = useDispatch();
  const counters = useSelector(selectors.selectAll);
  const { isRemoveable } = useSelector((state) => state.counters);

  const userAvatar = avatarList.find((avatar) => avatar.id === avatarId);

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
    window.localStorage.setItem('counters', JSON.stringify(counters));
  }, [counters]);

  return (
    <div className="container w-100 d-flex align-items-center justify-content-center px-3 mb-3">
        <div className='counter__container shadow'>
          <div className='row d-flex align-items-center'>
            <div className="col-3 d-flex align-items-center justify-content-center">
              <UserAvatar
                src={userAvatar.src} />
            </div>
            <div className="col-9 ps-0">
              <div className="row">
                <div className="col-6 d-flex justify-content-start px-0">
                  <span className="d-inline-block text-truncate fs-3 fw-bold ps-1">
                    {name}
                  </span>
                </div>
                <div className="col-6 d-flex justify-content-end align-items-center ps-0">
                  <img src={levelUpIcon} alt="levelUpIcon" style={{ width: '30px' }} />
                  <div className="fs-3 me-1 text-center" style={{ width: '2rem' }}>{levelCount}</div>
                  <Button onClick={levelDec} variant="outline-dark"
                    className='rounded-5 d-flex align-items-center justify-content-center fs-1 fw-bold me-1'
                    style={{ width: '33px', height: '33px' }}
                  >
                    -
                  </Button>
                  <Button onClick={levelInc} variant="outline-dark"
                    className='rounded-5 d-flex align-items-center justify-content-center fs-1 fw-bold'
                    style={{ width: '33px', height: '33px' }}
                  >
                    +
                  </Button>
                </div>
              </div>
              <div className="row">
                <div className="col-6 d-flex align-items-center px-0">
                  <img src={powerIcon} alt="powerIcon" style={{ width: '30px' }} />
                  <span className='fs-3'>
                  {powerCount}
                  </span>
                </div>
                <div className="col-6 d-flex justify-content-end align-items-center ps-0">
                  <img src={swordIcon} alt="swordIcon" style={{ width: '30px' }} />
                  <div className="fs-3 me-1 text-center" style={{ width: '2rem' }}>{itemsPowerCount}</div>
                  <Button onClick={itemsPowerDec} variant="outline-dark"
                    className='rounded-5 d-flex align-items-center justify-content-center fs-1 fw-bold me-1'
                    style={{ width: '33px', height: '33px' }}
                  >
                    -
                  </Button>
                  <Button onClick={itemsPowerInc} variant="outline-dark"
                    className='rounded-5 d-flex align-items-center justify-content-center fs-1 fw-bold'
                    style={{ width: '33px', height: '33px' }}
                  >
                    +
                  </Button>
                </div>
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
