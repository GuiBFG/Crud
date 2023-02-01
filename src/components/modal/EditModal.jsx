import React, { useEffect, useState } from 'react';
import { Api } from '../../api/api';
import '../../assets/css/EditModal.css';
import Botao from '../botao';

const EditModal = (props) => {
  const [userName, setUserName] = useState('');
  const [descricao, setDescricao] = useState('');
  const [email, setEmail] = useState('');
  const [warningErrorInput, setWarningErrorInput] = useState(false);

  const isInputFilled = userName !== '' && email !== '' && descricao !== '';

  const onSave = (id) => {
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

  const onSubmit = (id) => {
    isInputFilled ? onSave(id) : setWarningErrorInput(true);
  };

  useEffect(() => {
    if (props.item !== undefined) {
      setUserName(props.item.nome);
      setEmail(props.item.email);
      setDescricao(props.item.descricao);
    }
  }, [props.item]);

  return (
    <main>
      <div className={'modal-edit ' + props.mostrar}>
        <div className='position-delete-modal'>
          <Botao class={'delete-modal'} action={props.funcaoEdit}>
            X
          </Botao>
        </div>

        <div className='card-txt'>
          <h1>Modificar Registros</h1>

          <div>
            <input
              type='text'
              placeholder='Nome completo'
              className='input-modal'
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
            <input
              type='text'
              placeholder='Descrição'
              className='input-modal'
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
            />
            <input
              type='text'
              placeholder='Email'
              className='input-modal'
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
            <Botao class={'btn-save-modal'} action={() => onSubmit(props.id)}>
              Salvar
            </Botao>
          </div>
        </div>
      </div>
    </main>
  );
};

export default EditModal;
