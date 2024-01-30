import React, { useState, useEffect } from 'react';
import Counter from './Counter';
import { Button, Modal, InputGroup, Form } from 'react-bootstrap';
import { PlusLg, PersonPlusFill, PersonXFill } from 'react-bootstrap-icons';

function MainPage() {
    const [show, setShow] = useState(false);
    const [counters, setCounters] = useState([]);
    const [titleInput, setTitleInput] = useState('');
    const [deleteActive, setDeleteActive] = useState(false);
    const [message, setMessage] = useState('');
    const [showMessage, setShowMessage] = useState(false);

    const handleShowModal = () => setShow(true);
    const handleCloseModal = () => setShow(false);

    const handleShowDelete = () => setDeleteActive(!deleteActive);

    const addComponent = () => {
        if (titleInput.trim() !== '') {
            const nCounter = { key: counters.length, name: titleInput};
            setCounters([...counters, nCounter]);
            setTitleInput('');
            setDeleteActive(false);
            setMessage(`Игрок с именем ${titleInput} добавлен`);
            setShowMessage(true);
        }
    }

    useEffect(() => {
        if (showMessage) {
            setTimeout(() => {
                setShowMessage(false);
            }, 5000);
        }
    }, [showMessage]);

    const removeComponent = (index) => {
        setCounters(counters.filter((_, i) => i !== index));
    };

    return (
        <>
            <section className='section__main'>
                <div className="d-flex w-100 position-fixed gap-2 bottom-0 justify-content-end p-4">
                    <Button onClick={handleShowModal} variant="success" size="lg" className='rounded-5 d-flex align-items-center'>
                        <PersonPlusFill size={50} />
                    </Button>
                    {counters.length !== 0 && (
                    <Button onClick={handleShowDelete} variant="danger" size="lg" className='rounded-5 d-flex align-items-center'>
                        <PersonXFill size={50} />
                    </Button>
                    )}
                </div>
                <div>
                    {counters.length === 0 ? (
                        <div className="empty__descr">
                            <h2 className="text-center mt-2">Список пуст</h2>
                            <p className='text-center mt-2 px-2'>Чтобы добавить игрока, нажмите на кнопку внизу экрана</p>
                        </div>
                    ) : (
                        counters.map((counter, index) => (
                            <Counter
                                key={index}
                                name={counter.name}
                                handler={() => removeComponent(index)}
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
                                aria-describedby="inputGroup-sizing-default"
                                placeholder='Введите имя'
                                value={titleInput}
                                onChange={(e) => setTitleInput(e.target.value)}
                            />
                        </InputGroup>
                        <Form.Label className='text-success mt-2'>{showMessage && message}</Form.Label>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={addComponent} variant="success" size="lg" className='p-0 d-flex rounded-5 align-items-center'>
                            <PlusLg size={50} />
                        </Button>
                    </Modal.Footer>
                </Modal>
            </section>
        </>
    );
}

export default MainPage;
