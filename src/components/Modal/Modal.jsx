import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import { useEffect } from 'react';

import { ModalOverlay, ModalContentWindow } from './Modal.styled';
const modalRoot = document.querySelector('#modal-root');

export const Modal = ({ closeModal, largeImage }) => {
  useEffect(() => {
    const checkESC = event => {
      if (event.code === 'Escape') {
        closeModal();
      }
    };
    document.addEventListener('keydown', checkESC);

    return () => document.removeEventListener('keydown', checkESC);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return createPortal(
    <ModalOverlay onClick={closeModal}>
      <ModalContentWindow>
        <img src={largeImage} alt="tag" />
      </ModalContentWindow>
    </ModalOverlay>,
    modalRoot
  );
};

Modal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  largeImage: PropTypes.string.isRequired,
};
