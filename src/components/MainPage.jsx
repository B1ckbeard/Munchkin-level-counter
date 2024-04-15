import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectors, actions } from '../store/countersSlice';
import { Button } from 'react-bootstrap';
import { PersonPlusFill, PersonXFill } from 'react-bootstrap-icons';
import CountersList from './CountersList';
import AddCounterModal from './AddCounterModal';

const MainPage = () => {
  const counters = useSelector(selectors.selectAll);
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const handleShowModal = () => setShow(true);
  const handleCloseModal = () => setShow(false);
  const toggleShowDelete = () => dispatch(actions.toggleRemove());

  return (
    <>
      <section className='section__main'>
        <AddCounterModal onShow={show} onHide={handleCloseModal} />
        <CountersList />
        <div className="d-flex w-100 position-fixed gap-2 bottom-0 justify-content-end p-4">
          <Button onClick={handleShowModal} variant="success" size="lg" className='rounded-5 d-flex align-items-center'>
            <PersonPlusFill size={40} />
          </Button>
          {counters.length !== 0 && (
            <Button onClick={toggleShowDelete} variant="danger" size="lg" className='rounded-5 d-flex align-items-center'>
              <PersonXFill size={40} />
            </Button>
          )}
        </div>
      </section>
    </>
  );
}

export default MainPage;