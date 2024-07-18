import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectors, actions } from '../store/countersSlice';
import { actions as modalActions } from '../store/modalSlice';
import { Navbar, Button } from 'react-bootstrap';
import { FaUserEdit, FaUserPlus } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { FaDice } from "react-icons/fa6";

const Header = () => {
  const counters = useSelector(selectors.selectAll);
  const dispatch = useDispatch();

  const toggleShowDelete = () => dispatch(actions.toggleRemove());
  const handleShowAddModal = () => { dispatch(modalActions.openModal({ modalType: 'add' })); };
  const handleShowSettings = () => { dispatch(modalActions.openModal({ modalType: 'settings' })); };
  const handleShowDiceRoll = () => { dispatch(modalActions.openModal({ modalType: 'roll' })); };

  return (
    <Navbar className="justify-content-center mb-3 shadow px-1" style={{ backgroundColor:'rgb(93, 64, 55)' }}>
      <Navbar.Brand className='fs-6' style={{ color: 'rgb(244, 208, 63)', cursor: 'default'}}>Munchkin level counter</Navbar.Brand>
      <Button onClick={handleShowAddModal} variant="outline-dark" size="sm" className='border-0' style={{ color: 'rgb(244, 208, 63)'}}>
        <FaUserPlus size={25}/>
      </Button>
      {counters.length !== 0 && (
        <Button onClick={toggleShowDelete} variant="outline-dark" size="sm" className='border-0' style={{ color: 'rgb(244, 208, 63)'}}>
          <FaUserEdit size={25}/>
        </Button>
      )}
      <Button onClick={handleShowDiceRoll} variant="outline-dark" size="sm" className='border-0' style={{ color: 'rgb(244, 208, 63)'}}>
          <FaDice size={25}/>
      </Button>
      <Button onClick={handleShowSettings} variant="outline-dark" size="sm" className='border-0' style={{ color: 'rgb(244, 208, 63)'}}>
          <IoMdSettings size={25}/>
      </Button>
    </Navbar>
  )
}

export default Header;
