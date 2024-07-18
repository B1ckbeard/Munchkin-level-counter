import React, { useState, useEffect } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { FaDiceOne, FaDiceTwo, FaDiceThree, FaDiceFour, FaDiceFive, FaDiceSix } from "react-icons/fa";
import { TbReload } from "react-icons/tb";

const DiceRollModal = ({ show, onHide }) => {

  const [diceResult, setDiceResult] = useState(1);

  const rollDice = () => {
    const result = Math.floor(Math.random() * 6) + 1;
    setDiceResult(result);
  };

  useEffect(() => {
      rollDice();
  }, [show]);

  const renderDiceIcon = () => {
    switch (diceResult) {
      case 1:
        return <FaDiceOne size={100} />;
      case 2:
        return <FaDiceTwo size={100} />;
      case 3:
        return <FaDiceThree size={100} />;
      case 4:
        return <FaDiceFour size={100} />;
      case 5:
        return <FaDiceFive size={100} />;
      case 6:
        return <FaDiceSix size={100} />;
      default:
        return <FaDiceOne size={100} />;
    }
  };

  return (
    <>
      <Modal show={show} onHide={onHide}>
        <Modal.Header closeButton className='mb-2'>
          <Modal.Title>Dice roll</Modal.Title>
        </Modal.Header>
        <Modal.Body className='text-center mb-2'>
          {renderDiceIcon()}
        </Modal.Body>
        <Modal.Footer>
        <Button
          onClick={rollDice}
          variant="success"
          className='rounded-5 border-0 d-flex align-items-center justify-content-center mx-auto'
          style={{ width: '50px', height: '50px' }}>
          <TbReload size={50} className='mx-auto' />
        </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
};

export default DiceRollModal;
