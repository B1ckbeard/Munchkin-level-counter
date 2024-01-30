import React, { useState } from 'react';
import './Counter.css';
import { Button } from 'react-bootstrap';
import { XCircle } from 'react-bootstrap-icons';

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
        <div className='container w-50 p-3 my-2 text-center'>
            <div className="d-flex flex-row justify-content-between">
                <div className="d-flex flex-column w-25">
                    <div className="d-flex flex-row">
                        <h2 className='fw-bold'>{name}</h2>
                    </div>
                    <div className="d-flex flex-row">
                        <h2>Сила: {powerCount}</h2>
                    </div>
                </div>
                {showDeleteButton && (
                        <Button onClick={handler} variant="danger" className=''>
                            <XCircle size={50} />
                        </Button>
                    )}
                <div className="d-flex flex-column">
                    <div className="d-flex flex-row gap-1 justify-content-end align-items-center">
                        <h2>Ур: {levelCount}</h2>
                        <Button onClick={levelInc} variant="outline-secondary" style={{ width: '33px', height: '33px' }} className='d-flex rounded-5 justify-content-center align-items-center'>+</Button>
                        <Button onClick={levelDec} variant="outline-secondary" style={{ width: '33px', height: '33px' }} className='d-flex rounded-5 justify-content-center align-items-center'>-</Button>
                    </div>
                    <div className="d-flex flex-row gap-1 justify-content-end align-items-center">
                        <h2>Шм: {itemsPowerCount}</h2>
                        <Button onClick={itemsPowerInc} variant="outline-secondary" style={{ width: '33px', height: '33px' }} className='d-flex rounded-5 justify-content-center align-items-center' >+</Button>
                        <Button onClick={itemsPowerDec} variant="outline-secondary" style={{ width: '33px', height: '33px' }} className='d-flex rounded-5 justify-content-center align-items-center'>-</Button>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Counter;
