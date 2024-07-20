import React, { useEffect, useState } from 'react';
import { Button, Modal, Form, InputGroup } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { actions, selectMaxLevel } from '../../store/settingsSlice';

const SettingsModal = ({ show, onHide }) => {
  const dispatch = useDispatch();
  const maxLevel = useSelector(selectMaxLevel);
  const defaultMaxLvl = 10;

  const [inputValue, setInputValue] = useState(maxLevel);

  const handleInputChange = (event) => {
    const value = parseInt(event.target.value, 10);
    if (!isNaN(value)) {
      setInputValue(value);
    }
  };

  const handleSetDefaultMaxLvl = () => {
    setInputValue(defaultMaxLvl);
  };

  const handleSaveLevel = () => {
    dispatch(actions.changeMaxLevel(inputValue));
    onHide();
  };

  return (
    <>
      <Modal show={show} onHide={onHide}>
        <Modal.Header closeButton>
          <Modal.Title>Настройки</Modal.Title>
        </Modal.Header>
        <Modal.Body className=''>
          <InputGroup className="mb-2">
            <InputGroup.Text id="inputMaxLevel">
              Макс. уровень
            </InputGroup.Text>
            <Form.Control className=''
              type="number"
              id="inputMaxLevel"
              value={inputValue}
              onChange={e => handleInputChange(e)}
            />
            <Button onClick={handleSetDefaultMaxLvl} variant="success" className='mx-auto'>Сбросить</Button>
          </InputGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleSaveLevel} variant="success" className='mx-auto'>Сохранить</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
};

export default SettingsModal;