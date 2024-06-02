import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actions as modalActions } from '../../store/modalSlice';
import AddCounterModal from './AddCounterModal';
import EditCounterModal from './EditCounterModal';

const ModalWindow = () => {
  const dispatch = useDispatch();
  const modalType = useSelector((state) => state.modals.modalType);
  const data = useSelector((state) => state.modals.data);
  const showModal = useSelector((state) => state.modals.isOpened);

  const handleCloseModal = () => {
    dispatch(modalActions.closeModal());
  };

  switch (modalType) {
    case 'add': {
      return (
        <AddCounterModal
          show={showModal}
          onHide={handleCloseModal}
        />
      );
    }
    case 'update': {
      return (
        <EditCounterModal
          show={showModal}
          onHide={handleCloseModal}
          data={data}
        />
      );
    }
    default: {
      return null;
    }
  }
};

export default ModalWindow;
