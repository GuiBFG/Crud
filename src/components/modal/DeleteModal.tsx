import React, { FunctionComponent } from 'react';
import { Api } from '../../api/api';
import '../../assets/css/DeleteModal.css';
import Button from '../button';
import { ModalProps } from '../interfaces/IModalProps';

export const deleteModal: FunctionComponent<ModalProps> = ({
  isModalOpen,
  isModalClose,
  id,
}) => {
  const deleteUserId = (id: number) => {
    Api.delete(`email/${id}`).then(() => window.location.reload());
  };

  return (
    <>
      <div className={'modal-delete ' + isModalOpen}>
        <div className='position-modal-delete'></div>
        <div className='delete-records'>
          <h1>Deseja Deletar o Registro?</h1>
          <div className='position-btn-modal'>
            <Button class={'btn-close-modal'} action={isModalClose}>
              Não
            </Button>
            <Button class={'btn-delete'} action={() => deleteUserId(id)}>
              Sim
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default deleteModal;
