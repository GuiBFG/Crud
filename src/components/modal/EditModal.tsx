import React, { FunctionComponent, useState } from 'react';
import { Api } from '../../api/api';
import '../../assets/css/EditModal.css';
import Button from '../button';
import { ModalProps } from '../interfaces/IModalProps';

export const editModal: FunctionComponent<ModalProps> = ({
  isModalOpen,
  isModalClose,
  id,
}) => {
  const [userName, setUserName] = useState('');
  const [descricao, setDescricao] = useState('');
  const [email, setEmail] = useState('');
  const [warningErrorInput, setWarningErrorInput] = useState(false);

  const isInputFilled = userName !== '' && email !== '' && descricao !== '';

  const onSave = (id: number) => {
    try {
      Api.put(`email/${id}`, {
        nome: userName,
        email: email,
        descricao: descricao,
      }).then(() => window.location.reload());
    } catch (err) {
      console.log(err);
    }
  };

  const onSubmit = (id: number) => {
    isInputFilled ? onSave(id) : setWarningErrorInput(true);
  };

  return (
    <div className='posisiton-modal-edit'>
      <div className={'modal-edit ' + isModalOpen}>
        <div className='position-close-modal'>
          <Button class={'close-modal'} action={isModalClose}>
            X
          </Button>
        </div>
        <div className='card-txt'>
          <h1>Modificar Registros</h1>
          <div className='position-input-modal-edit'>
            <input
              type='text'
              placeholder='Nome completo'
              className='input-modal-edit'
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
            <input
              type='text'
              placeholder='Descrição'
              className='input-modal-edit'
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
            />
            <input
              type='text'
              placeholder='Email'
              className='input-modal-edit'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {warningErrorInput && (
              <p>
                <span className='warning'>*</span>Coloque um campo válido nos
                inputs restantes!
              </p>
            )}
          </div>
          <div className='position-save-modal'>
            <Button class={'btn-save-modal'} action={() => onSubmit(id)}>
              Salvar
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default editModal;
