import React, { useEffect, useState } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Button, Modal, InputGroup, Form, Carousel } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { actions } from '../../store/countersSlice';
import UserAvatar from '../UserAvatar';
import { avatarList } from '../../avatarList';
import { motion } from 'framer-motion';

const EditCounterModal = ({ show, onHide, data }) => {
  const dispatch = useDispatch();
  const { id, name, avatarId, lvl, itemsLvl } = data;

  const validationSchema = Yup.object().shape({
    name: Yup
      .string()
      .trim()
      .required('Обязательное поле')
      .min(1, 'От 1 до 15 символов')
      .max(15, 'От 1 до 15 символов')
  });

  const updateItem = (item) => {
    dispatch(actions.updateCounter({
      id: id, changes: item
    }));
  };

  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    setSelectedImage(avatarId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [show]);

  const handleAvatarSelect = (selectedIndex) => {
    setSelectedImage(selectedIndex);
  };

  return (
    <>
      <Modal show={show} onHide={onHide}>
        <Formik
          initialValues={{
            name: name,
          }}
          validationSchema={validationSchema}
          onSubmit={(values, { resetForm }) => {
            try {
              const updatedCounter = {
                id: id, name: values.name.trim(), avatarId: selectedImage, lvl: lvl, itemsLvl: itemsLvl
              };
              updateItem(updatedCounter);
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
                <Modal.Title>
                  Редактирование персонажа
                </Modal.Title>
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
                <motion.div
                  whileTap={{ scale: 0.8 }}
                >
                  <Button variant="secondary" onClick={onHide}>Отмена</Button>
                </motion.div>
                <motion.div
                  whileTap={{ scale: 0.8 }}
                >
                  <Button type="submit" variant="success">Сохранить</Button>
                </motion.div>
              </Modal.Footer>
            </Form>
          )}
        </Formik>
      </Modal>
    </>
  )
};

export default EditCounterModal;
