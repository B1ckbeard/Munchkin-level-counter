import React from 'react';
import { useState } from 'react';
import Counter from './Counter';
import { Button, Modal, InputGroup, Form } from 'react-bootstrap';
import { PlusLg, PersonPlusFill, PersonXFill, XCircle } from 'react-bootstrap-icons';


function UserModal() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [components, setComponents] = useState([]);
    const [titleInput, setTitleInput] = useState('');
    const [showDeleteButtons, setShowDeleteButtons] = useState(false);

    const handleSowDelete = () => showDeleteButtons ? setShowDeleteButtons(false) : setShowDeleteButtons(true);

    const addComponent = () => {
        if (titleInput.trim() !== '') {
            const newComponent = <Counter key={components.length} name={titleInput} />;
            setComponents([...components, newComponent]);
            setTitleInput('');
        }
    }

    const removeComponent = (index) => {
        setComponents(components.filter((_, i) => i !== index));
    };

    return (
        <>
            <div className="d-flex w-100 position-fixed gap-2 bottom-0 justify-content-end p-3">
                <Button onClick={handleShow} variant="success" size="lg" className='rounded-5 d-flex align-items-center'>
                    <PersonPlusFill size={50}/>
                </Button>
                <Button onClick={handleSowDelete} variant="danger" size="lg" className='rounded-5 d-flex align-items-center'>
                    <PersonXFill size={50}/>
                </Button>
            </div>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                </Modal.Header>
                <Modal.Body>
                    <InputGroup className="mb-3">
                        <Form.Control
                            aria-describedby="inputGroup-sizing-default"
                            placeholder='Введите имя'
                            value={titleInput}
                            onChange={(e) => setTitleInput(e.target.value)}
                        />
                    </InputGroup>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={addComponent} variant="success" size="lg" className='p-0 d-flex rounded-5 align-items-center'>
                        <PlusLg size={50}/>
                    </Button>
                </Modal.Footer>
            </Modal>
            <div>
                {components.length === 0 ? (
                    <h2 className="text-center mt-2">Список пуст</h2>
                ) : (
                components.map((Component, index) => (
                    <div key={index}>
                        {Component}
                        {showDeleteButtons && (
                            <div className="position-absolute" style={{left: '45%', marginTop:'-85px'}}>
                                <Button onClick={() => removeComponent(index)} variant="danger" className='p-0 rounded-5 d-flex align-items-center'>
                                    <XCircle size={50}/>
                                </Button>
                            </div>
                        )}
                    </div>
                )))}
            </div>
        </>
    );
}

export default UserModal;
