import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectors, actions } from '../store/countersSlice';
import { Container, Navbar, Nav, Button } from 'react-bootstrap';

const Header = () => {
  const counters = useSelector(selectors.selectAll);
  const dispatch = useDispatch();
  const handleShowModal = () => dispatch(actions.showModal());
  const toggleShowDelete = () => dispatch(actions.toggleRemove());

  return (
    <Navbar expand="lg" className="justify-content-center mb-3" style={{ backgroundColor:'rgb(93, 64, 55)' }}>
      <Navbar.Brand href="/" style={{ color: 'rgb(244, 208, 63)'}}>Munchkin level counter</Navbar.Brand>
      <Button onClick={handleShowModal} variant="outline-dark" size="md" className='mx-2' style={{ color: 'rgb(244, 208, 63)'}}>Add</Button>
      {counters.length !== 0 && (
        <Button onClick={toggleShowDelete} variant="outline-dark" size="md" style={{ color: 'rgb(244, 208, 63)'}}>Delete</Button>
      )}
    </Navbar>
  )
}

export default Header;
