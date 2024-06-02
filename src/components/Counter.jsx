import React, { useState, useEffect } from 'react';
import './Counter.css';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from '../store/countersSlice';
import { actions as modalActions } from '../store/modalSlice';
import { Button } from 'react-bootstrap';
import { FaPlus, FaMinus } from "react-icons/fa";
import { FaCircleXmark } from "react-icons/fa6";
import { TbEditCircle } from "react-icons/tb";
import levelUpIcon from '../assets/img/icons/level-up.svg';
import swordIcon from '../assets/img/icons/sword.svg';
import powerIcon from '../assets/img/icons/power.svg';
import UserAvatar from './UserAvatar';
import { avatarList } from '../avatarList';

const Counter = ({ data, onRemove }) => {
  const {id, name, avatarId, lvl, itemsLvl} = data;
  const dispatch = useDispatch();
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

  const handleShowUpdate = () => {dispatch(modalActions.openModal({ modalType: 'update', data: data }))};

  useEffect(() => {
    dispatch(actions.updateCounter({
      id: id, changes: { lvl: levelCount, itemsLvl: itemsPowerCount }
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [levelCount, itemsPowerCount]);

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
                  <span className="d-inline-block text-truncate fs-3 fw-bold ps-1"
                    style={{cursor: 'default'}}>
                    {name}
                  </span>
                </div>
                <div className="col-6 d-flex justify-content-end align-items-center ps-0">
                  <img src={levelUpIcon} alt="levelUpIcon" style={{ width: '30px' }}/>
                  <div className="fs-3 text-center" style={{ width: '2rem', cursor: 'default'}}>
                    {levelCount}
                  </div>
                  <Button
                    onClick={levelDec}
                    variant="outline-dark"
                    className='rounded-5 border-0 d-flex align-items-center justify-content-center'
                    style={{ width: '35px', height: '35px' }}
                  >
                    <FaMinus/>
                  </Button>
                  <Button
                    onClick={levelInc}
                    variant="outline-dark"
                    className='rounded-5 border-0 d-flex align-items-center justify-content-center'
                    style={{ width: '35px', height: '35px' }}
                  >
                    <FaPlus/>
                  </Button>
                </div>
              </div>
              <div className="row">
                <div className="col-6 d-flex align-items-center px-0">
                  <img src={powerIcon} alt="powerIcon" style={{ width: '30px' }} />
                  <span className='fs-3' style={{cursor: 'default'}}>
                  {powerCount}
                  </span>
                </div>
                <div className="col-6 d-flex justify-content-end align-items-center ps-0">
                  <img src={swordIcon} alt="swordIcon" style={{ width: '30px' }} />
                  <div className="fs-3 text-center" style={{ width: '2rem', cursor: 'default'}}>
                    {itemsPowerCount}
                  </div>
                  <Button
                    onClick={itemsPowerDec}
                    variant="outline-dark"
                    className='rounded-5 border-0 d-flex align-items-center justify-content-center'
                    style={{ width: '35px', height: '35px' }}
                  >
                    <FaMinus/>
                  </Button>
                  <Button
                    onClick={itemsPowerInc}
                    variant="outline-dark"
                    className='rounded-5 border-0 d-flex align-items-center justify-content-center'
                    style={{ width: '35px', height: '35px' }}
                  >
                    <FaPlus/>
                  </Button>
                </div>
              </div>
            </div>
          </div>
          {isRemoveable && (
            <div className="delete-button">
              <FaCircleXmark onClick={onRemove} size={28}/>
            </div>
          )}
          {isRemoveable && (
            <div className="edit-button">
              <TbEditCircle onClick={handleShowUpdate} size={28} />
            </div>
          )}
        </div>
    </div>
  )
}

export default Counter;
