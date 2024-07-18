import React, { useEffect, useState } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Button, Modal, InputGroup, Form, Carousel } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { selectors, actions, startLvl } from '../../store/countersSlice';
import UserAvatar from '../UserAvatar';
import { avatarList } from '../../avatarList';

const AddCounterModal = ({ show, onHide }) => {
  const dispatch = useDispatch();
  const counters = useSelector(selectors.selectAll);

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
    const listItems = [...counters, item];
    window.localStorage.setItem('counters', JSON.stringify(listItems));
  };

  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(()=> {
    setSelectedImage(0);
  }, [show])

  const handleAvatarSelect = (selectedIndex) => {
    setSelectedImage(selectedIndex);
  };

  return (
    <>
      <Modal show={show} onHide={onHide}>
        <Formik
          initialValues={{
            name: '',
          }}
          validationSchema={validationSchema}
          onSubmit={(values, { resetForm }) => {
            try {
              const newCounter = {
                id: Date.now(), name: values.name.trim(), avatarId: selectedImage, lvl: startLvl, itemsLvl: 0
              };
              addItem(newCounter);
              resetForm();
              dispatch(actions.hideRemove());
              onHide();
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
                  interval={null}
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
              <Modal.Footer className='justify-content-center'>
                <Button variant="secondary" onClick={onHide}>Отмена</Button>
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
