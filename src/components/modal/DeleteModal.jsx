import React from 'react';
import { Api } from '../../api/api';
import '../../assets/css/DeleteModal.css';
import Botao from '../botao';

const deleteModal = (props) => {
  const deleteUserId = (id) => {
    Api.delete(`email/${id}`).then(() => window.location.reload());
  };

  return (
    <>
      <div className={'modal-delete ' + props.mostrarDelete}>
        <div className='position-modal-delete'></div>

        <div className='delete-records'>
          <h1>Deseja Deletar o Registro?</h1>

          <div className='position-btn-modal'>
            <Botao class={'btn-close-modal'} action={props.funcaoDelete}>
              Não
            </Botao>
            <Botao class={'btn-delete'} action={() => deleteUserId(props.id)}>
              Sim
            </Botao>
          </div>
        </div>
      </div>
    </>
  );
};

export default deleteModal;
