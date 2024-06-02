import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectors, actions } from '../store/countersSlice';
import { actions as modalActions } from '../store/modalSlice';
import { Navbar, Button } from 'react-bootstrap';
import { FaUserEdit, FaUserPlus } from "react-icons/fa";

const Header = () => {
  const counters = useSelector(selectors.selectAll);
  const dispatch = useDispatch();

  const toggleShowDelete = () => dispatch(actions.toggleRemove());
  const handleShowAddModal = () => { dispatch(modalActions.openModal({ modalType: 'add' })); };

  return (
    <Navbar className="justify-content-center mb-3 shadow" style={{ backgroundColor:'rgb(93, 64, 55)' }}>
      <Navbar.Brand href="/" style={{ color: 'rgb(244, 208, 63)'}}>Munchkin level counter</Navbar.Brand>
      <Button onClick={handleShowAddModal} variant="outline-dark" size="md" className='border-0' style={{ color: 'rgb(244, 208, 63)'}}>
        <FaUserPlus size={25}/>
      </Button>
      {counters.length !== 0 && (
        <Button onClick={toggleShowDelete} variant="outline-dark" size="md" className='border-0' style={{ color: 'rgb(244, 208, 63)'}}>
          <FaUserEdit size={25}/>
        </Button>
      )}
    </Navbar>
  )
}

export default Header;
