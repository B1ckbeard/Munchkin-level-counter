import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Button, Modal, InputGroup, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { selectors, actions, startLvl } from '../store/countersSlice';

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
                id: counters.length, name: values.name.trim(), lvl: startLvl, itemsLvl: 0
              };
              addItem(newName);
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
