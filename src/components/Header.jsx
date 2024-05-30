import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectors, actions } from '../store/countersSlice';
import { Navbar, Button } from 'react-bootstrap';
import { PersonPlusFill, PersonXFill } from 'react-bootstrap-icons';

const Header = () => {
  const counters = useSelector(selectors.selectAll);
  const dispatch = useDispatch();
  const handleShowModal = () => dispatch(actions.showModal());
  const toggleShowDelete = () => dispatch(actions.toggleRemove());

  return (
    <Navbar className="justify-content-center mb-4 shadow" style={{ backgroundColor:'rgb(93, 64, 55)' }}>
      <Navbar.Brand href="/" style={{ color: 'rgb(244, 208, 63)'}}>Munchkin level counter</Navbar.Brand>
      <Button onClick={handleShowModal} variant="outline-dark" size="md" className='border-0' style={{ color: 'rgb(244, 208, 63)'}}>
        <PersonPlusFill size={25}/>
      </Button>
      {counters.length !== 0 && (
        <Button onClick={toggleShowDelete} variant="outline-dark" size="md" className='border-0' style={{ color: 'rgb(244, 208, 63)'}}>
          <PersonXFill size={25}/>
        </Button>
      )}
    </Navbar>
  )
}

export default Header;
