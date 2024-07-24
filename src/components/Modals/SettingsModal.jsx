import React, { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { actions, selectMaxLevel } from '../../store/settingsSlice';
import { motion } from 'framer-motion';

const SettingsModal = ({ show, onHide }) => {
  const dispatch = useDispatch();
  const maxLevel = useSelector(selectMaxLevel);

  const [inputValue, setInputValue] = useState(maxLevel);

  const handleSaveSettings = () => {
    dispatch(actions.changeMaxLevel(inputValue));
    onHide();
  };

  const handleRadioChange = (value) => {
    setInputValue(value);
  };

  return (
    <>
      <Modal show={show} onHide={onHide}>
        <Modal.Header closeButton>
          <Modal.Title>Настройки</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <p>Максимальный уровень</p>
          <Form.Check
            inline
            name="group1"
            label="10"
            type='radio'
            id={`radio-1`}
            onChange={(e) => handleRadioChange(10)}
            checked={inputValue === 10}
          />
          <Form.Check
            inline
            name="group1"
            label="20"
            type='radio'
            id={`radio-2`}
            onChange={(e) => handleRadioChange(20)}
            checked={inputValue === 20}
          />
          <Form.Check
            inline
            name="group1"
            label="Без ограничений"
            type='radio'
            id={`radio-3`}
            onChange={(e) => handleRadioChange(1000)}
            checked={inputValue === 1000}
          />
        </Form>
        </Modal.Body>
        <Modal.Footer>
          <motion.div
            className='mx-auto'
            whileTap={{ scale: 0.8 }}
          >
            <Button
              onClick={handleSaveSettings}
              variant="success"
            >
              Сохранить
            </Button>
          </motion.div>
        </Modal.Footer>
      </Modal>
    </>
  )
};

export default SettingsModal;