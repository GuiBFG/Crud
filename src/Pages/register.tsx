import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Api } from '../api/api';
import Button from '../components/button';
import '../assets/css/register.css';
import { messageErrors } from '../utils/messageErrors';

export const Register = () => {
  const [, setGetEmail] = useState([]);
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userDescricao, setUserDescricao] = useState('');
  const navigate = useNavigate();

  const verifyIfFieldsAreWritten =
    userName !== '' && userEmail !== '' && userDescricao !== '';

  const getUser = () => {
    void Api.get('email').then((result) => {
      setGetEmail(result.data);
    });
  };

  const registerNewUser = () => {
    void Api.post('email', {
      nome: userName,
      email: userEmail,
      descricao: userDescricao,
    }).then(() => {
      navigate('/records');
    });
  };

  const onSave = () => {
    try {
      registerNewUser();
    } catch (err) {
      console.log(err);
    }
  };

  const onSubmit = () => {
    verifyIfFieldsAreWritten ? onSave() : messageErrors();
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <>
      <header>
        <div>
          <h1>SyncTur</h1>
        </div>
        <div className='nav-registro'>
          <nav>
            <Link to='/records'>Registro</Link>
          </nav>
        </div>
      </header>
      <main>
        <div className='container'>
          <section>
            <div className='register-form'>
              <div>
                <h2>Nome Completo</h2>
                <input
                  className='input-name'
                  type='text'
                  placeholder='Digite seu nome completo'
                  maxLength={48}
                  value={userName}
                  onChange={(e) => {
                    setUserName(e.target.value);
                  }}
                />
              </div>
              <div className='div-email'>
                <h2>Email</h2>
                <input
                  className='input-email'
                  type='text'
                  placeholder='Digite seu Email'
                  value={userEmail}
                  onChange={(e) => {
                    setUserEmail(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className='div-description'>
              <h2>Descrição</h2>
              <textarea
                name='descrição'
                id='descricao'
                maxLength={128}
                placeholder='Escreva aqui a sua mensagem'
                value={userDescricao}
                onChange={(e) => {
                  setUserDescricao(e.target.value);
                }}
              ></textarea>
            </div>
          </section>
          <div>
            <Button class={'btn-register'} action={onSubmit}>
              Cadastrar
            </Button>
          </div>
        </div>
      </main>
    </>
  );
};

export default Register;
