import React, { useState, useEffect, useContext } from 'react';
import { useSelector } from 'react-redux';
import { selectors } from './store/countersSlice';
import { CounterContext } from './context';
import Counter from './Counter';
import { Button, Modal, InputGroup, Form } from 'react-bootstrap';
import { PlusLg, PersonPlusFill, PersonXFill } from 'react-bootstrap-icons';

function MainPage() {
  const counters = useSelector(selectors.selectAll);
  const { addItem, addItems, removeItem } = useContext(CounterContext);
  const [show, setShow] = useState(false);
  const [titleInput, setTitleInput] = useState('');
  const [deleteActive, setDeleteActive] = useState(false);
  const [message, setMessage] = useState('');
  const [showMessage, setShowMessage] = useState(false);

  const handleShowModal = () => setShow(true);
  const handleCloseModal = () => setShow(false);
  const handleShowDelete = () => setDeleteActive(!deleteActive);

  const addCounter = () => {
    if (titleInput.trim() !== '') {
      const newCounter = { id: counters.length, name: titleInput };
      addItem(newCounter);
      setTitleInput('');
      setDeleteActive(false);
      setMessage(`Игрок с именем ${titleInput} добавлен`);
      setShowMessage(true);
    }
  };

  useEffect (() => {
    addItems();
  }, []);

  useEffect(() => {
    if (showMessage) {
      setTimeout(() => {
        setShowMessage(false);
      }, 5000);
    }
  }, [showMessage]);

  return (
    <>
      <section className='section__main'>
        <div className="d-flex w-100 position-fixed gap-2 bottom-0 justify-content-end p-4">
          <Button onClick={handleShowModal} variant="success" size="lg" className='rounded-5 d-flex align-items-center'>
            <PersonPlusFill size={40} />
          </Button>
          {counters.length !== 0 && (
            <Button onClick={handleShowDelete} variant="danger" size="lg" className='rounded-5 d-flex align-items-center'>
              <PersonXFill size={40} />
            </Button>
          )}
        </div>
        <div>
          {(counters.length === 0) ? (
            <div className="empty__descr">
              <h2 className="text-center mt-2">Список пуст</h2>
              <p className='text-center mt-2 px-3'>Чтобы добавить игрока, нажмите на кнопку внизу экрана</p>
            </div>
          ) : (
            counters.map((counter) => (
              <Counter
                key={counter.id}
                id={counter.id}
                name={counter.name}
                onRemoveHandler={() => removeItem(counter.id)}
                showDeleteButton={deleteActive}
              />
            )))
          }
        </div>
        <Modal show={show} onHide={handleCloseModal}>
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
            <Button onClick={addCounter} variant="success" size="lg" className='p-0 d-flex rounded-5 align-items-center'>
              <PlusLg size={40} />
            </Button>
          </Modal.Footer>
        </Modal>
      </section>
    </>
  );
}

export default MainPage;