import React, { useState, useEffect } from 'react';
import { Button, Modal, InputGroup, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { selectors, actions, startLvl } from '../store/countersSlice';

const AddCounterModal = () => {
  const dispatch = useDispatch();
  const counters = useSelector(selectors.selectAll);
  const { isShowModal } = useSelector(state => state.counters);
  const handleCloseModal = () => dispatch(actions.closeModal());
  const [titleInput, setTitleInput] = useState('');
  const [message, setMessage] = useState('');
  const [showMessage, setShowMessage] = useState(false);

  const addItem = (item) => {
    dispatch(actions.addCounter(item));
    dispatch(actions.closeRemove());
    const listItems = [...counters, item];
    window.localStorage.setItem('counters', JSON.stringify(listItems));
  };

  const handleAddCounter = () => {
    if (titleInput.trim() !== '') {
      const newCounter = { id: counters.length, name: titleInput, lvl: startLvl, itemsLvl: 0 };
      addItem(newCounter);
      setTitleInput('');
      setMessage(`Игрок с именем ${titleInput} добавлен`);
      setShowMessage(true);
    }
  };

  useEffect(() => {
    if (showMessage) {
      setTimeout(() => {
        setShowMessage(false);
      }, 5000);
    }
  }, [showMessage]);

  return (
    <>
      <Modal show={isShowModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
        </Modal.Header>
        <Modal.Body className='text-center'>
          <InputGroup>
            <Form.Control
              autoFocus={true}
              aria-describedby="inputGroup-sizing-default"
              placeholder='Введите имя'
              value={titleInput}
              onChange={(e) => setTitleInput(e.target.value)}
            />
          </InputGroup>
          <Form.Label className='text-success mt-2'>{showMessage && message}</Form.Label>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleAddCounter} variant="success">
            Добавить
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
};

export default AddCounterModal;
