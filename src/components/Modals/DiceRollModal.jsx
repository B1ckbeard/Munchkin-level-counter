import React, { useState, useEffect } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { FaDiceOne, FaDiceTwo, FaDiceThree, FaDiceFour, FaDiceFive, FaDiceSix } from "react-icons/fa";
import { TbReload } from "react-icons/tb";
import { motion } from 'framer-motion';

const DiceRollModal = ({ show, onHide }) => {

  const [diceResult, setDiceResult] = useState(1);
  const [isRolling, setIsRolling] = useState(false);

  const rollDice = () => {
    setIsRolling(true);
    const result = Math.floor(Math.random() * 6) + 1;
    setTimeout(() => {
      setIsRolling(false);
      setDiceResult(result);
    }, 500);
  };

  useEffect(() => {
    if (show) {
      setTimeout(() => {
        rollDice()
      }, 300);
    };
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

  const diceVariants = {
    rolling: {
      rotate: 360,
      transition: {
        duration: 0.5,
        repeat: Infinity,
        ease: "linear"
      }
    },
    stopped: {
      rotate: 0,
      transition: {
        duration: 0
      }
    }
  };

  return (
    <>
      <Modal show={show} onHide={onHide}>
        <Modal.Header closeButton>
        </Modal.Header>
        <Modal.Body>
          <motion.div
            className='d-flex justify-content-center align-items-center'
            animate={isRolling ? "rolling" : "stopped"}
            variants={diceVariants}
          >
            {renderDiceIcon()}
          </motion.div>
        </Modal.Body>
        <Modal.Footer>
          <motion.div
            whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.8 }}
            className='mx-auto'>
            <Button
              onClick={rollDice}
              variant="success"
              className='rounded-5 border-0 d-flex align-items-center justify-content-center'
              style={{ width: '50px', height: '50px' }}>
              <TbReload size={50} className='mx-auto' />
            </Button>
          </motion.div>
        </Modal.Footer>
      </Modal>
    </>
  )
};

export default DiceRollModal;
