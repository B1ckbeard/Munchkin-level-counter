import React, { useState } from 'react';
import { Button } from 'react-bootstrap';

const Counter = ({name}) => {
    const [levelCount, setLeverCount] = useState(1);
    const [itemsPowerCount, setItemsPowerCount] = useState(0);

    function levelInc() {
        if (levelCount < 10){
            setLeverCount(levelCount + 1)
        }
    }
    function levelDec() {
        if(levelCount > 1){
            setLeverCount(levelCount - 1)
        }
    }
    function itemsPowerInc() {
        setItemsPowerCount(itemsPowerCount + 1)
    }
    function itemsPowerDec() {
        if(itemsPowerCount >= 1) {
            setItemsPowerCount(itemsPowerCount - 1)
        }
    }

    const powerCount = levelCount + itemsPowerCount;

    return (
        <div className='container w-50 border rounded shadow p-2 my-2 text-center' style={{ minWidth: '370px' }}>
            <div className="d-flex flex-row justify-content-between">
                <div className="d-flex flex-column">
                    <div className="d-flex flex-row">
                        <h2 className='fw-bold'>{name}</h2>
                    </div>
                    <div className="d-flex flex-row">
                        <h2>Сила: {powerCount}</h2>
                    </div>
                </div>
                <div className="d-flex flex-column">
                    <div className="d-flex flex-row gap-1 justify-content-end align-items-center">
                        <h2>Ур: {levelCount}</h2>
                        <Button onClick={levelInc} variant="outline-secondary" style={{width:'33px', height:'33px'}} className='d-flex rounded-5 justify-content-center align-items-center'>+</Button>
                        <Button onClick={levelDec} variant="outline-secondary" style={{width:'33px', height:'33px'}} className='d-flex rounded-5 justify-content-center align-items-center'>-</Button>
                    </div>
                    <div className="d-flex flex-row gap-1 justify-content-end align-items-center">
                        <h2>Шм: {itemsPowerCount}</h2>
                        <Button onClick={itemsPowerInc} variant="outline-secondary" style={{width:'33px', height:'33px'}} className='d-flex rounded-5 justify-content-center align-items-center' >+</Button>
                        <Button onClick={itemsPowerDec} variant="outline-secondary" style={{width:'33px', height:'33px'}} className='d-flex rounded-5 justify-content-center align-items-center'>-</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Counter;
