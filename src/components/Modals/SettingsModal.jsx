import React, { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { actions, selectMaxLevel } from '../../store/settingsSlice';

const SettingsModal = ({ show, onHide }) => {
  const dispatch = useDispatch();
  const maxLevel = useSelector(selectMaxLevel);

  const [inputValue, setInputValue] = useState(maxLevel);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  }

  const handleSaveLevel = ()  => {
    dispatch(actions.changeMaxLevel(inputValue));
  };

  return (
    <>
      <Modal show={show} onHide={onHide}>
        <Modal.Header closeButton>
          <Modal.Title>Настройки</Modal.Title>
        </Modal.Header>
        <Modal.Body className='text-center'>
          <p>Максимальный уровень: {maxLevel}</p>
          <Form.Label htmlFor="inputMaxLevel">Изменить</Form.Label>
          <Form.Control className='w-25 mb-2 mx-auto'
            type="number"
            id="inputMaxLevel"
            value = {inputValue}
            onChange={e => handleInputChange(e)}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleSaveLevel} variant="success" className='mx-auto'>Сохранить</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
};

export default SettingsModal;