import React, { useState, useEffect } from 'react';
import '../assets/css/records.css';
import { useNavigate } from 'react-router-dom';
import { Api } from '../api/api';
import EditModal from '../components/modal/EditModal';
import DeleteModal from '../components/modal/DeleteModal';
import Botao from '../components/botao';

export const Records = () => {
  const [getEmail, setGetEmail] = useState([]);
  const [modalEdit, setModalEdit] = useState('hide');
  const [modalDelete, setModalDelete] = useState('hide');
  const [getId, setGetId] = useState(0);
  const navigate = useNavigate();

  const backButton = () => {
    navigate('/');
  };

  const listarAPI = () => {
    Api.get('email').then((result) => {
      setGetEmail(result.data);
    });
  };

  const isModalEditOpen = (estadoAtual: string, id: number) => {
    if (estadoAtual === 'hide') {
      setModalEdit('show');
    } else {
      setModalEdit('hide');
    }

    setGetId(id);
    window.scroll({ top: 0, left: 0, behavior: 'smooth' });
  };

  const isModalDeleteOpen = (estadoAtual: string, id: number) => {
    if (estadoAtual === 'hide') {
      setModalDelete('show');
    } else {
      setModalDelete('hide');
    }

    setGetId(id);
    window.scroll({ top: 0, left: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    listarAPI();
  }, []);

  return (
    <>
      <header>
        <div>
          <h1>SyncTur</h1>
        </div>
        <div>
          <div className='seta' onClick={() => backButton()}></div>
        </div>
      </header>
      <main>
        <h2>Registros</h2>
        <EditModal
          mostrar={modalEdit}
          funcaoEdit={isModalEditOpen}
          id={getId}
        />
        <DeleteModal
          mostrarDelete={modalDelete}
          funcaoDelete={isModalDeleteOpen}
          id={getId}
        />
        {getEmail.map((item: any) => {
          return (
            <div className='card-records' key={item.id}>
              <div className='card-position'>
                <p className='card-name'>{item.nome}</p>
                <p className='card-description'>{item.descricao}</p>
                <p className='card-email'>Email: {item.email}</p>
                <div className='btn-position'>
                  <Botao
                    class={'edit-btn'}
                    action={() => isModalEditOpen(modalEdit, item.id)}
                  >
                    Editar
                  </Botao>
                  <Botao
                    class={'delete-btn'}
                    action={() => isModalDeleteOpen(modalDelete, item.id)}
                  >
                    Excluir
                  </Botao>
                </div>
              </div>
            </div>
          );
        })}
        <div className={'fundo_escurecido ' + modalEdit}></div>
        <div className={'fundo_escurecido ' + modalDelete}></div>
      </main>
    </>
  );
};
export default Records;
