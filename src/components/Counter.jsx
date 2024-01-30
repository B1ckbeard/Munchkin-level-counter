import React, { useState } from 'react';
import './Counter.css';
import { Button } from 'react-bootstrap';
import { XCircleFill } from 'react-bootstrap-icons';
import levelUpIcon from './img/level-up.svg';
import swordIcon from './img/sword.svg';

const Counter = ({ name, handler, showDeleteButton }) => {
    const [levelCount, setLeverCount] = useState(1);
    const [itemsPowerCount, setItemsPowerCount] = useState(0);

    function levelInc() {
        if (levelCount < 10) {
            setLeverCount(levelCount + 1)
        }
    }
    function levelDec() {
        if (levelCount > 1) {
            setLeverCount(levelCount - 1)
        }
    }
    function itemsPowerInc() {
        setItemsPowerCount(itemsPowerCount + 1)
    }
    function itemsPowerDec() {
        if (itemsPowerCount >= 1) {
            setItemsPowerCount(itemsPowerCount - 1)
        }
    }

    const powerCount = levelCount + itemsPowerCount;

    return (
        <div className='container w-50 p-2 my-2 text-center'> 
            <div className="row d-flex">
                <div className="col-6 d-flex justify-content-start align-items-center fs-2 fw-bold">
                    {showDeleteButton && (
                        <div className="mx-1 d-flex align-items-center">
                            <XCircleFill size={36} onClick={handler} style={{color:'red'}}/>
                        </div>
                    )}
                    {name}
                </div>
                <div className="col-6 d-flex justify-content-end align-items-center gap-1">
                    <img src={levelUpIcon} alt="levelUpIcon" style={{ width: '30px'}} />
                    <div className="fs-3" style={{width:'2rem'}}>{levelCount}</div>
                    <Button onClick={levelInc} variant="outline-dark" className='rounded-5 d-flex align-items-center' style={{ width: '33px', height: '33px' }}>+</Button>
                    <Button onClick={levelDec} variant="outline-dark" className='rounded-5 d-flex align-items-center' style={{ width: '33px', height: '33px' }}>-</Button>
                </div>
            </div>
            <div className="row d-flex">
                <div className="col-6 d-flex justify-content-start align-items-center fs-2">
                    <div className="fs-2">Сила: <span className='fw-bold'>{powerCount}</span></div>
                </div>
                <div className="col-6 d-flex justify-content-end align-items-center gap-1">
                    <img src={swordIcon} alt="swordIcon" style={{ width: '30px' }} />
                    <div className="fs-3" style={{width:'2rem'}}>{itemsPowerCount}</div>
                    <Button onClick={itemsPowerInc} variant="outline-dark" className='rounded-5 d-flex align-items-center' style={{ width: '33px', height: '33px' }}>+</Button>
                    <Button onClick={itemsPowerDec} variant="outline-dark" className='rounded-5 d-flex align-items-center' style={{ width: '33px', height: '33px' }}>-</Button>
                </div>
            </div>
        </div>
    )
}

export default Counter;
