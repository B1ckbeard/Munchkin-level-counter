import React, { useState } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Button, Modal, InputGroup, Form, Carousel } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { selectors, actions, startLvl } from '../store/countersSlice';
import UserAvatar from './UserAvatar';
import { avatarList } from '../avatarList';

const AddCounterModal = () => {
  const dispatch = useDispatch();
  const counters = useSelector(selectors.selectAll);
  const { isShowModal } = useSelector(state => state.counters);
  const handleCloseModal = () => dispatch(actions.closeModal());

  const validationSchema = Yup.object().shape({
    name: Yup
      .string()
      .trim()
      .required('Обязательное поле')
      .min(1, 'От 1 до 15 символов')
      .max(15, 'От 1 до 15 символов')
  });

  const addItem = (item) => {
    dispatch(actions.addCounter(item));
    dispatch(actions.closeRemove());
    const listItems = [...counters, item];
    window.localStorage.setItem('counters', JSON.stringify(listItems));
  };

  const [selectedImage, setSelectedImage] = useState(0);

  const handleAvatarSelect = (selectedIndex) => {
    setSelectedImage(selectedIndex);
  };

  return (
    <>
      <Modal show={isShowModal} onHide={handleCloseModal}>
        <Formik
          initialValues={{
            name: '',
          }}
          validationSchema={validationSchema}
          onSubmit={(values, { resetForm }) => {
            try {
              const newName = {
                id: Date.now(), name: values.name.trim(), avatar: selectedImage, lvl: startLvl, itemsLvl: 0
              };
              addItem(newName);
              setSelectedImage(0);
              resetForm();
              handleCloseModal();
            } catch (e) {
              console.error(e);
            }
          }}
        >
          {({
            errors, values, handleChange, handleSubmit,
          }) => (
            <Form onSubmit={handleSubmit}>
              <Modal.Header closeButton>
              </Modal.Header>
              <Modal.Body className='text-center'>
                <InputGroup>
                  <Form.Control
                    autoFocus={true}
                    id="name"
                    aria-describedby="inputGroup-sizing-default"
                    placeholder='Введите имя'
                    value={values.name}
                    onChange={handleChange}
                    isInvalid={errors.name}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.name}
                  </Form.Control.Feedback>
                </InputGroup>
                <br />
                <p>Выберите аватар</p>
                <Carousel
                  indicators={false}
                  className='w-50 m-auto'
                  slide={false}
                  data-bs-theme="dark"
                  activeIndex={selectedImage}
                  onSelect={handleAvatarSelect}
                >
                  {avatarList.map((avatar) =>
                    <Carousel.Item key={avatar.id}>
                      <UserAvatar
                        src={avatar.src} />
                      {`${avatar.id + 1} из ${avatarList.length}`}
                    </Carousel.Item>)
                  }
                </Carousel>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseModal}>Отмена</Button>
                <Button type="submit" variant="success">Добавить</Button>
              </Modal.Footer>
            </Form>
          )}
        </Formik>
      </Modal>
    </>
  )
};

export default AddCounterModal;
