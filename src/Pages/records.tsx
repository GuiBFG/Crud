import React, { useState, useEffect } from 'react';
import '../assets/css/records.css';
import { useNavigate } from 'react-router-dom';
import { Api } from '../api/api';
import EditModal from '../components/modal/EditModal';
import DeleteModal from '../components/modal/DeleteModal';
import Button from '../components/button';

export const Records = () => {
  const [getEmail, setGetEmail] = useState([]);
  const [modalEdit, setModalEdit] = useState('hide');
  const [modalDelete, setModalDelete] = useState('hide');
  const [getId, setGetId] = useState(0);
  const navigate = useNavigate();

  const backButton = () => {
    navigate('/');
  };

  const getUSer = () => {
    Api.get('email').then((result) => {
      setGetEmail(result.data);
    });
  };

  const isModalEditOpen = (isOpen: string, id: number) => {
    if (isOpen === 'hide') {
      setModalEdit('show');
    } else {
      setModalEdit('hide');
    }
    setGetId(id);
    window.scroll({ top: 0, left: 0, behavior: 'smooth' });
  };

  const isModalDeleteOpen = (isOpen: string, id: number) => {
    if (isOpen === 'hide') {
      setModalDelete('show');
    } else {
      setModalDelete('hide');
    }
    setGetId(id);
    window.scroll({ top: 0, left: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    getUSer();
  }, [modalEdit, modalDelete]);

  return (
    <>
      <header>
        <div>
          <h1>SyncTur</h1>
        </div>
        <div>
          <div className='seta' onClick={backButton}></div>
        </div>
      </header>
      <main>
        <div className='container'>
          <h2>Registros</h2>
          <EditModal
            isModalOpen={modalEdit}
            isModalClose={isModalEditOpen}
            id={getId}
          />
          <DeleteModal
            isModalOpen={modalDelete}
            isModalClose={isModalDeleteOpen}
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
                    <Button
                      class={'edit-btn'}
                      action={() => isModalEditOpen(modalEdit, item.id)}
                    >
                      Editar
                    </Button>
                    <Button
                      class={'delete-btn'}
                      action={() => isModalDeleteOpen(modalDelete, item.id)}
                    >
                      Excluir
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
          <div className={'fundo_escurecido ' + modalEdit}></div>
          <div className={'fundo_escurecido ' + modalDelete}></div>
        </div>
      </main>
    </>
  );
};
export default Records;
